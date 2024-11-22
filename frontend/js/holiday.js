$(document).ready(function(){
    let objDate = new Date();
    $("#h_date").val(objDate.toISOString().split('T')[0]);
    $("#h_date").attr('min',objDate.toISOString().split('T')[0]);
    $.ajax({
        type: "POST",
        url: "http://49.158.179.101/backend/get_holiday.php",
        datatype: "json",
        data:{
            date: (objDate.toISOString().split('T')[0]),
        },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success: function(data) {
            console.log(data);
            if(data == "empty")
                return 0;
            var jdata = JSON.parse(data);
            var info = "";
            jdata.forEach(function(bruh){
                let euh = new Date(bruh);
                info += '<li class="list-group-item"><div class="row d-flex no-gutters"><div class="col d-flex me-2"><p class="d-flex" style="padding: 5px;">' + euh.getFullYear() + '年';
                info += '</p></div><div class="col"><p style="padding: 5px;">' + (euh.getMonth()+1) + '月';
                info += '</p></div><div class="col"><p style="padding: 5px;">' + euh.getDate() + '日</p></div></div></li>';
            });
            $('#h_list').html(info);
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
        }
    })
    $("#h_btn").click(function(){
        var m_date = $("#h_date").val();
        if(m_date == ""){
            alert("請輸入日期!");
            return 0;
        }
        $.ajax({
            type: "POST",
			url: "http://49.158.179.101/backend/crt_holiday.php",
			datatype: "json",
			data:{
				date: m_date,
			},
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
                if(data == "successful"){
                    alert("輸入成功!");
                    location.reload();
                }
                else if(data == "existed"){
                    alert("已設定假日!");
                }
                else{
                    alert("出現錯誤");
                }
            },
            error: function(jqXHR) {
                alert("系統錯誤，代碼"+jqXHR.status+"\n");
            }
        })
    })
})