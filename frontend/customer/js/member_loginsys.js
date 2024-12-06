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
        url: 'http://localhost/backend/member_register.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: username, password: password}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert(response.message);
            if (response.success) {
                window.location.href = 'login.html';
            }
        },
        error: function(jqXHR){
            console.log(jqXHR.responseText);
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
    console.log(username, password);
    //var remember = $('#remember').is(':checked');
    $.ajax({
        url: 'http://localhost/backend/member_login.php',
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

$(document).ready(function() {
    var objDate = new Date();
    console.log(objDate.toISOString().split('T')[0]);
    $('#sign_date').attr('max', objDate.toISOString().split('T')[0]);
});