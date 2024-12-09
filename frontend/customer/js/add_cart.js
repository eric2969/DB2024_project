function addCart(merid){
    var amount = $("#shop_amount").val();
    let cart_cookie = getCookie("shop_cart");
    if(cart_cookie){
        let shop_cart = JSON.parse(cart_cookie);
        console.log(shop_cart);
        if(shop_cart.hasOwnProperty(merid))
            shop_cart[merid] += parseInt(amount);
        else
            shop_cart[merid] = parseInt(amount);
        var cart_data = JSON.stringify(shop_cart);
    } else {
        let shop_cart = {};
        shop_cart[merid] = parseInt(amount);
        var cart_data = JSON.stringify(shop_cart);
    }
    setCookie("shop_cart", cart_data); // 30 days
    alert("已加入購物車");
    window.location.href = "products.html";
}

$(document).ready(function() {
    // 發送請求獲取商品資料
});