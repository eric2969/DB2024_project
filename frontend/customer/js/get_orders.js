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
                            <td>$${product.Price}</td>
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
                alert("ㄐㄐ");
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
                var tmp = ''
                response.data.forEach(function(order) {

                    var section_html = `
                        <tr>
                            <td>${order.OrdID}</td>
                            <td>${order.income}</td>
                            <td>${order.create_time}</td>
                            <td>${order.iscancel}</td>
                            <td><button id="more_${order.OrdID}_btn" class="btn btn-primary shadow ref-button" type="button" style="background: transparent;color: rgb(0,0,0);height: 40px;width: 100px;border-color: var(--bs-btn-bg);">...</button></td>
                            <td><button class="btn btn-primary shadow edit-booking" data-id="${order.OrdID}" data-toggle="modal" data-target="#editBookingModal" type="button" style="width: 100px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: var(--bs-btn-bg);">修改</button></td>
                            <td><button class="btn btn-primary shadow delete-booking" data-id="${order.OrdID}" data-toggle="modal" data-target="#deleteConfirmModal" type="button" style="width: 100px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: rgb(255,0,0);">刪除</button></td>
                        </tr>
                        <tr id="more_${order.OrdID}_div" style="display: none;">
                            <td class="card-header py-3" align="center" rowspan=1>
                                <p class="text-primary m-0 fw-bold">More Info</p>
                            </td>
                            <td colspan=7>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <p>Address</p>
                                        <p>${order.Address}</p>
                                    </div>
                                    <div class="col">
                                        <p>Way to pay</p>
                                        <p>${order.Way_to_pay}</p>
                                    </div>
                                </div>
                            </div></td>
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
                $('#order-tmp').html(tmp);
                // 動態添加的按鈕需要綁定事件
                $('button[id^="more_"]').on('click', function() {
                    var id = $(this).attr('id').split('_')[1];
                    $('#more_' + id + '_div').toggle();
                    $('#more_' + id + '_detail').toggle();
                    loadProducts(id);
                });
                $('.edit-booking').on('click', function() {
                    var ordId = $(this).data('id');
                    alert("This is a edit button");
                    //editBooking(ordId);
                });
                $('.delete-booking').on('click', function() {
                    var ordId = $(this).data('id');
                    alert("This is a delete button");
                    //$('#deleteConfirmModal').data('id', ordId).modal('show');
                });
            } else {
                alert(response.message);
                $('order-list').html(response.message);
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
        }
    });
}

function editBooking(bookingId) {
    // 顯示修改表單，這裡可以用模態框來顯示修改表單
    // 假設這裡有一個模態框表單 #editBookingModal
    $('#editBookingModal').data('id', bookingId).modal('show');
    // 填充表單數據

    $.ajax({
        url: 'http://localhost/backend/get_booking.php',
        type: 'GET',
        dataType: 'json',
        data: { id: bookingId },
        success: function(response) {
            if (response.success) {
                $('#edit-booking-id').val(bookingId);
                $('#edit-booking-date').val(response.data.date);
                $('#edit-booking-time').val(response.data.time);
                $('#edit-booking-name').val(response.data.name);
                $('#edit-booking-people').val(response.data.people);
                $('#edit-booking-phone').val(response.data.phone);
                $('#edit-booking-other').val(response.data.other);
            } else {
                alert('無法加載訂單數據');
            }
        }
    });
}

function deleteBooking(bookingId) {
    $.ajax({
        url: 'http://localhost/backend/delete_booking.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ id: bookingId }),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            if (response.success) {
                alert("刪除成功");
                loadBookings();
            } else {
                alert('刪除失敗');
            }
        }
    });
}
$(document).ready(function() {
    let objDate = new Date();
    $("#l_date").val(objDate.toISOString().split('T')[0]);
    $("#l_date").attr('min',objDate.toISOString().split('T')[0]);
    $("#edit-booking-date").val(objDate.toISOString().split('T')[0]);
    $("#edit-booking-date").attr('min',objDate.toISOString().split('T')[0]);
    $('#admin-register-form').on('submit', function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'http://localhost/backend/admin_register.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ username: username, password: password }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                $('#register-result').html(response.message);
                if (response.success) {
                    $('#admin-register-form')[0].reset();
                }
            }
        });
    });

    $('#admin-login-form').on('submit', function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        var remember = $('#remember').is(':checked');

        $.ajax({
            url: 'http://localhost/backend/admin_login.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ username: username, password: password, remember: remember }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                $('#login-result').html(response.message);
                if (response.success) {
                    window.location.href = 'order.html';
                }
            }
        });
    });
    // if (window.location.pathname.endsWith('order.html')) {
    //     $.ajax({
    //         url: 'http://localhost/backend/remember.php',
    //         type: 'GET',
    //         dataType: 'json',
    //         success: function(response) {
    //             if (!response.logged_in) {
    //                 window.location.href = 'admin_login.html';
    //             } else {
    //                 
    //             }
    //         }
    //     });
    // }

    $('#edit-booking-form').on('submit', function(event) {
        event.preventDefault();
        var bookingId = $('#edit-booking-id').val();
        var time = $('#edit-booking-time').val();
        var date = $('#edit-booking-date').val();
        var name = $('#edit-booking-name').val();
        var people = $('#edit-booking-people').val();
        var phone = $('#edit-booking-phone').val();
        var other = $('#edit-booking-other').val();
        $.ajax({
            url: 'http://localhost/backend/check_holiday.php',
            type: 'POST',
            dataType: 'json',
            data: {
                date: date,
            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function(response) {
                console.log(response);
                if (response.message == "yes" ) {
                    alert("當日為公休日!");
                    $('#editBookingModal').modal('hide');
                    loadBookings();
                    return 0;
                }
                else if(response.message != "no"){
                    alert('查詢失敗!');
                    $('#editBookingModal').modal('hide');
                    return 0;
                }
                else{
                    $.ajax({
                        url: 'http://localhost/backend/update_booking.php',
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify({ id: bookingId, date:date, time: time, name: name, people: people, phone: phone, other: other }),
                        contentType: 'application/json; charset=utf-8',
                        success: function(response) {
                            if (response.success) {
                                alert("更新成功!");
                                $('#editBookingModal').modal('hide');
                                loadBookings();
                            } else {
                                alert('更新失敗!');
                                $('#editBookingModal').modal('hide');
                            }
                        }
                    });
                }
            },
            error: function(jqXHR){
                console.log(jqXHR);
                $('#editBookingModal').modal('hide');
            }
        });
    });

    $('#confirm-delete').on('click', function() {
        var bookingId = $('#deleteConfirmModal').data('id');
        deleteBooking(bookingId);
        $('#deleteConfirmModal').modal('hide');
    });

    $('#close-delete').on('click', function() {
        $('#deleteConfirmModal').modal('hide');
    });

    $('#close-edit').on('click', function() {
        $('#editBookingModal').modal('hide');
    });
});
