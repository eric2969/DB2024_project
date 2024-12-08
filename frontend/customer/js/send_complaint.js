function snd_comp(){
    var username = $('#comp_name').val();
    var mail = $('#comp_email').val();
    var msg = $('#comp_msg').val();
    if(username == "" || msg == "" || mail == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/member_register.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ username: username, mail: mail, msg: msg}),
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