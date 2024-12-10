function snd_comp(){
    var username = $('#comp_name').val();
    var mail = $('#comp_email').val();
    var msg = $('#comp_msg').val();
    if(username == "" || msg == "" || mail == ""){
        alert("Please fill in all fields.");
        return;
    }
    $.ajax({
        url: 'http://localhost/backend/mem/member_complaint.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({ name: username, mail: mail, msg: msg}),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $("#sent_msg").css('display', 'block');
            $("#comp_form").css('display', 'none');
        },
        error: function(jqXHR){
            // console.log(jqXHR.responseText);
            alert("Error: " + jqXHR.responseText);
        }
    });
}