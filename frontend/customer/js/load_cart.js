function LoadCart() {
    var subtotal = 0;
    let cart_cookie = getCookie("shop_cart");
    const productContainer = document.querySelector("#cart_data");
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        Object.keys(shop_cart).forEach(function(k){
            $.ajax({
                url: 'http://localhost/backend/mem/merchandise.php',
                type: 'POST',
                dataType: 'json',
                data:JSON.stringify({single: true, merid: k}),
                success: function(response) {
                    if (response.success) {
                        // 處理回傳的商品資料
                        var data = response.data;
                        // 確保資料是陣列
                        if (Array.isArray(data)) {
                            data.forEach((product) => {
                                // 建立商品卡片
                                subtotal += parseInt(product.Retail_price) * shop_cart[k];
                                const productCard = document.createElement("div");
                                productCard.className = "ref-product";
                                productCard.innerHTML = `
                                <div class="ref-product-col">
                                    <div class="ref-product-wrapper"><img class="ref-product-photo" src="data:image;base64,${product.Mer_pic}" alt="${product.Mer_name}"/>
                                        <div class="ref-product-data">
                                            <div class="ref-product-info">
                                                <div>
                                                    <div class="ref-product-name">${product.Mer_name}</div>
                                                </div>
                                                <div class="ref-product-price ref-mobile-product-price">$${product.Retail_price}</div>
                                            </div>
                                            <div class="ref-product-controls ref-mobile-product-controls">
                                                <div class="ref-product-quantity">
                                                    <div class="ref-quantity-container">
                                                        <div class="ref-quantity-widget">
                                                            <div class="ref-decrease"><span></span></div>
                                                            <input type="text" value="${shop_cart[k]}" />
                                                            <div class="ref-increase"><span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ref-product-remove">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 48 48">
                                                        <path fill="currentColor" d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="ref-price-col">
                                    <div class="ref-product-price">$${product.Retail_price}</div>
                                </div>
                                <div class="ref-quantity-col">
                                    <div class="ref-product-quantity">
                                        <div class="ref-quantity-container">
                                            <div class="ref-quantity-widget">
                                                <div class="ref-decrease"><span></span></div>
                                                <input type="number" value="${shop_cart[k]}" id="${k}"/>
                                                <div class="ref-increase"><span></span></div>
                                            </div>
                                        </div>
                                        <div class="ref-product-qty-message"></div>
                                        <div class="ref-product-remove">Remove</div>
                                    </div>
                                </div>
                                <div class="ref-total-col">
                                    <div class="ref-product-total">
                                        <div class="ref-product-total-sum">$${product.Retail_price * shop_cart[k]}</div>
                                    </div>
                                </div>
                                `;
                                // 插入商品卡片到容器
                                productContainer.appendChild(productCard);
                                $("#cart_subtotal").text("Subtotal: $" + subtotal);
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
        })
        
    }
        
}

$(document).ready(function() {
    // 發送請求獲取商品資料
    LoadCart();
});