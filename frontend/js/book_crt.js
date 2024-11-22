limit = 12;
table_time = ['11:30', '12:30', '13:30', '17:00', '19:00', '21:00'];
time_ava = {
    '11:30': 0,
    '12:30': 0,
    '13:30': 0,
    '17:00': 0,
    '19:00': 0,
    '21:00': 0,
};
function book_confirm(indice){
    if(time_ava[indice]){
        $("#f_people").text($("#b_people").val());
        $("#f_date").text($("#b_date").val());
        $("#f_time").text(indice);
        $("#f_main").css('display','block');
    }
}
$(document).ready(function(){
    let objDate = new Date();
    $("#b_date").val(objDate.toISOString().split('T')[0]);
    $("#f_date").val(objDate.toISOString().split('T')[0]);
    $("#b_date").attr('min',objDate.toISOString().split('T')[0]);
    $("#f_date").attr('min',objDate.toISOString().split('T')[0]);
    $("#b_date").change(function(){ $("#f_main").css('display', 'none');  $("#time_table").css('display', 'none');})
    $("#b_people").change(function(){ $("#f_main").css('display', 'none');  $("#time_table").css('display', 'none');})
    $("#b_btn").click(function(){
        let obj = new Date();
        let strTime = obj.getHours() + ':' + obj.getMinutes();
        console.log(strTime);
        $("#f_main").css('display', 'none');
        if($("#b_date").val() == "" || $("#b_people").val() == ""){
            alert("請輸入訂位資訊");
            return 0;
        }
        $.ajax({
            url: 'http://49.158.179.101/backend/check_holiday.php',
            type: 'POST',
            dataType: 'json',
            data: {
                date: $("#b_date").val(),
            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function(response) {
                console.log(response);
                if (response.message == "yes" ) {
                    alert("當日為公休日!");
                    return 0;
                }
                else if(response.message != "no"){
                    alert('查詢失敗!');
                    return 0;
                }
                else{
                    for(let i = 1; i <= 6 ;i++){
                        $.ajax({
                            url: 'http://49.158.179.101/backend/check_ava.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                date: $("#b_date").val(),
                                time: table_time[i-1],
                                limit: limit,
                                people: $("#b_people").val(),
                            },
                            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                            success: function(response) {
                                console.log($("#b_date").val() < objDate.toISOString().split('T')[0]);
                                if((table_time[i-1] <= strTime && $("#b_date").val() == objDate.toISOString().split('T')[0]) || $("#b_date").val() < objDate.toISOString().split('T')[0]){
                                    $("#t_" + i).css('background-color','#ff6666');
                                    time_ava[table_time[i-1]] = 0;
                                    return 0;
                                }
                                else if (response.message == "ava" ) {
                                    $("#t_" + i).css('background-color','#99ff99');
                                    time_ava[table_time[i-1]] = 1;
                                    return 0;
                                }
                                else if(response.message == "not_ava"){
                                    $("#t_" + i).css('background-color','#ff6666');
                                    time_ava[table_time[i-1]] = 0;
                                    return 0;
                                }
                            },
                            error: function(jqXHR){
                                alert("發生錯誤!");
                                console.log(jqXHR);
                            }
                        });
                    }
                    $("#time_table").css('display','block');
                }
            },
            error: function(jqXHR){
                console.log(jqXHR);
            }
        });
    })
    $("#book_crt").click(function(){
        var f_date = $("#f_date").text();
        if(f_date == "")
            f_date = $("#f_date").val();
        var f_time = $("#f_time").text();
        if(f_time == "")
            f_time = $("#f_time").val();
        var f_name = $("#f_name").val();
        var f_phone = $("#f_phone").val();
        var f_people = $("#f_people").text();
        if(f_people == "")
            f_people = $("#f_people").val();
        var f_other = $("#f_other").val();
        if(f_date == "" || f_time == ""){
            alert("請輸入訂位資料!");
            return 0;
        }
        if(f_name == "" || f_phone == ""){
            alert("請輸入個人資料!");
            return 0;
        }
        $.ajax({
            url: 'http://49.158.179.101/backend/check_holiday.php',
            type: 'POST',
            dataType: 'json',
            data: {
                date: f_date,
            },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function(response) {
                console.log(response);
                if (response.message == "yes" ) {
                    alert("當日為公休日!");
                    return 0;
                }
                else if(response.message != "no"){
                    alert('查詢失敗!');
                    return 0;
                }
                else{
                    $.ajax({
                        type: "POST",
                        url: "http://49.158.179.101/backend/book_crt.php",
                        datatype: "json",
                        data:{
                            date: f_date,
                            time: f_time,
                            name: f_name,
                            phone: f_phone,
                            people: f_people,
                            other: f_other,
                        },
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        success: function(data) {
                            $("#f_main").css('display','none');
                            $("#bruh").css('display','none');
                            if(data == "successful"){
                                $("#success").css('display','block');
                            }
                            else if(data == "error"){
                                $("#fail").css('display','block');
                            }
                            else{
                                console.log(data);
                            }
                        },
                        error: function(jqXHR) {
                            $("#f_main").css('display','none');
                            $("#bruh").css('display','none');
                            $("#fail").css('display','block');
                            alert("error" + jqXHR.status + "\n");
                        }
                    });
                }
            },
            error: function(jqXHR){
                console.log(jqXHR);
            }
        });
    })
});