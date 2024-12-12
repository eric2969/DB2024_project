function loadProducts() {
    var defimg = "data:image/png;base64,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";
    var date = new Date(); // Or the date you'd like converted.
    var TD = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
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
                        <div data-reflow-type="product" data-bss-dynamic-product data-bss-dynamic-product-param="product">
                            <div class="reflow-product">
                                <div class="ref-media">
                                    <div class="ref-preview">
                                        <img class="ref-image active" data-reflow-preview-type="image" src="${(product.Mer_pic!='-1')?product.Mer_pic:defimg}" alt="${product.Mer_name}">
                                    </div>
                                </div>
                                <div class="ref-product-data">
                                    <h1 class="ref-name fw-bold">${product.Mer_name}</h1><br />
                                    <strong class="ref-price ref-on-sale">$${product.Retail_price}</strong><br />
                                    <strong class="ref-price ava">Starting Date: <span class="product-date" style='color:${(product.start_date<=TD)?"black":"red"};'>${product.start_date}</span></strong>
                                    <strong id="rem" class="ref-price ava">Remain Quantity: <span id="prod_remain">${product.remain}</span></strong><br /><hr />
                                    <span id="add" data-reflow-type="add-to-cart" data-reflow-shoppingcart-url="shopping-cart.html" data-reflow-addtocart-text>
                                        <div class="reflow-add-to-cart ref-product-controls" style="bottom:5px;">
                                                <div class="ref-quantity-widget">
                                                    <div class="ref-decrease" onclick="dec();" ><span></span></div>
                                                        <input id="shop_amount" type="number" value=1 min=1/>
                                                    <div class="ref-increase" onclick="inc();"><span></span></div>
                                                </div>
                                            <input id="add_btn" type="submit" class="btn btn-primary shadow ref-button" value="Add to Cart" onclick="addCart(${product.MerID});">
                                        </div>
                                    </span>
                                    <h3 id="nava" class="fw-bold" style="color:red;">Product Not Available!</h3>
                                </div>
                            </div>
                        </div>
                        `;
                        // 插入商品卡片到容器
                        productContainer.appendChild(productCard);
                        $("#pid_nfound").css("display","none");
                        $("#rem").css("display", (product.start_date <= TD? "block" : "none"));
                        $(".ava").css('display', (product.available ? "block":"none"));
                        if(product.start_date > TD || !product.available || product.remain <= 0){
                            $("#add").css("display", "none");
                            $('#nava').css("display", "block");
                        } else {
                            $("#add").css("display", "block");
                            $('#nava').css("display", "none");
                        }
                        if(product.remain <= 0)
                            $("#prod_remain").css("color", "red");
                        else if(product.remain < 10)
                            $("#prod_remain").css("color", "orange");
                        else 
                            $("#prod_remain").css("color", "black");
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

function dec() {
    var input = parseInt($('#shop_amount').val());
    input = Math.max(1, input - 1);
    $("#shop_amount").val(input);
}

function inc() {
    var input = parseInt($('#shop_amount').val());
    input = input + 1;
    $("#shop_amount").val(input);
}

$(document).ready(function() {
    // 發送請求獲取商品資料
    loadProducts();
});
