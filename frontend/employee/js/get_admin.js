$(document).ready(function() {
    $.ajax({
        url: 'http://localhost/backend/adm/get_profile.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                $('#admin_username').text(response.data['username']);
                $('#admin_name.form-control').val(response.data['name']);
                $('#admin_phone').val(response.data['phone']);
                $('#admin_date').val(response.data['date']);
                $('#admin_dept').text(response.data['dept']);
                $('#admin_password').val('');
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

function admin_modify() {
    var name = $('#admin_name.form-control').val();
    var phone = $('#admin_phone').val();
    var date = $('#admin_date').val();
    var passwd = $('#admin_password').val();
    if(name == "" || phone == "" || date == "") {
        alert("Please fill all the fields");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/adm/modify_profile.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            name: name,
            phone: phone,
            date: date,
            passwd: passwd
        }),
        success: function(response) {
            if(response.success) {
                alert("資料修改成功");
                if(response.logout){
                    alert("請重新登入");
                    admin_logout(1);
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