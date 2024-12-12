function loadProducts() {
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
                                        <img class="ref-image active" data-reflow-preview-type="image" src="${product.Mer_pic}" alt="${product.Mer_name}">
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
