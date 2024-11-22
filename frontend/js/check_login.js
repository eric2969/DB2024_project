$(document).ready(function() {
    $.ajax({
        url: 'http://49.158.179.101/backend/remember.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if (!response.logged_in) {
                window.location.href = 'index.html';
            }
        }
    });
});