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
            $.ajax({
                url: 'http://localhost/backend/mem/get_profile.php',
                type: 'POST',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        $("#chk_name").val(response.data['name']);
                        $("#chk_addr").val(response.data['addr']);
                        $("#chk_phone").val(response.data['phone']);
                    } else {
                        alert("請先登入");
                        window.location.href = "login.html";
                        return;
                    }
                },
                error: function(jqXHR) {
                    alert("系統錯誤，代碼"+jqXHR.status+"\n");
                    console.log(jqXHR);
                }
            });
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
    var defimg = "data:image/png;base64,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";
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
                url: 'http://localhost/backend/merchandise.php',
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
                                    <div class="ref-product-wrapper"><img class="ref-product-photo" src="${(product.Mer_pic!='-1')?product.Mer_pic:defimg}" alt="${product.Mer_name}"/>
                                        <div class="ref-product-data">
                                            <div class="ref-product-info">
                                                <div>
                                                    <div class="ref-product-name">${product.Mer_name}</div>
                                                </div>
                                                <div class="ref-product-price ref-mobile-product-price">$ ${product.Retail_price}</div>
                                            </div>
                                            <div class="ref-product-controls ref-mobile-product-controls">
                                                <div class="ref-product-quantity">
                                                    <div class="ref-quantity-container">
                                                        <div class="ref-quantity-widget">
                                                            <div class="ref-decrease" onclick="dec(${k});"><span></span></div>
                                                            <input type="text" value="$ {shop_cart[k]}" />
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
                                    <div class="ref-product-price">$ ${product.Retail_price}</div>
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
                                        <div class="ref-product-total-sum">$ ${product.Retail_price * shop_cart[k]}</div>
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
                //window.location.href = "index.html";
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