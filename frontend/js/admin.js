function loadBookings() {
    $.ajax({
        url: 'http://49.158.179.101/backend/admin_dashboard.php',
        type: 'POST',
        dataType: 'json',
        data:{
            date: $("#l_date").val(),
        },
        success: function(response) {
            if (response.success) {
                var bookingList = '';
                response.data.forEach(function(booking, index) {
                    var bookingHtml = `
                        <div class="container" style="border-style: solid;padding: 20px;height: 20%;margin-top: 10px;margin-bottom: 10px;">
                            <div class="row">
                                <div class="col">
                                    <h1>訂單 ${index + 1}</h1>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>時間</th>
                                            <th>訂位人姓名</th>
                                            <th>訂位人數</th>
                                            <th>更多</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><p>${booking.time}</p></td>
                                            <td><p>${booking.name}</p></td>
                                            <td><p>${booking.people}</p></td>
                                            <td><button id="more_${index + 1}_btn" class="btn btn-primary" type="button" style="background: transparent;color: rgb(0,0,0);height: 40px;width: 30px;border-color: var(--bs-btn-bg);"><i class="fa fa-caret-right"></i></button></td>
                                            <td><button class="btn btn-primary edit-booking" data-id="${booking.indice}" data-toggle="modal" data-target="#editBookingModal" type="button" style="width: 60px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: var(--bs-btn-bg);">修改</button></td>
                                            <td><button class="btn btn-primary delete-booking" data-id="${booking.indice}" data-toggle="modal" data-target="#deleteConfirmModal" type="button" style="width: 60px;height: 40px;color: rgb(0,0,0);background: transparent;border-color: rgb(255,0,0);">刪除</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="more_${index + 1}_div" class="card shadow" style="display: none;">
                                <div class="card-header py-3">
                                    <p class="text-primary m-0 fw-bold">詳細</p>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <p>電話</p>
                                            <p>${booking.phone}</p>
                                        </div>
                                        <div class="col">
                                            <p>備註</p>
                                            <p>${booking.other}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    bookingList += bookingHtml;
                });
                $('#booking-list').html(bookingList);
                // 動態添加的按鈕需要綁定事件
                $('button[id^="more_"]').on('click', function() {
                    var id = $(this).attr('id').split('_')[1];
                    $('#more_' + id + '_div').toggle();
                });
                $('.edit-booking').on('click', function() {
                    var bookingId = $(this).data('id');
                    editBooking(bookingId);
                });
                $('.delete-booking').on('click', function() {
                    var bookingId = $(this).data('id');
                    $('#deleteConfirmModal').data('id', bookingId).modal('show');
                });
            } else {
                $('#booking-list').html(response.message);
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
        url: 'http://49.158.179.101/backend/get_booking.php',
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
        url: 'http://49.158.179.101/backend/delete_booking.php',
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
            url: 'http://49.158.179.101/backend/admin_register.php',
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
            url: 'http://49.158.179.101/backend/admin_login.php',
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
    if (window.location.pathname.endsWith('order.html')) {
        $.ajax({
            url: 'http://49.158.179.101/backend/remember.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (!response.logged_in) {
                    window.location.href = 'admin_login.html';
                } else {
                    loadBookings();
                }
            }
        });
    }
    

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
            url: 'http://49.158.179.101/backend/check_holiday.php',
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
                        url: 'http://49.158.179.101/backend/update_booking.php',
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
