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

function loadProducts() {
    let params = new URLSearchParams(window.location.search);
    if(!params.has('MerID')){
        alert("無效的操作");
        window.location.href = 'index.html';
    }
    var MerID = params.get('MerID');
    $.ajax({
        url: 'http://localhost/backend/mem/merchandise.php',
        type: 'POST',
        dataType: 'json',
        data:JSON.stringify({single: true, merid: MerID}),
        success: function(response) {
            if (response.success) {
                // 處理回傳的商品資料
                const productContainer = document.querySelector(".container.py-5");
                var data = response.data;
                // 確保資料是陣列
                if (Array.isArray(data)) {
                    data.forEach((product) => {
                        // 建立商品卡片
                        const productCard = document.createElement("div");
                        productCard.innerHTML = `
                        <div data-reflow-type="product-editor" data-bss-dynamic-product data-bss-dynamic-product-param="product">
                          <div class="reflow-product">
                            <div class="ref-media">
                              <div class="ref-preview">
                                <!-- 圖片顯示 -->
                                <img class="ref-image active product-image" data-reflow-preview-type="image" src="${product.Mer_pic}" alt="${product.Mer_name}">
                                <div class="image-editor">
                                  <img id="previewImage" src="${product.Mer_pic}" alt="${product.Mer_name}" class="ref-image active d-none" />
                                </div>
                                <!-- 圖片選擇器（編輯模式） -->
                                <input type="file" onchange="updateImage()" id="productImageSelector_${product.MerID}" class="form-control image-selector d-none" accept="image/*">
                              </div>
                            </div>
                            <div class="ref-product-data">
                              <!-- 名稱顯示 -->
                              <h1 class="ref-name fw-bold product-name">${product.Mer_name}</h1>
                              <!-- 名稱編輯（編輯模式） -->
                              <input type="text" id="productNameEditor_${product.MerID}" class="form-control name-editor d-none" value="${product.Mer_name}" placeholder="請輸入商品名稱">

                              <!-- 價格顯示 -->
                              <strong class="ref-price ref-on-sale product-price">$${product.Retail_price}</strong>
                              <input type="number" id="productPriceEditor_${product.MerID}" class="form-control price-editor d-none" min="0" value="${product.Retail_price}" placeholder="請輸入商品價格">
                              
                              <!-- 庫存數量顯示 -->
                              <strong class="ref-price">Remain Quantity: <span class="product-remain">${product.remain}</span>
                              <!-- 庫存數量編輯（編輯模式） -->
                              <div class="ref-quantity-widget d-none" id="productStockEditor_${product.MerID}" width:700px;>
                                  <div class="ref-decrease" onclick="dec();" ><span></span></div>
                                      <input id="shop_amount" type="number" value=${product.remain} min=0/>
                                  <div class="ref-increase" onclick="inc();"><span></span></div>
                              </div>
                              </strong>
                              <input type="number" class="form-control stock-editor d-none" min="0" value="${product.remain}">

                              <hr />
                              <!-- 按鈕切換 -->
                              <button class="btn btn-primary shadow edit-btn" data-id="${product.MerID}">Edit</button>
                              <div class="action-buttons d-none" data-id="${product.MerID}">
                                <button class="btn btn-success shadow save-btn" data-id="${product.MerID}">Save</button>
                                <button class="btn btn-secondary shadow cancel-btn" data-id="${product.MerID}">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        `;
                        // 插入商品卡片到容器
                        productContainer.appendChild(productCard);
                        $("#pid_nfound").css("display","none");
                        if(product.remain <= 0)
                            $("#prod_remain").css("color", "red");
                        else if(product.remain <= 5)
                            $("#prod_remain").css("color", "orange");
                        else 
                            $("#prod_remain").css("color", "black");
                        $('.edit-btn').on('click', function () {
                            const productId = $(this).data('id');

                            // 顯示編輯模式的元件
                            $(`#productImageSelector_${productId}`).removeClass('d-none');
                            $(`#productNameEditor_${productId}`).removeClass('d-none');
                            $(`#productStockEditor_${productId}`).removeClass('d-none');
                            $(`#productPriceEditor_${productId}`).removeClass('d-none');
                            $('#previewImage').removeClass('d-none');
                            $(`.action-buttons[data-id="${productId}"]`).removeClass('d-none');

                            // 隱藏顯示模式的元件
                            $(this).addClass('d-none'); // 隱藏 Edit 按鈕
                            $(`.product-image, .product-price, .product-name, .product-remain`).addClass('d-none');
                          });

                          // 點擊 Cancel 按鈕取消編輯
                          $('.cancel-btn').on('click', function () {
                            const productId = $(this).data('id');

                            // 隱藏編輯模式的元件
                            $(`#productImageSelector_${productId}`).addClass('d-none');
                            $(`#productNameEditor_${productId}`).addClass('d-none');
                            $(`#productStockEditor_${productId}`).addClass('d-none');
                            $(`#productPriceEditor_${productId}`).addClass('d-none');
                            $('#previewImage').addClass('d-none');
                            $(`.action-buttons[data-id="${productId}"]`).addClass('d-none');

                            // 顯示顯示模式的元件
                            $(`.edit-btn[data-id="${productId}"]`).removeClass('d-none');
                            $(`.product-image, .product-name, .product-remain, .product-price`).removeClass('d-none');
                          });

                          // 點擊 Save 按鈕保存修改
                          $('.save-btn').on('click', function () {
                            const productId = $(this).data('id');

                            // 取得編輯後的值
                            const updatedImage = $('#previewImage').attr('src');
                            const updatedName = $(`#productNameEditor_${productId}`).val();
                            const updatedStock = $(`#shop_amount`).val();
                            const updatedPrice = $(`#productPriceEditor_${productId}`).val();
                            if (updatedName === '' || updatedStock === '' || updatedPrice === '') {
                              alert('請填寫完整資訊！');
                              return;
                            }
                            $.ajax({
                                url: 'http://localhost/backend/mem/product_update.php',
                                type: 'POST',
                                dataType: 'json',
                                data:JSON.stringify({
                                    merID: productId,
                                    mer_name: updatedName,
                                    retail_price: updatedPrice,
                                    remain: updatedStock,
                                    mer_pic: updatedImage
                                }),
                                success: function(response) {
                                    if (response.success) {
                                        // 模擬保存邏輯，可改為 API 請求
                                        alert(`產品 ${productId} 已更新！\n價格：${updatedPrice}\n名稱：${updatedName}\n庫存：${updatedStock}`);
                                        $(`.product-image`).attr("src",updatedImage);
                                        $(`.product-name`).text(updatedName);
                                        $(`.product-remain`).text(updatedStock);
                                        $(`.product-price`).text("$" + updatedPrice);
                                        // 恢復至顯示模式
                                        $(`.cancel-btn[data-id="${productId}"]`).click();
                                    }
                                    else{
                                        alert("系統錯誤"+response.message);
                                        return;
                                    }
                                },
                                error: function(jqXHR) {
                                    alert("系統錯誤，代碼"+jqXHR.status+"\n");
                                    console.log(jqXHR);
                                    return;
                                }
                            });
                          });
                        
                    });
                } else 
                    console.error("Unexpected response format:", response.message);
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
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

$(document).ready(function() {
    // 發送請求獲取商品資料
    loadProducts();
});
