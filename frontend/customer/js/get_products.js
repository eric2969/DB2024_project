$(document).ready(function() {
    // 發送請求獲取商品資料
    $.ajax({
        url: 'http://localhost/backend/mem/merchandise.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({single: false}),
        success: function(response) {
            if (response.success) {
                // 處理回傳的商品資料
                const productContainer = document.querySelector(".row.mx-auto");
                var data = response.data;
                // 確保資料是陣列
                if (Array.isArray(data)) {
                    data.forEach((product) => {
                        // 建立商品卡片
                        const productCard = document.createElement("div");
                        productCard.className = "col-md-4 mb-4";
                        productCard.innerHTML = `
                            <div class="card h-100 shadow-sm">
                                <img src="data:image;base64,${product.Mer_pic}" class="card-img" alt="${product.Mer_name}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.Mer_name}</h5>
                                    <p class="card-text">Price: $${product.Retail_price}</p>
                                </div>
                                <div class="ref-addons"><a href="product.html?MerID=${product.MerID}" class="btn btn-primary shadow">View Detail</a></div>
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
});
