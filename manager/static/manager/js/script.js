$(document).ready(function () {
    const url = window.location.href;
    const host = window.location.host;

    let add_user_form = $("#add-new-user");
    add_user_form.submit(function (event) {
        event.preventDefault();
        let data = {};
        data.first_name = add_user_form.find("input[name='first_name']").val();
        data.last_name = add_user_form.find("input[name='last_name']").val();
        data.email = add_user_form.find("input[name='email']").val();
        data.type = add_user_form.find("select[name='user_type']").val();
        data.phone_number = add_user_form.find("input[name='phone_number']").val();

        $.ajax({
            method: "POST",
            url: add_user_form.attr("action"),
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });


    let add_class_form = $("#add-new-class");
    add_class_form.submit(function (event) {
        event.preventDefault();
        let data = {};
        data.title = add_class_form.find("input[name='title']").val();
        data.teacher = add_class_form.find("select[name='teacher']").val();
        data.classLink = add_class_form.find("input[name='classLink']").val();
        data.is_open = add_class_form.find("select[name='is_open']").val();
        data.sign_up_from = add_class_form.find("input[name='sign_up_from']").val();
        data.sign_up_until = add_class_form.find("input[name='sign_up_until']").val();
        data.start_class = add_class_form.find("input[name='start_class']").val();
        data.end_class = add_class_form.find("input[name='end_class']").val();
        data.time_table = add_class_form.find("input[name='time_table']").val();
        data.exam_access = add_class_form.find("input[name='exam_access']").val();

        $.ajax({
            method: "POST",
            url: add_class_form.attr("action"),
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    // Users Page
    if (url.indexOf('http://' + host + '/manager/users') != -1) {
        function get_user_info(id) {
            $.ajax({
                method: "GET",
                url: $("#userInfo").attr("data-url"),
                data: {"id": id},
                success: function(data) {
                    console.log(data);
                    $("#userInfo #firstName").attr("value", data.user_info.first_name);
                    $("#userInfo #lastName").attr("value", data.user_info.last_name);
                    $("#userInfo #emailAddress").attr("value", data.user_info.email);
                    $("#userInfo #phoneNum").attr("value", data.user_info.phone_number);
                    $("#userInfo #userStatus option[value='" + data.user_info.status + "']").attr("selected", "selected");
                    $("#userInfo #usageType option[value='" + data.user_info.type + "']").attr("selected", "selected");
                    // let ctx = $('#chart').getContext('2d');
                    // let chart = new Chart(ctx, {
                    //            data: {
                    //                datasets: [
                    //                    {fill: 'origin'},      // 0: fill to 'origin'
                    //                    {fill: '+2'},          // 1: fill to dataset 3
                    //                    {fill: 1},             // 2: fill to dataset 1
                    //                    {fill: false},         // 3: no fill
                    //                    {fill: '-2'}           // 4: fill to dataset 2
                    //                ]
                    //            }
                    //        });

                }, 
                error: function(data) {
                    console.log(data);
                }
            });
        }

        $("button[data-target='#userInfo']").click(function() {
            let id = $(this).val();
            $("#edit_user_info_ajax_form").find("input[name='pk']").attr("value", id);
            get_user_info(id);
        });

        $("#edit_user_info_ajax_form").submit(function(event){
            event.preventDefault();
            $.ajax({
                method: "POST",
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function(data) {
                    console.log(data);

                    iziToast.success({
                        title: 'OK',
                        message: 'Successfully inserted record!',
                    });
                }, 
                error: function(data) {
                    console.log(data);
                }
            });
        });

        $("#navSearch").on("keyup", function(event) {
            const thisElement = $(this);
            if (thisElement.val().length > 1) {
                thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").addClass("d-none");
                thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").removeClass("d-none");
                $.ajax({
                    method: "POST",
                    url: thisElement.attr("data-url"),
                    data: {"q": thisElement.val()},
                    success: function(data) {
                        console.log(data);
                        thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").removeClass("d-none");
                        thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").addClass("d-none");
                    },
                    error: function(data) {
                        console.log(data);
                        thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").removeClass("d-none");
                        thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").addClass("d-none");
                    }
                });
            } else {
                thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").removeClass("d-none");
                thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").addClass("d-none");
            }
            console.log("tick");
        });
    }
    // Report Page
    else if (url.indexOf('http://' + host + '/manager/reports') != -1) {

        console.log("report page");
        $('textarea').autogrow();


        function displayReport(id) {
            $.ajax({
                method: "GET",
                url: $("#reportList").attr("data-url"),
                data: {"id": id},
                success: function (data) {
                    console.log(data);
                    $("#userAvatar").attr("src", data.report.avatar);
                    $("#writerName").text(data.report.full_name);
                    $("#createdTime").text(data.report.created_time);
                    $("#reportTitle").text(data.report.title);
                    $("#reportBody").text(data.report.text);
                    $("#reportCount").text(data.report.num);
                    $("#allReports").text(data.report.all_reports);
                    $("#report-reply-form-ajax").find("input[name='pk']").attr("value", id);
                    $("#nextReport").prop('disabled', data.report.num === data.report.all_reports);
                    $("#prevReport").prop('disabled', data.report.num === 1);
                    if (data.report.num === 1) {
                        $("#nextReport").attr("value", data.report.next_pk);
                    } else if (data.report.num === data.report.all_reports) {
                         $("#prevReport").attr("value", data.report.prev_pk);
                    } else {
                         $("#nextReport").attr("value", data.report.next_pk);
                         $("#prevReport").attr("value", data.report.prev_pk);
                    }
                    $("#replyList").html("");
                    for (let i = 0; i < data.report_replays.length; i++) {
                        let avatar = "";
                        let full_name = "";
                        if (!data.report_replays[i].me) {
                            avatar = `<img src="${data.report_replays[i].avatar}" alt="avatar" width="50"/>`
                            full_name = `<h5>${data.report_replays[i].full_name}</h5>`;
                        }
                        let item = `<div class="chat-custom-item ${data.report_replays[i].me ? '' : 'blue-left-side'}">
                                        <div class="chat-custom-item__body">
                                            <pre>${data.report_replays[i].text}</pre>
                                        </div>
                                        ${data.report_replays[i].me ?
                                            ''
                                            :
                                            `<div class="chat-custom-item__avatar" data-toggle="tooltip" data-placement="top" title="<p class='tool'>${full_name}</p>">
                                                ${avatar}
                                            </div>`
                                        }
                                        ${data.report_replays[i].me ?
                                            `<div class="chat-custom-item__options">
                                                <div class="chat-custom-item__options__toggler">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                    </svg>
                                                </div>
                                            </div>`
                                            :
                                            ''
                                        }
                                        <div class="chat-custom-item__modify-date">${data.report_replays[i].data_created}</div>
                                    </div>`;
                        $("#replyList").append(item);
                    }
                    $("#attachedList").html("");
                    for (let i = 0; i < data.report_attaches.length; i++) {
                        let li = `<li class="list-group-item attached-item">
                                    <span class="attache-item-detail">
                                        <div>${data.report_attaches[i].name}</div>
                                        <div dir="ltr">${data.report_attaches[i].size}</div>
                                    </span>
                                    <a href="${data.report_attaches[i].href}">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
                                        <path fill-rule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
                                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
                                    </svg>
                                    </a>
                                </li>`;
                        $("#attachedList").append(li);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

        $("#reportList .list-group-item").click(function () {
            let id = $(this).attr("id");
            $("#reportList .list-group-item").removeClass("active");
            $(this).addClass("active");
            displayReport(id);
        });

        $("#nextReport").click(function () {
            let id = $(this).val();
            $("#reportList .list-group-item").removeClass("active");
            $("#reportList .list-group-item#" + id).addClass("active");
            if ($(this).attr("disabled") !== true) {
                displayReport(id);
            }
        });

        $("#prevReport").click(function () {
            let id = $(this).val();
            $("#reportList .list-group-item").removeClass("active");
            $("#reportList .list-group-item#" + id).addClass("active");
            if ($(this).attr("disabled") !== true) {
                displayReport(id);
            }
        });

        $("#report-reply-form-ajax").submit(function (event) {
            event.preventDefault();
            console.log("clicked!");
            $.ajax({
                method: "POST",
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function (data) {
                    console.log(data);
                    $("#replyList").html("");
                    for (let i = 0; i < data.report_replays.length; i++) {
                        let avatar = "";
                        let full_name = "";
                        if (!data.report_replays[i].me) {
                            avatar = `<img src="${data.report_replays[i].avatar}" alt="avatar" width="50"/>`
                            full_name = `<h5>${data.report_replays[i].full_name}</h5>`;
                        }
                        let card = `<div class="card w-75 ${data.report_replays[i].me ? 'float-right' : ''}">
                                        <div class="card-header">
                                            ${avatar}
                                            ${full_name}
                                            ${data.report_replays[i].data_created}
                                        </div>
                                        <div class="card-body">
                                            <pre>${data.report_replays[i].text}</pre>
                                        </div>
                                    </div>`;
                        $("#replyList").append(card);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        });
    }
    // End Report Page


});