function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, attributes = {}) {
    attributes = { path: '/'};
  
    if (attributes.expires instanceof Date)
      attributes.expires = attributes.expires.toUTCString();
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let attributeKey in attributes) {
      updatedCookie += "; " + attributeKey;
      let attributeValue = attributes[attributeKey];
      if (attributeValue !== true) {
        updatedCookie += "=" + attributeValue;
      }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}
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
            window.location.href = 'index.html';
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
    var date = new Date(); // Or the date you'd like converted.
    var DateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    $('#sign_date').attr('max', DateTime);
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