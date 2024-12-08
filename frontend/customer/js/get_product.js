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
                        <div data-reflow-type="product" data-bss-dynamic-product data-bss-dynamic-product-param="product">
                            <div class="reflow-product">
                                <div class="ref-media">
                                    <div class="ref-preview">
                                        <img class="ref-image active" data-reflow-preview-type="image" src="data:image;base64,${product.Mer_pic}" alt="${product.Mer_name}">
                                    </div>
                                </div>
                                <div class="ref-product-data">
                                    <h1 class="ref-name fw-bold">${product.Mer_name}</h1><br />
                                    <strong class="ref-price ref-on-sale">$${product.Retail_price}</strong><br /><br />
                                    <span data-reflow-type="add-to-cart" data-reflow-shoppingcart-url="shopping-cart.html" data-reflow-addtocart-text data-reflow-product="717978921" data-reflow-variant="199976733_s">
                                        <div class="reflow-add-to-cart ref-product-controls" style="bottom:5px;">
                                                <div class="ref-quantity-widget">
                                                    <div class="ref-decrease" onclick="dec();" ><span></span></div>
                                                        <input id="amount" type="number" value=1 min=1 max=9/>
                                                    <div class="ref-increase" onclick="inc();"><span></span></div>
                                                </div>
                                            <a class="ref-button" href="#">Add to Cart</a>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                            
                        `;
                        // 插入商品卡片到容器
                        productContainer.appendChild(productCard);
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
    var input = parseInt($('#amount').val());
    input = Math.max(1, input - 1);
    $("#amount").val(input);
}

function inc() {
    var input = parseInt($('#amount').val());
    input = Math.min(9, input + 1);
    $("#amount").val(input);
}

$(document).ready(function() {
    // 發送請求獲取商品資料
    loadProducts();
});
