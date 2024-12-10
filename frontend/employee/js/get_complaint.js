function loadComps() {
    $.ajax({
        url: 'http://localhost/backend/adm/admin_complaint.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                var section_list = '';
                response.data.forEach(function(comp) {
                    var section_html = `
                        <tr>
                            <td>${comp.compID}</td>
                            <td>${comp.complainant}</td>
                            <td>${comp.email}</td>
                            <td>${comp.create_time}</td>
                            <td><button id="more_${comp.compID}_btn" class="btn btn-primary shadow ref-button" type="button" style="background: transparent;color: rgb(0,0,0);height: 40px;width: 100px;border-color: var(--bs-btn-bg);">...</button></td>
                            </tr>
                        <tr id="more_${comp.compID}_div" style="display: none;">
                            <td colspan=7>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="fw-bold">Complaint Reason</h5>
                                            <p>${comp.reason}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `;
                    section_list += section_html;
                    
                });
                //section_list += `</tbody>`
                $('#comp-list').html(section_list);
                // 動態添加的按鈕需要綁定事件
                $('button[id^="more_"]').on('click', function() {
                    var id = $(this).attr('id').split('_')[1];
                    $('#more_' + id + '_div').toggle();
                    $('#more_' + id + '_detail').toggle();
                });
                $("#comp_list").css("display","block");

            } else {
                alert(response.message);
                $("#comp_list").css("display","none");
            }
        },
        error: function(jqXHR) {
            alert("系統錯誤，代碼"+jqXHR.status+"\n");
            console.log(jqXHR);
        }
    });
}

$(document).ready(function() {
    loadComps();
});