//member register form
function member_signup(){
    var username = $('#sign_name').val();
    var bdate = $('#sign_date').val();
    var mail = $('#sign_email').val();
    var password = $('#sign_password').val();
    if(username == "" || password == "" || bdate == "" || mail == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/mem/member_register.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: username, password: password, mail: mail, bdate: bdate}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            // console.log(response);
            alert(response.message);
            if (response.success) {
                window.location.href = 'login.html';
            }
        },
        error: function(jqXHR){
            // console.log(jqXHR.responseText);
            alert("Error: " + jqXHR.responseText);
        }
    });
}
//member login form finished successfully
function member_login() {
    var username = $('#login_email').val();
    var password = $('#login_password').val();
    if(username == "" || password == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/mem/member_login.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: username, password: password}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert(response.message);
            if (response.success) {
                window.location.href = 'index.html';
            }
        },
        error: function(jqXHR){
            console.log(jqXHR.responseText);
        }
    });
}

function member_logout() {
    $.ajax({
        url: 'http://localhost/backend/mem/logout.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert(response.message);
            window.location.reload();
        },
        error: function(jqXHR){
            console.log(jqXHR.responseText);
        }
    });
}

function chk_login(){
    var result;
    $.ajax({
        url: 'http://localhost/backend/mem/check_login.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function(response) {
            result = response.logged_in;
            return response.logged_in;
        },
        error: function(jqXHR) {
            console.log(jqXHR);
        }
    });
    return result;
}
$(document).ready(function() {
    var objDate = new Date();
    $('#sign_date').attr('max', objDate.toISOString().split('T')[0]);
    $.ajax({
        url: 'http://localhost/backend/mem/check_login.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.logged_in) {
                $(".login_btn").css('display', 'block');
                $(".logout_btn").css('display', 'none');
            } else {
                $(".login_btn").css('display', 'none');
                $(".logout_btn").css('display', 'block');
            }
        },
        error: function(jqXHR) {
            console.log(jqXHR);
        }
    });
});