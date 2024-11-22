function append(num){$("#m_input").val($("#m_input").val() + num);}
function cls(){$("#m_input").val("");}
function remove(){
    var str = $("#m_input").val();
    if(str == "")
        return;
    else
        $("#m_input").val(str.substring(0, str.length - 1));
}
$(document).ready(function(){
    let obj_Date = new Date();
    $("#m_date").val(obj_Date.toISOString().split('T')[0]);
    Date.prototype.getWeek = function() {
        var dt = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
    };
    $("#record_crt").click(function(){
        if($("#m_date").val() == ""){
            alert("請輸入日期");
            return 0;
        }
        var m_date = new Date($("#m_date").val());
        var m_price = $("#m_input").val();
        $("#m_input").val("");
        if(m_price == ""){
            alert("請輸入金額!");
            return 0;
        }
        else if(m_price < 0){
            alert("請輸入正數!");
            return 0;
        }
        var hour = obj_Date.getHours();
        var minute = obj_Date.getMinutes();
        let strTime = `${hour}:${minute}`;
        $.ajax({
            type: "POST",
			url: "http://49.158.179.101/backend/record_crt.php",
			datatype: "json",
			data:{
				date: m_date.toISOString().split('T')[0],
                month: (m_date.getMonth()+1),
                week: m_date.getWeek(),
                time: strTime,
                price: m_price,
			},
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(data) {
                if(data == "successful"){
                    alert("輸入成功!");
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
});