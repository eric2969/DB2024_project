const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step },
    (value, index) => start + index * step
);
$(document).ready(function(){
    Date.prototype.getWeek = function() {
        var dt = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
    };
    let obj_Date = new Date();
    var year = obj_Date.getFullYear();
    var month = obj_Date.getMonth()+1;
    var day = obj_Date.getDate();
    let strDate = obj_Date.toISOString().split('T')[0];
    $.ajax({
        type: "POST",
		url: "http://49.158.179.101/backend/record_lookup.php",
		datatype: "json",
		data:{
			date: strDate,
            week: obj_Date.getWeek(),
            month: month,
		},
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
            var jdata = JSON.parse(data);
            $("#p_day").text("$" + (jdata['date']?jdata['date']:"0"));
            $("#p_week").text("$" + (jdata['week']?jdata['week']:"0"));
            $("#p_month").text("$" + (jdata['month']?jdata['month']:"0"));
        },
        error: function(jqXHR) {
            alert("error" + jqXHR.status);
        }
    })
    $.ajax({
        type: "POST",
		url: "http://49.158.179.101/backend/chart_fetch.php",
		datatype: "json",
		data:{
            week: obj_Date.getWeek(),
		},
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
            var jdata = JSON.parse(data);
            //linear regression
            const week = arrayRange(0, 20, 1);
            const week_data = dl.tensor1d(week);
            const sales_data = dl.tensor1d(jdata);
            //train param
            const aw = dl.variable(dl.scalar(Math.random()));
            const ba = dl.variable(dl.scalar(Math.random()));
            const f = x => aw.mul(x).add(ba);
            const loss = (pred, label) => pred.sub(label).square().mean();
            const learningRate = 0.0005;
            const optimizer = dl.train.sgd(learningRate);
            //training
            for (let i = 0; i < 50; i++) { const cost = optimizer.minimize(() => loss(f(week_data), sales_data), true, [aw, ba]) }
            const awPredict = aw.dataSync();
            const baPredict = ba.dataSync();
            //fetch data for chart
            valueData = []
            for (let i = 15; i < 20; i++)
                valueData.push((jdata[i]?jdata[i]:0));
            for (let i = 20; i < 22; i++)
                valueData.push(parseFloat(i * awPredict + baPredict));
            //chart drawing
            const ctx = $("#myChart");
            const labels = ['前五周', '前四周', '前三周','前二周', '前一周', '本周(預測)', '下一周(預測)'];
            const value = {
                labels: labels,
                datasets: [{
                    label: '營收狀況',
                    data: valueData,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
        
                }]
            };
            const config = {
                type: 'line',
                data: value,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            };
            const myChart = new Chart(ctx, config);
        },
        error: function(jqXHR) {
            alert("error" + jqXHR.status);
        }
    })
    $.ajax({
        type: "POST",
		url: "http://49.158.179.101/backend/today_trans.php",
		datatype: "json",
		data:{
			date: strDate,
		},
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		success: function(data) {
            var jdata = JSON.parse(data);
            var info = '<div class="col me-2"><h6 class="mb-0"><strong>時間</strong></h6><span class="text-xs">&emsp;&emsp;&emsp;&emsp;金額</span></div>';
            jdata.forEach(function(trans){
                info += '<div class="col me-2"> <h6 class="mb-0"><strong>';
                info += trans.time + '</strong></h6><span class="text-xs">&emsp;&emsp;&emsp;&emsp;$';
                info += trans.price + '</span></div>';
            });
            $('#invoice').html(info);
        },
        error: function(jqXHR) {
            alert("error" + jqXHR.status);
        }
    })                          
})