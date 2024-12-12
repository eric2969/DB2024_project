$(document).ready(function() {
    $.ajax({
        url: 'http://localhost/backend/mem/get_profile.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                $('#mem_email').text(response.data['email']);
                $('#mem_name.form-control').val(response.data['name']);
                $('#mem_addr').val(response.data['addr']);
                $('#mem_phone').val(response.data['phone']);
                $('#mem_date').val(response.data['date']);
            } else {
                alert("Server error: " + response.message);
            }
        },
        error: function(jqXHR) {
            alert("Server error: " + jqXHR.status);
            console.log(jqXHR);
        }
    });
});

function mem_modify() {
    var name = $('#mem_name.form-control').val();
    var addr = $('#mem_addr').val();
    var phone = $('#mem_phone').val();
    var date = $('#mem_date').val();
    var passwd = $('#mem_password').val();
    if(name == "") {
        alert("Please fill in the name");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/mem/modify_profile.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            name: name,
            addr: addr,
            phone: phone,
            date: date,
            passwd: passwd
        }),
        success: function(response) {
            if(response.success) {
                alert("資料修改成功");
                if(response.logout){
                    alert("請重新登入");
                    member_logout(1);
                } else {
                    window.location.reload();
                }
            } else {
                alert("Server error: " + response.message);
            }
        },
        error: function(jqXHR) {
            alert("Server error: " + jqXHR.status);
            console.log(jqXHR);
        }
    });
}