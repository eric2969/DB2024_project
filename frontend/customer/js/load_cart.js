function dec(merid){
    let cart_cookie = getCookie("shop_cart");
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        if(shop_cart.hasOwnProperty(merid))
            shop_cart[merid] -= 1;
        var cart_data = JSON.stringify(shop_cart);
    }
    setCookie("shop_cart", cart_data); // 30 days
    location.reload();
}

function inc(merid){
    let cart_cookie = getCookie("shop_cart");
    var remain = parseInt($("#rmn_"+merid).text());
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        if(shop_cart.hasOwnProperty(merid)){
            if(shop_cart[merid] + 1 <= remain){
                shop_cart[merid] += 1;
            } else {
                alert("超出庫存數量");
                return;
            }
        }
        var cart_data = JSON.stringify(shop_cart);
    }
    setCookie("shop_cart", cart_data); // 30 days
    location.reload();
}

function rev(merid){
    let cart_cookie = getCookie("shop_cart");
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        if(shop_cart.hasOwnProperty(merid))
            shop_cart[merid] = 0;
        var cart_data = JSON.stringify(shop_cart);
    }
    setCookie("shop_cart", cart_data); // 30 days
    location.reload();
}

function checkout(){
    if($("#checkout-agreement").is(":checked")){
        if(chk_login()){
            $("#cart_checkout").css('display', 'block');
            $("#cart_prod").css('display', 'none');
            var subtotal = parseInt($("#cart_subtotal").text());
            $("#chk_subtotal").text("$ " + subtotal);
            $("#chk_shipping").text("$ " + 70);
            $("#chk_total").text("$ " + (subtotal + 70));
        } else {
            alert("請先登入");
            window.location.href = "login.html";
            return;
        }
    } else {
        alert("請先勾選同意");
        return;
    }
}

function back_cart(){
    $("#cart_checkout").css('display', 'none');
    $("#cart_prod").css('display', 'block');
}

function LoadCart() {
    var subtotal = 0;
    var remain = {};
    let cart_cookie = getCookie("shop_cart");
    $("#shop_cart").css('display', 'none');
    $("#empty_cart").css('display', 'block');
    const productContainer = document.querySelector("#cart_data");
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        Object.keys(shop_cart).forEach(function(k){
            if(!shop_cart[k])
                return;
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
                                isempty = 0;
                                subtotal += parseInt(product.Retail_price) * shop_cart[k];
                                remain[k] = product.remain;
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
                                                            <div class="ref-decrease" onclick="dec(${k});"><span></span></div>
                                                            <input type="text" value="${shop_cart[k]}" />
                                                            <div class="ref-increase" onclick="inc(${k});"><span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ref-product-remove" onclick="rev(${k});">
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
                                                <div class="ref-decrease" onclick="dec(${k});"><span></span></div>
                                                <input type="number" value="${shop_cart[k]}" id="${k}"/>
                                                <div class="ref-increase" onclick="inc(${k});"><span></span></div>
                                            </div>
                                        </div>
                                        <div class="ref-product-qty-message">Remain: <span id="rmn_${k}">${product.remain}</span></div>
                                        <div class="ref-product-remove" onclick="rev(${k});">Remove</div>
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
                                $("#cart_subtotal").text(subtotal);
                                $("#shop_cart").css('display', 'block');
                                $("#empty_cart").css('display', 'none');
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

function cart_confirm(){
    var name = $("#chk_name").val();
    var phone = $("#chk_phone").val();
    var addr = $("#chk_addr").val();
    if(name == "" || phone == "" || addr == ""){
        alert("請填寫完整的購物資料");
        return;
    }
    var total = parseInt($("#cart_subtotal").text()) + 70;
    let cart_cookie = getCookie("shop_cart");
    let shop_cart = JSON.parse(cart_cookie);
    $.ajax({
        url: 'http://localhost/backend/mem/add_order.php',
        type: 'POST',
        dataType: 'json',
        data:JSON.stringify({name: name, phone: phone, addr: addr, cart: JSON.stringify(shop_cart), income: total}),
        success: function(response) {
            console.log(response);
            if(response.success){
                alert("訂單成立，感謝您的購物！");
                deleteCookie("shop_cart");
                window.location.href = "index.html";
            } else {
                alert(response.message);
                window.location.href = "index.html";
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
        }
    });
}

$(document).ready(function() {
    // 發送請求獲取商品資料
    $("#cart_checkout").css('display', 'none');
    $("#cart_prod").css('display', 'block');
    LoadCart();
});