function dec() {
    var input = parseInt($('#shop_amount').val());
    input = Math.max(0, input - 1);
    $("#shop_amount").val(input);
}

function inc() {
    var input = parseInt($('#shop_amount').val());
    input = input+1;
    $("#shop_amount").val(input);
}

function add_prod(){
    // 取得編輯後的值
    const ProdImage = $('#previewImage').attr('src');
    const ProdName = $('#productNameEditor').val();
    const ProdStock = $('#shop_amount').val();
    const ProdPrice = $('#productPriceEditor').val();
    const ProdDate = $('#productDateEditor').val();
    if (ProdName === '' || ProdStock === '' || ProdPrice === '' || ProdImage == null || ProdDate === '') {
        alert('請填寫完整資訊！');
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/adm/add_prod.php',
        type: 'POST',
        dataType: 'json',
        data:JSON.stringify({
            name: ProdName,
            price: ProdPrice,
            remain: ProdStock,
            pic: ProdImage,
            st: ProdDate
        }),
        success: function(response) {
            if (response.success) {
                alert(`產品 ${ProdName} 已上架！\n編號：${response.id}\n價格：${ProdPrice}\n庫存：${ProdStock}\n開始販售日期：${ProdDate}`);
                window.location.href = `product.html?MerID=${response.id}`;
            }
            else{
                alert("系統錯誤: "+response.message);
                return;
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
            return;
        }
    });
}

function updateImage(){
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
            $('#previewImage').attr('src', reader.result);
            $('#previewImage').css('display', 'block');
            $('#img_nupload').css('display', 'none');
            $('.image-editor').css('display', 'block');
        },
        false,
    );
    if (file) {
        reader.readAsDataURL(file);
    }
    else{
        alert('請選擇一張圖片！');
    }
}

$(document).ready(function(){
    var date = new Date(); // Or the date you'd like converted.
    var DateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    $("#shop_amount").val(1);
    $('#productDateEditor').val(DateTime);
});