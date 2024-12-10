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
function admin_signup(){
    var username = $('#sign_name').val();
    var password = $('#sign_password').val();
    if(username == "" || password == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/adm/admin_register.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: username, password: password}),
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
function admin_login() {
    var username = $('#login_username').val();
    var password = $('#login_password').val();
    if(username == "" || password == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/adm/admin_login.php',
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

function admin_logout() {
    $.ajax({
        url: 'http://localhost/backend/adm/logout.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            alert(response.message);
            window.location.href = 'login.html';
        },
        error: function(jqXHR){
            console.log(jqXHR.responseText);
        }
    });
}

function chk_login(){
    var result;
    $.ajax({
        url: 'http://localhost/backend/adm/check_login.php',
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
    if(!chk_login()) {
        if(window.location.href.search('login.html') == -1 && window.location.href.search('signup.html') == -1){
            alert('請登入系統!');
            window.location.href = 'login.html';
        }
    } else {
        $("#admin_name").text(getCookie('admin'));
    }
});