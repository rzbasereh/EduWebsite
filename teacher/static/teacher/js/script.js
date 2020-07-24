$(document).ready(function () {
    // add question Page
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });

    $(".arrow-down-up").attr("data-toggle", "tooltip");
    
    // sidebar tooltip
    if (!$("div.sidebar").hasClass('close-sidebar')) {
        $('.sidebar a:first-child').attr('data-original-title', null);
        $('.sidebar a:nth-child(2)').attr('data-original-title', null);
        $('.sidebar a:nth-child(3)').attr('data-original-title', null);
        $('.sidebar a:nth-child(4)').attr('data-original-title', null);
        $('.sidebar a:nth-child(5)').attr('data-original-title', null);
        $('.sidebar a:last-child').attr('data-original-title', null);
    }
    $(".slider-control").click(function () {
        if (!$("div.sidebar").hasClass('close-sidebar')) {
            $('.sidebar a:first-child').attr('data-original-title', null);
            $('.sidebar a:nth-child(2)').attr('data-original-title', null);
            $('.sidebar a:nth-child(3)').attr('data-original-title', null);
            $('.sidebar a:nth-child(4)').attr('data-original-title', null);
            $('.sidebar a:nth-child(5)').attr('data-original-title', null);
            $('.sidebar a:last-child').attr('data-original-title', null);
        } else {
            $('.sidebar a:first-child').attr('data-original-title', "<p class=\'tool\'>داشبورد</p>");
            $('.sidebar a:nth-child(2)').attr('data-original-title', "<p class=\'tool\'>کلاس ها</p>");
            $('.sidebar a:nth-child(3)').attr('data-original-title', "<p class=\'tool\'>مدیریت آزمون</p>");
            $('.sidebar a:nth-child(4)').attr('data-original-title', "<p class=\'tool\'>بانک سوال</p>");
            $('.sidebar a:nth-child(5)').attr('data-original-title', "<p class=\'tool\'>گزارش</p>");
            $('.sidebar a:last-child').attr('data-original-title', "<p class=\'tool\'>گفتگو</p>");
        }
    });


    if (window.location.href.indexOf("questions/add_new") !== -1) {
        $(".sub-scrolled-header, .fr-toolbar__fixed .fr-toolbar.fr-top").width($(".Page-Body").width());
        $(window).resize(function () {
            $(".sub-scrolled-header, .fr-toolbar__fixed .fr-toolbar.fr-top").width($(".Page-Body").width());
        });
        $(".slider-control").click(function () {
            $(".sub-scrolled-header, .fr-toolbar__fixed .fr-toolbar.fr-top").width($(".Page-Body").width());
        });
        let math_keyboard = `<button type="button" role="button" title="Math Formula" class="fr-command fr-btn" 
                                data-cmd="add-math" data-popup="false">
                                <svg class="bi bi-laptop" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M13.5 3h-11a.5.5 0 0 0-.5.5V11h12V3.5a.5.5 0 0 0-.5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11z"/>
                                    <path d="M0 12h16v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5V12z"/>
                                </svg>
                            </button>`;
        $(".fr-toolbar__fixed .fr-toolbar.fr-top button[data-cmd='specialCharacters']").after(math_keyboard);
        $(".fr-toolbar__fixed.fr-box.fr-basic .fr-element").on('focus', function () {
            $(".sub-scrolled-header").addClass("show");
            $(this).closest(".fr-toolbar__fixed").addClass("show");
        }).on('focusout', function () {
            $(".sub-scrolled-header").removeClass("show");
            $(this).closest(".fr-toolbar__fixed").removeClass("show");
        });
        $(".fr-toolbar__fixed").find(".fr-toolbar.fr-top button[data-cmd='add-math']").click(function () {
            // pasteHtmlAtCaret(`<div id="Ml__editor">REza</div>`);
            // init_MathLive('ML_editor');
        });
        $("input.tag-input").tagsInput({
            defaultText: '',
        });
        // $('.owl-carousel').owlCarousel({
        //     mouseDrag: false,
        //     rtl: true,
        //     touchDrag: false,
        //     loop: false,
        //     margin: 10,
        //     nav: false,
        //     items: 1,
        //     dots: false,
        //     autoHeight: true,
        // });

        let addQuestionForm = $("#add-question-form");
        addQuestionForm.submit(function (event) {
            event.preventDefault();
            let body = collectData("QuestionSubject", false);
            let verbose_ans = collectData("CompleteAns", false);
            let ChoiceVal1 = collectData("ChoiceVal1", false);
            let ChoiceVal2 = collectData("ChoiceVal2", false);
            let ChoiceVal3 = collectData("ChoiceVal3", false);
            let ChoiceVal4 = collectData("ChoiceVal4", false);
            let GradeSelect = collectData("GradeSelect", false);
            let LessonSelect = collectData("LessonSelect", false);
            let ChapterSelect = collectData("ChapterSelect", false);
            let CorrectChoice = collectData("CorrectChoice", false);
            if (body !== false && verbose_ans !== false && ChoiceVal1 !== false && ChoiceVal2 !== false && ChoiceVal3 !== false &&
                ChoiceVal4 !== false && GradeSelect !== false && LessonSelect !== false && ChapterSelect !== false && CorrectChoice !== false) {
                $.ajax({
                    type: "POST",
                    url: addQuestionForm.attr("action"),
                    data: {
                        'pk': addQuestionForm.closest(".card").attr("id"),
                        'body': body,
                        'verbose_ans': verbose_ans,
                        'is_publish': $("input[name='is_publish']").val(),
                        'ChoiceVal1': ChoiceVal1,
                        'ChoiceVal2': ChoiceVal2,
                        'ChoiceVal3': ChoiceVal3,
                        'ChoiceVal4': ChoiceVal4,
                        'GradeSelect': GradeSelect,
                        'LessonSelect': LessonSelect,
                        'ChapterSelect': ChapterSelect,
                        'CorrectChoice': CorrectChoice,
                        'redirect': true,
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        });
        $('.change-btns .btn:last-child').click(function () {
            $('.owl-carousel').trigger('next.owl.carousel');
            $(".owl-carousel .owl-stage").css('transition', '0.8s');
            $(".change-btns .btn:first-child").removeClass('btn-blue');
            $(this).addClass('btn-blue')
        });
        $('.change-btns .btn:first-child').click(function () {
            $('.owl-carousel').trigger('prev.owl.carousel', [300]);
            $(".owl-carousel .owl-stage").css('transition', '0.8s');
            $(".change-btns .btn:last-child").removeClass('btn-blue');
            $(this).addClass('btn-blue');
        });
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        });

        setInterval(intervalSave, 5000);
    }

    // editor($('.question-textarea'));

    // $(".question-sidebar  a:nth-child(2), .question-sidebar  #my_questions").click(function () {
    //     $(".question-sidebar a.active").removeClass('active');
    //     $(this).addClass('active');
    //     $(".path a:last-child").text($(this).text());
    //     $(".question-page-body h1 > span:first-child").text($(this).text());
    // });

    $(".question-sidebar  #my_questions").click({type: "my_questions"}, getPage);
    $(".question-sidebar  #all_questions").click({type: "all_questions"}, getPage);

    if ($("span.clicked").length === 0) {
        $(".question-counter h2 > span").css("display", "none");
    }

    if ($("span.clicked").length !== 0) {
        $(".question-counter h2 > span").css("display", "inline-block");
    }

    $(".questions-content .checkmark").click(questionSelection);
    $(".question-counter").click(function () {
        console.log($("span.clicked").length === 0);
        if ($("span.clicked").length === 0) {

            let preventClick = false;
            $('.sidebar-bottom-box').click(function (e) {
                if (!preventClick) {
                    $(this).html($(this).html());
                }
                preventClick = true;
                return false;
            });

            iziToast.warning({
                class: 'customized-warning-izi-toast-small',
                title: 'هشدار',
                message: 'سوالی انتخاب نشده است !',
                position: 'bottomLeft',
                onOpening: function () {
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-texts").addClass("customized-izi-text-small");
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").addClass("customized-izi-icon-small");
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                        "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                        "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"/>\n" +
                        "                    </svg>\n" +
                        "                </div>");
                    $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                        "</svg>");
                }
            });
        } else {
            let pack_pk = parseInt($(".question-counter").attr("id").replace("pack-", ""), 10);
        }
    });

    $(".scrolled-header").width($("body").width() - ($(".sidebar").width() + $(".question-sidebar").width()) - 2);
    $(window).resize(function () {
        $(".scrolled-header").width($("body").width() - ($(".sidebar").width() + $(".question-sidebar").width()) - 2);
    });
    $(".slider-control").click(function () {
        $(".scrolled-header").width($("body").width() - ($(".sidebar").width() + $(".question-sidebar").width()) - 2);
    });

    $(".question-body").scroll(function () {
        if ($(".questions").offset().top < 148) {
            $(".scrolled-header").addClass("scrolled-header-show");
        } else if ($(".questions").offset().top > 148) {
            $(".scrolled-header").removeClass("scrolled-header-show");
        }
    });

    $("#selectGrade").find(".modal-footer button").click(function () {
        let grades = [];
        $.each($("#tags_tagsinput").find(".tag"), function () {
            grades.push($(this).find("span").text().slice(0, -2));
        });
        $.ajax({
            method: "POST",
            url: $(this).attr("data-url"),
            data: {
                "grades": grades
            },
            success: function (data) {
                if (data.value === "success") {
                    $(location).attr("href", data.url);
                } else if (data.value === "empty list") {
                    iziToast.warning({
                        class: 'customized-warning-izi-toast',
                        title: 'هشدار',
                        message: 'شما هیچ موضوعی را انتخاب نکرده اید!',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                                "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                                "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"/>\n" +
                                "                    </svg>\n" +
                                "                </div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
    $(".questions .card-body > span").click(function () {
        $(this).closest(".card").find(".verbose-ans").show();
    });
    $(".verbose-ans .close").click(function () {
        $(this).closest(".card").find(".verbose-ans").hide();
    });

    $("ul.pagination li.page-item").click({type: "pagination"}, getPage);
    $('.t').on('change', {type: "update_unit"}, getPage);


    $(".next-question-page-body #exampleModalCenter .modal-footer a").click(function () {
        $(".next-question-page-body .questions-content").remove();
    });
    $(".next-question-page-body button.close").click(function () {
        let thisElement = $(this);
        $.ajax({
            method: "POST",
            url: $(".next-question-page-body button.close").attr("data-url"),
            data: {
                "pk": $(".next-question-page-body button.close").closest(".card").attr("id"),
                "state": "remove",
            },
            success: function (data) {
                console.log(data);
                if (data.value === "success") {
                    thisElement.closest(".card").remove();
                    if (data.type === "remove") {
                        iziToast.success({
                            class: 'customized-success-izi-toast-small',
                            message: 'سوال با موفقیت حذف شد !',
                            position: 'bottomLeft',
                            onOpening: function () {
                                $(".customized-success-izi-toast-small>.iziToast-body .iziToast-texts").addClass("customized-izi-text-small");
                                $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-success");
                                $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").addClass("customized-izi-icon-small");
                                $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"success-alert-circle\">\n" +
                                    "    <svg class=\"bi bi-check\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "  <path fill-rule=\"evenodd\" d=\"M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                    "</svg>\n" +
                                    "</div>");
                                $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                    "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                    "</svg>");
                            }
                        });
                    }
                }
            }
        });
    });

    $(document).on('click.bs.dropdown.data-api', '.keep_it_open', function (e) {
        e.stopPropagation();
    });
    $(".dropdown-menu[aria-labelledby='filterDropdown']").find("li button").click({type: "filter"}, getPage);

    $(".arrow-down-up").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(".next-question-page-body .questions-content").sortable({
                axis: 'y'
            });
            $(".next-question-page-body .questions-content").disableSelection();
            // $(".next-question-page-body .card").addClass("get-ready-to-shake shake shake-constant");
            $(".next-question-page-body .card > div:first-child").addClass("diactivation-card");
        } else {
            $(".next-question-page-body .questions-content").sortable("disable");
            // $(".next-question-page-body .card").removeClass("get-ready-to-shake shake shake-constant");
            $(".next-question-page-body .card > div:first-child").removeClass("diactivation-card");
        }
    });

    $(window).on('load', function () {
        $(" div.loading-background").removeClass("loading-background");
        $(" div.linear-activity").remove();
    });

    $(".manage-buttons span").click(function () {
        if ($("svg", this).hasClass("bi-play-fill")) {
            $(this).attr("data-original-title", "<p class='tool'>متوقف کردن آزمون</p>");
            $(this).html(`<svg class="bi bi-pause-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                          </svg>`);
            $('#ExamRun').tooltip('hide');
            // $("#executeExam").modal();

        } else {
            $(this).html(`<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16"fill="currentColor" 
                                        xmlns="http://www.w3.org/2000/svg" data-toggle="modal" 
                                        data-target="#selectDestination">
                                 <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                          </svg>`);
            $(this).attr("data-original-title", "<p class='tool'>اجرای ازمون</p>");
        }
    });


    $('.manage-exam #yes').click(function () {
        $(this).closest('#manage-examInfo').css('display', 'none');
    });

    $('.manage-exam-info > .btn').click(function () {
        if ($(this).hasClass('collapsed')) {
            $(this).css('transform', 'rotate(-90deg)');
        } else if (!$(this).hasClass('collapsed')) {
            $(this).css('transform', 'rotate(0deg)');
        }
    });

    $("button[data-target='#selectDestination']").click(function () {
        let EID = $(this).attr("id");
        console.log(EID);
        $('#ERun').find("input[name='EID']").attr('value', EID);
    });
    $("#startExam").click(function () {
        $('#selectDestination').modal('hide');
        $('#ERun').modal('show');
    });

    $('#ERunTimeSelection').bootstrapMaterialDatePicker({date: false});
    $('#ERunStartTimeShowed').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        weekStart: 1,
        nowButton: true,
        minDate: new Date()
    });
    $('#ERunEndExam').bootstrapMaterialDatePicker({format: 'DD/MM/YYYY HH:mm', weekStart: 0});
    $('#ERunStartTime').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm',
        weekStart: 0
    }).on('change', function (e, date) {
        $('#ERunEndExam').bootstrapMaterialDatePicker('setMinDate', date);
    });

    let csrf_token = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }
    });
});
