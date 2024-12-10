function loadProducts(id){
    var shopping_list_html = ''; // 存放購物清單的 HTML
    var subtotal = 0;
    $.ajax({
        url: 'http://localhost/backend/mem/member_order_detail.php',
        type: 'POST',
        dataType: 'json',
        data:JSON.stringify({OrdID: id}),
        success: function(response) {
            if (response.success) {
                // 處理回傳的商品資料
                response.data.forEach(function(product) {
                    subtotal += parseInt(product.Quantity)*parseInt(product.Price);
                    var product_html = `
                        <tr>
                            <td>${product.MerID}
                            <td>${product.Name}</td>
                            <td>${product.Quantity}</td>
                            <td>$ ${product.Price}</td>
                            <td>$ ${product.Price * product.Quantity}</td>
                            <td>
                                <button class="btn btn-primary" type="button" onclick="window.open('product.html?MerID=${product.MerID}', '_blank')" style="background: transparent; color: blue; border: 1px solid blue;">
                                    詳細資訊
                                </button>
                            </td>
                        </tr>
                    `;
                    shopping_list_html += product_html; // 將每個產品的 HTML 加入
                });
                $(`#product_info_${id}`).html(shopping_list_html);
                $(`#${id}_subtotal`).text("$ "+subtotal);
                //alert(shopping_list_html);
            }
            else{
                $(`#product_info_${id}`).html("系統忙碌中");
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
        }
    });
}

function loadOrders() {
    var status = ['尚未出貨', '已出貨', '已取消'];
    var st = String($('#start_time').val());
    var et = String($('#end_time').val());
    $.ajax({
        url: 'http://localhost/backend/mem/member_order.php',
        type: 'POST',
        dataType: 'json',
        data:JSON.stringify({
            start_time: st,
            end_time: et
        }),
        success: function(response) {
            if (response.success) {
                var section_list = '';
                response.data.forEach(function(order) {
                    var section_html = `
                        <tr>
                            <td>${order.OrdID}</td>
                            <td>${order.income}</td>
                            <td>${order.create_time}</td>
                            <td>${status[order.status]}</td>
                            <td><button id="more_${order.OrdID}_btn" class="btn btn-primary shadow ref-button" type="button" style="background: transparent;color: rgb(0,0,0);height: 40px;width: 100px;border-color: var(--bs-btn-bg);">...</button></td>
                            <td><button class="btn btn-primary shadow send_comp" data-id="${order.OrdID}" data-bs-toggle="modal" data-bs-target="#feedbackModal" type="button" style="width: 100px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: var(--bs-btn-bg);">投訴</button></td>
                            <td><button class="btn btn-primary shadow delete-booking" data-id="${order.OrdID}" data-bs-toggle="modal" data-bs-target="#deleteOrderModal" type="button" style="width: 100px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: rgb(255,0,0); display:${(order.status == 1 || order.status == 2)?"none":"block"};">刪除</button></td>
                        </tr>
                        <tr id="more_${order.OrdID}_div" style="display: none;">
                            <td class="card-header py-3" align="center" rowspan=1>
                                <p class="text-primary m-0 fw-bold">More Info</p>
                            </td>
                            <td colspan=7>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <p>Name</p>
                                            <p>${order.Name}</p>
                                        </div>
                                        <div class="col">
                                            <p>Phone</p>
                                            <p>${order.Phone}</p>
                                        </div>
                                        <div class="col">
                                            <p>Address</p>
                                            <p>${order.Address}</p>
                                        </div>
                                        <div class="col">
                                            <p>Way to pay</p>
                                            <p>${order.Way_to_pay}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr id="more_${order.OrdID}_detail" style="display: none;">
                            <td colspan=7 align='justify'>
                                <table align='center'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody id="product_info_${order.OrdID}">

                                    </tbody>
                                    
                                </table>
                                <div>
                                    <div class="ref-totals" >
                                        <div class="ref-subtotal">
                                            <div><span display="block" float="left">Subtotal</span><span style="display:block; float:right; text-align:right;"><label id="${order.OrdID}_subtotal"></label></span></div>
                                        </div>
                                        <div class="ref-shipping">
                                            <span display="block" float="left">Shipping</span> <span style="display:block; float:right; text-align:right;"><label style="text-align:right;">$ 70</label></span>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="ref-total">
                                        <div><span display="block" float="left">Total</span><span style="display:block; float:right; text-align:right;">$ ${order.income}</span></div>
                                        <div class="ref-total-note"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `;
                    section_list += section_html;
                    
                });
                //section_list += `</tbody>`
                $('#order-list').html(section_list);
                // 動態添加的按鈕需要綁定事件
                $('button[id^="more_"]').on('click', function() {
                    var id = $(this).attr('id').split('_')[1];
                    $('#more_' + id + '_div').toggle();
                    $('#more_' + id + '_detail').toggle();
                    loadProducts(id);
                });
                $('.send_comp').on('click', function() {
                    var ordId = $(this).data('id');
                    send_comp(ordId);
                });
                $('.delete-booking').on('click', function() {
                    var ordId = $(this).data('id');
                    deleteOrder(ordId);
                });
                $("#order_list").css("display","block");

            } else {
                alert(response.message);
                $("#order_list").css("display","none");
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
        }
    });
}

function send_comp(ordID) {
    // 填充表單數據
    $('#submitFeedback').on('click', function () {
        const feedbackText = $('#feedbackText').val().trim();
        if (feedbackText === '') {
            alert('請輸入您的意見！');
            return;
        }
        // 模擬傳送資料
        // 清空文字方塊
        $('#feedbackText').value = '';
        $.ajax({
            url: 'http://localhost/backend/mem/order_complaint.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({OrdID: ordID, reason: feedbackText}),
            success: function(response) {
                if (response.success) {
                    alert('感謝您的意見！我們已收到您的回饋。');
                    $('#feedbackModal').modal('toggle')
                } else {
                    console.log(response);
                    alert(response.message);
                }
            },
            error: function(jqXHR) {
                alert("系統錯誤，代碼"+jqXHR.status+"\n");
                console.log(jqXHR);
            }
        });
    });
    
}

function deleteOrder(ordId) {
    $('#orderIdToDelete').text(ordId); // 顯示在 Modal 中
    // 當確認刪除按鈕被點擊時，執行刪除邏輯
    $('#confirmDeleteBtn').on('click', function () {
        $.ajax({
            url: 'http://localhost/backend/mem/order_delete.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ OrdID: ordId }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                if (response.success) {
                    alert(`訂單 ${ordId} 已刪除！`); // 模擬刪除操作，可替換為實際刪除 API 請求
                    loadOrders();
                    $('#deleteOrderModal').modal('hide'); // 隱藏 Modal
                } else {
                    alert('刪除失敗');
                }
            }
        });
    });
}

$(document).ready(function() {
    let objDate = new Date();
    $(".show_order").css("display","none");
    if(!chk_login()){
        alert("請登入!");
        window.location.href = "login.html";
    }
    //訂單日期設定
    $("#start_time").val(objDate.toISOString().split('T')[0]);
    $("#start_time").attr('max',objDate.toISOString().split('T')[0]);
    $("#end_time").val(objDate.toISOString().split('T')[0]);
    $("#end_time").attr('max',objDate.toISOString().split('T')[0]);
    loadOrders();
});
