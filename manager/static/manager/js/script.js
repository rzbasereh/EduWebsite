$(document).ready(function () {
        const url = window.location.href;
        const host = window.location.host;

        $('[data-toggle="tooltip"]').tooltip();

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
        if (url.indexOf('http://' + host + '/manager/users') !== -1) {
            function get_user_info(id) {
                $.ajax({
                    method: "GET",
                    url: $("#userInfo").attr("data-url"),
                    data: {"id": id},
                    success: function (data) {
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
                    error: function (data) {
                        console.log(data);
                    }
                });
            }

            $("button[data-target='#userInfo']").click(function () {
                let id = $(this).val();
                $("#edit_user_info_ajax_form").find("input[name='pk']").attr("value", id);
                get_user_info(id);
            });

            $("#edit_user_info_ajax_form").submit(function (event) {
                event.preventDefault();
                $.ajax({
                    method: "POST",
                    url: $(this).attr("action"),
                    data: $(this).serialize(),
                    success: function (data) {
                        console.log(data);

                        iziToast.success({
                            title: 'OK',
                            message: 'Successfully inserted record!',
                        });
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });

            $("#navSearch").on("keyup", function (event) {
                const thisElement = $(this);
                if (thisElement.val().length > 1) {
                    thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").addClass("d-none");
                    thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").removeClass("d-none");
                    $.ajax({
                        method: "POST",
                        url: thisElement.attr("data-url"),
                        data: {"q": thisElement.val()},
                        success: function (data) {
                            console.log(data);
                            thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .bi.bi-search").removeClass("d-none");
                            thisElement.closest(".input-group").find(".input-group-prepend .input-group-text .spinner-border").addClass("d-none");
                        },
                        error: function (data) {
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

            let ctx = document.getElementById('userProgressChart').getContext('2d');
            let chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line', // also try bar or other graph types

                // The data for our dataset
                data: {
                    labels: ["Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017"],
                    // Information about the dataset
                    datasets: [{
                        backgroundColor: 'lightblue',
                        borderColor: 'royalblue',
                        data: [69.8, 57.8, 76, 110.8, 142.6],
                    }]
                },

                // Configuration options
                options: {}
            });

        }


        // Class Page
        else if (url.indexOf('http://' + host + '/manager/classes') !== -1) {
            $("button[data-target='#allStudent']").click(function () {
                $("#allStudent").find(".list-group #noResult").addClass("d-none");
                $.ajax({
                    method: "POST",
                    url: $(this).attr("data-url"),
                    success: function (data) {
                        $("#allStudent").find("#allStudentLabel span").text(data.class_name);
                        $("#allStudent").find(".list-group").find("button:not(#noResult)").remove();
                        for (let i = 0; i < data.students.length; i++) {
                            $("#allStudent").find(".list-group").append(`
                            <button type="button" class="list-group-item list-group-item-action text-right border-0"
                                dir="rtl">
                                <img src="${data.students[i].avatar}" alt="${data.students[i].full_name}" width="50px"
                                    height="50px" class="rounded-circle">
                                <span class="mr-2">${data.students[i].full_name}</span> 
                            </button>
                        `);
                        }
                        $("#allStudent").find(".list-group button.list-group-item").click(function () {
                            $("#allStudent").modal("hide");
                            $("#studentPreview").modal("show");
                        });
                        $("#allStudent").find("input[aria-describedby='searchStudent']").on("keyup", function () {
                            let text = $(this).val();
                            let flag = true;
                            $("#allStudent").find(".list-group button#noResult").addClass("d-none");
                            $("#allStudent").find(".list-group button.list-group-item:not(#noResult)").each(function () {
                                if ($(this).find("span").text().indexOf(text) === -1) {
                                    $(this).addClass("d-none");
                                } else {
                                    flag = false;
                                    $(this).removeClass("d-none");
                                }
                            });

                            if (flag) {
                                $("#allStudent").find(".list-group #noResult").removeClass("d-none");
                            }
                        });
                    },
                    error: function (data) {
                        console.log(data);
                    }
                })
            });
        }
        // End Class Page


        // Report Page
        else if (url.indexOf('http://' + host + '/manager/reports') !== -1) {

            console.log("report page");
            $('textarea').autogrow();

            $(".search-box input").on("keyup", function () {
                $(".sider-list #reportList #noResult").addClass("d-none");
                $.ajax({
                    method: "GET",
                    url: $(this).attr("data-url"),
                    data: {"q": $(this).val()},
                    success: function (data) {
                        $(".sider-list #reportList a.list-group-item-action").remove();
                        if (data.reports.length === 0) {
                            $(".sider-list #reportList #noResult").removeClass("d-none");
                        }
                        for (let i = 0; i < data.reports.length; i++) {
                            let report = `<a href="#" class="list-group-item list-group-item-action text-right"
                                   id="${data.reports[i].id}">
                                    <div class="d-flex w-100 justify-content-between text-right">
                                        <div class="d-flex">
                                            <img src="${data.reports[i].avatar}"
                                                 alt="${data.reports[i].teacher_name}-profile"
                                                 width="50px">
                                            <strong class="mb-1"
                                                    style="line-height: 45px;padding-right: 10px">${data.reports[i].teacher_name}</strong>
                                        </div>
                                        <small>
                                            ${data.reports[i].has_attachment ?
                                `
                                                <svg class="bi bi-paperclip" width="1em" height="1em"
                                                     viewBox="0 0 16 16"
                                                     fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                                                </svg>
                                                `
                                :
                                ""
                                }
                                            ${data.reports[i].date_modified}
                                        </small>
                                    </div>
                                    <strong class="mb-1">${data.reports[i].title}</strong>
                                    <p class="mb-1 text-justify" dir="rtl">${data.reports[i].body}...</p>
                                    <small></small>
                                </a>`;
                            $(".sider-list #reportList").append(report);
                        }
                        $("#reportList .list-group-item").click(function () {
                            let id = $(this).attr("id");
                            $("#reportList .list-group-item").removeClass("active");
                            $(this).addClass("active");
                            displayReport(id);
                        });
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });

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
                        if (data.report.all_reports === 1) {
                            $("#nextReport").prop('disabled', true);
                            $("#prevReport").prop('disabled', true);
                        } else if (data.report.num === 1) {
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
                        $(".item-preview").removeClass("d-none");
                        $(".item-preview").next().addClass("d-none");
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


    }
);