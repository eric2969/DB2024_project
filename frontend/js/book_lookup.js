$(document).ready(function() {
    $('#lookup-form').on('submit', function(event) {
        event.preventDefault(); // 防止表單提交
        var phone = $('#phone').val();

        $.ajax({
            url: 'http://49.158.179.101/backend/book_lookup.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ phone: phone }),
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
                if (response.success) {
                    var bookingInfo = '';
                    response.data.forEach(function(booking) {
                        bookingInfo += '<div>日期: ' + booking.date + '</div>';
                        bookingInfo += '<div>時間: ' + booking.time + '</div>';
                        bookingInfo += '<div>姓名: ' + booking.name + '</div>';
                        bookingInfo += '<div>人數: ' + booking.people + '</div>';
                        bookingInfo += '<div>其他: ' + booking.other + '</div>';
                    });
                    $('#booking-info').html(bookingInfo);
                    $('#success').show();
                    //$("#success").css('display','block');
                    $('#fail').hide();
                } else {
                    $('#fail-reason').html(response.message);
                    $('#fail').show();
                    //$("#fail").css('display','block');
                    $('#success').hide();
                }
            },
            error: function() {
                $('#fail-reason').html('查詢失敗，請稍後再試。');
                $('#fail').show();
                $('#success').hide();
            }
        });
    });
});
