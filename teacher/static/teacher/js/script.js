$(document).ready(function () {

    // add question Page
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });

    if (window.location.href.indexOf("questions/add_new") !== -1) {
        $("input.tag-input").tagsInput({
            defaultText: '',
        });
        $('.owl-carousel').owlCarousel({
            mouseDrag: false,
            rtl: true,
            touchDrag: false,
            loop: false,
            margin: 10,
            nav: false,
            items: 1,
            dots: false,
            autoHeight: true,
        });

        function collectData(element, mute) {
            mute = !mute;
            if (element === "QuestionSubject") {
                let QuestionSubjectData = $("div.question-textarea").text();
                if (QuestionSubjectData.trim().length === 0) {
                    if (mute) {
                        $(".question-textarea-label").append("<span class='warning'><span>*</span> لطفا صورت سوال را کامل کنید</span>");
                        if ($(".question-textarea-label > span.warning").length > 1) {
                            $(".question-textarea-label > span.warning:last-child").css('display', 'none');
                        }
                        $(".Page-Body").scrollTop($(".question-textarea-label").position().top);
                        $("div.question-textarea").click(function () {
                            $(".question-textarea-label > span.warning").css('display', 'none');
                        });
                    }
                } else {
                    return QuestionSubjectData;
                }
                return false;
            } else if (element === "CompleteAns") {
                let CompleteAnsData = $("div.complete-ans").text();
                if (CompleteAnsData.trim().length === 0) {
                    if (mute) {
                        $(".complete-ans-label").append("<span class='warning'><span>*</span> لطفا پاسخ تشریحی را وارد کنید</span>");
                        if ($(".complete-ans-label > span.warning").length > 1) {
                            $(".complete-ans-label > span.warning:last-child").css('display', 'none');
                        }
                        $('.owl-carousel').trigger('next.owl.carousel');
                        $(".change-btns .btn:first-child").removeClass('btn-blue');
                        $('.change-btns .btn:last-child').addClass('btn-blue');
                        $(".Page-Body").scrollTop($(".complete-ans").position().top);
                        $("div.complete-ans").click(function () {
                            $(".complete-ans-label > span.warning").css('display', 'none');
                        });
                    }
                } else {
                    return CompleteAnsData;
                }
                return false;
            } else if (element === "CorrectChoice") {
                let CorrectChoice = $(".custom-input input:checked ~ .tick").length;
                if (CorrectChoice === 0) {
                    if (mute) {
                        iziToast.warning({
                            title: 'خطا',
                            message: 'لطفا گزینه ی صحیح را علامت بزنید',
                            rtl: 'true',
                            class: 'izi-font',
                        });
                    }
                } else {
                    return CorrectChoice;
                }
                return false;
            } else if (element === "ChoiceVal1") {
                let ChoiceVal1 = $(".first-choice-text").text();
                if (ChoiceVal1.length === 0) {
                    if (mute) {
                        $(".first-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                        if ($(".first-choice-text").closest('.choice').find('.choice-warning').length > 1) {
                            $(".first-choice-text").closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                        }
                        $(".first-choice-text").click(function () {
                            $(".first-choice-text").closest('.choice').find('.choice-warning').css('display', 'none');
                        });
                    }
                } else {
                    return ChoiceVal1;
                }
                return false;
            } else if (element === "ChoiceVal2") {
                let ChoiceVal2 = $(".second-choice-text").text();
                if (ChoiceVal2.length === 0) {
                    if (mute) {
                        $(".second-choice-text").closest('.choice').append("<span class='left-choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                        if ($(".second-choice-text").closest('.choice').find('.left-choice-warning').length > 1) {
                            $(".second-choice-text").closest('.choice').find('.left-choice-warning:last-child').css('display', 'none');
                        }
                        $(".second-choice-text").click(function () {
                            $(".second-choice-text").closest('.choice').find('.left-choice-warning').css('display', 'none');
                        });
                    }
                } else {
                    return ChoiceVal2;
                }
                return false;
            } else if (element === "ChoiceVal3") {
                let ChoiceVal3 = $(".third-choice-text").text();
                if (ChoiceVal3.length === 0) {
                    if (mute) {
                        $(".third-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                        if ($(".third-choice-text").closest('.choice').find('.choice-warning').length > 1) {
                            $(".third-choice-text").closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                        }
                        $(".third-choice-text").click(function () {
                            $(".third-choice-text").closest('.choice').find('.choice-warning').css('display', 'none');
                        });
                    }
                } else {
                    return ChoiceVal3;
                }
                return false;
            } else if (element === "ChoiceVal4") {
                let ChoiceVal4 = $(".fourth-choice-text").text();
                if (ChoiceVal4.length === 0) {
                    if (mute) {
                        $(".fourth-choice-text").closest('.choice').append("<span class='left-choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                        if ($(".fourth-choice-text").closest('.choice').find('.left-choice-warning').length > 1) {
                            $(".fourth-choice-text").closest('.choice').find('.left-choice-warning:last-child').css('display', 'none');
                        }
                    }
                    $(".fourth-choice-text").click(function () {
                        $(".fourth-choice-text").closest('.choice').find('.left-choice-warning').css('display', 'none');
                    });
                } else {
                    return ChoiceVal4;
                }
                return false;
            } else if (element === "GradeSelect") {
                let GradeSelect = $("#grade-select").val();
                let GradeSelectOption = $("#grade-select").closest(".form-group").find("option[selected]").text();
                if (GradeSelect === GradeSelectOption) {
                    if (mute) {
                        if ($("#grade-select").closest(".form-group").find(".choice-warning").length === 0) {
                            $("#grade-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                        }
                        $("#grade-select").click(function () {
                            $("#grade-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                        });
                    }
                } else {
                    return GradeSelect;
                }
                return false;
            } else if (element === "LessonSelect") {
                let LessonSelect = $("#lesson-select").val();
                let LessonSelectOption = $("#lesson-select").closest(".form-group").find("option[selected]").text();
                if (LessonSelect === LessonSelectOption) {
                    if (mute) {
                        $("#lesson-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                        if ($("#lesson-select").closest(".form-group").find(".choice-warning").length > 1) {
                            $("#lesson-select").closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                        }
                        $("#lesson-select").click(function () {
                            $("#lesson-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                        });
                    }
                } else {
                    return LessonSelect;
                }
                return false;
            } else if (element === "ChapterSelect") {
                let ChapterSelect = $("#chapter-select").val();
                let ChapterSelectOption = $("#chapter-select").closest(".form-group").find("option[selected]").text();
                if (ChapterSelect === ChapterSelectOption) {
                    if (mute) {
                        $("#chapter-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                        if ($("#chapter-select").closest(".form-group").find(".choice-warning").length > 1) {
                            $("#chapter-select").closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                        }
                        $("#chapter-select").click(function () {
                            $("#chapter-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                        });
                    }
                }
            } else {
                return ChapterSelect;
            }
            return false;
        }

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

        function intervalSave() {
            $(".saved").removeClass('saved-show');
            $(".updating").addClass("updating-show ");

            let data = {};
            data.pk = addQuestionForm.closest(".card").attr("id");
            if (collectData("QuestionSubject", true) !== false) {
                data.body = collectData("QuestionSubject", true)
            } else {
                data.body = ""
            }
            if (collectData("CompleteAns", true) !== false) {
                data.verbose_ans = collectData("CompleteAns", true)
            } else {
                data.verbose_ans = ""
            }
            if (collectData("ChoiceVal1", true) !== false) {
                data.ChoiceVal1 = collectData("ChoiceVal1", true);
            } else {
                data.ChoiceVal1 = ""
            }
            if (collectData("ChoiceVal2", true) !== false) {
                data.ChoiceVal2 = collectData("ChoiceVal2", true);
            } else {
                data.ChoiceVal2 = ""
            }
            if (collectData("ChoiceVal3", true) !== false) {
                data.ChoiceVal3 = collectData("ChoiceVal3", true);
            } else {
                data.ChoiceVal3 = ""
            }
            if (collectData("ChoiceVal4", true) !== false) {
                data.ChoiceVal4 = collectData("ChoiceVal4", true);
            } else {
                data.ChoiceVal4 = ""
            }
            if (collectData("GradeSelect", true) !== false) {
                data.GradeSelect = collectData("GradeSelect", true);
            } else {
                data.GradeSelect = ""
            }
            if (collectData("LessonSelect", true) !== false) {
                data.LessonSelect = collectData("LessonSelect", true);
            } else {
                data.LessonSelect = ""
            }
            if (collectData("ChapterSelect", true) !== false) {
                data.ChapterSelect = collectData("ChapterSelect", true);
            } else {
                data.ChapterSelect = ""
            }
            if (collectData("CorrectChoice", true) !== false) {
                data.CorrectChoice = collectData("CorrectChoice", true);
            } else {
                data.CorrectChoice = ""
            }
            data.is_publish = $("input[name='is_publish']").val();
            data.redirect = "true";
            console.log("updating ...");
            $.ajax({
                type: "POST",
                url: addQuestionForm.attr("action"),
                data: data,
                success: function (data) {
                    console.log(data);
                    $(".updating").removeClass("updating-show ");
                    $(".saved").addClass('saved-show');
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }

        setInterval(intervalSave, 60000);
    }

    // editor($('.question-textarea'));

    $(".question-sidebar  a:nth-child(2), .question-sidebar  a:nth-child(3)").click(function () {
        $("a.active").removeClass('active');
        $(this).addClass('active');
        $(".path a:last-child").text($(this).text());
        $(".question-page-body h1 > span:first-child").text($(this).text());
    });
    $(".questions-content .checkmark").click(function () {
        let this_element = $(this);
        let state = "add";
        if (this_element.hasClass("clicked")) {
            state = "remove";
        }
        $.ajax({
            method: "POST",
            url: $(".question-counter").attr("data-url"),
            data: {
                "pk": this_element.closest(".card").attr("id"),
                "state": state,
            },
            success: function (data) {
                if (data.value === "success") {
                    $(".question-counter").addClass("question-counter-active");
                    $(".question-counter h2 > span").removeClass("counter-parent");
                    this_element.toggleClass("clicked");
                    $(".counter").html($(".clicked").length);
                    if ($("span.clicked").length === 0) {
                        $(".question-counter").removeClass("question-counter-active");
                        $(".question-counter h2 > span").addClass("counter-parent");
                    }
                    if (data.type === "add") {
                        iziToast.success({
                            class: 'customized-success-izi-toast-small',
                            message: 'سوال با موفقیت انتخاب شد !',
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
                    } else if (data.type === "remove") {
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
                } else {
                    iziToast.info({
                        class: 'customized-info-izi-toast',
                        title: 'هشدار',
                        message: 'لطفا دوباره امتحان کنید',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".iziToast-title").addClass("customized-izi-title");
                            $(".customized-info-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-info");
                            $(".customized-info-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"info-alert-circle\">\n" +
                                "    <svg class=\"bi bi-info\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                                "         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "        <path d=\"M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z\"/>\n" +
                                "        <circle cx=\"8\" cy=\"4.5\" r=\"1\"/>\n" +
                                "    </svg>\n" +
                                "</div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                }
            },
            error: function (data) {

            }
        });
    });

    $(".question-counter").click(function () {
        if ($("span.clicked").length === 0) {
            iziToast.warning({
                class: 'customized-warning-izi-toast-small',
                title: 'هشدار',
                message: 'سوالی انتخاب نشده است !',
                position: 'bottomLeft',
                onOpening: function () {
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                    $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                        "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                        "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"></path>\n" +
                        "                    </svg>\n" +
                        "                </div>");
                    $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                        "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                        "</svg>");
                }
            });
        } else {
            // $('.owl-carousel').trigger('next.owl.carousel');
            // $('.question-sidebar a.active').removeClass("active");
            // $(".owl-carousel .owl-stage").css('transition', '0.8s');
            // $(".question-sidebar").hide();
            // $(".sidebar").removeClass("showSlideBar");
            // $(".sidebar li span").removeClass("removeText");
            // $(".topDrive").removeClass("changeTopDrive");
            // $(".Page-Body").removeClass("max-width");
            // $(".question-body").css("max-width", "unset");
            // $(".scrolled-header").width($("body").width() - ($(".sidebar").width()) - 1);
            // $(".Page-Body").width($("body").width() - ($(".sidebar").width()) - 1);
            // $(window).resize(function () {
            //     $(".scrolled-header").width($("body").width() - ($(".sidebar").width()) - 1);
            //     $(".Page-Body").width($("body").width() - ($(".sidebar").width()) - 1);
            // });
            // $(".slider-control").click(function () {
            //     $(".scrolled-header").width($("body").width() - ($(".sidebar").width()) - 1);
            //     $(".Page-Body").width($("body").width() - ($(".sidebar").width()) - 1);
            // });
            let pack_pk = parseInt($(".question-counter").attr("id").replace("pack-", ""), 10);
        }
    });
    // $(".question-sidebar a:nth-child(2)").click(function () {
    //     if ($(".question-body .owl-item:last-child").hasClass("active")) {
    //         $('.owl-carousel').trigger('prev.owl.carousel');
    //         $(this).addClass("active");
    //         $(".owl-carousel .owl-stage").css('transition', '0.8s');
    //         $(".next-question-page-body").html("");
    //         $("span.clicked").removeClass("clicked");
    //         $(".customBox input:checked").prop("checked", false);
    //         $(".question-counter").removeClass("question-counter-active");
    //         $(".question-counter h2 > span").addClass("counter-parent");
    //     }
    // });

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
                                "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"></path>\n" +
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

    $("ul.pagination li.page-item").click(function () {
        let thisElement = $(this);
        if (!thisElement.hasClass("active") && !thisElement.hasClass("disabled")) {
            // $(".question-sidebar, .question-body").addClass("loading-background");
            $(".Page-Body").append(`<div class="loading-background"></div>`);
            $(".linear-activity").addClass("active");
            let data = {};
            data.unit = 10;
            let unit = data.unit;
            data.requestType = "pagination";
            let page = parseInt(thisElement.closest("ul").find(".page-item.active a").text(), 10);
            if ($(this).find("a[aria-label='Next']").length) {
                page++;
            } else if (thisElement.find("a[aria-label='Previous']").length) {
                page--;
            } else {
                page = parseInt(thisElement.find("a").text(), 10);
            }
            data.page = page;
            $.ajax({
                method: "POST",
                url: thisElement.closest("nav").attr("data-url"),
                data: data,
                success: function (data) {
                    thisElement.closest("nav").find("a[aria-label='Next']").closest("li").removeClass("disabled");
                    thisElement.closest("nav").find("a[aria-label='Previous']").closest("li").removeClass("disabled");
                    if (page === 1) {
                        thisElement.closest("nav").find("a[aria-label='Previous']").closest("li").addClass("disabled");
                    } else if (page === parseInt(thisElement.closest("nav").find("li:nth-last-child(2) a").text())) {
                        thisElement.closest("nav").find("a[aria-label='Next']").closest("li").addClass("disabled");
                    }
                    thisElement.closest("nav").find("li.page-item.active").removeClass("active");
                    thisElement.closest("nav").find("a.page-link span:contains(" + page + ")").closest("li.page-item").addClass("active");
                    thisElement.closest("div.pagination").find(".start-question-number").text((page - 1) * unit + 1);
                    thisElement.closest("div.pagination").find(".end-question-number").text(unit * page);
                    $(".questions-content").html("");
                    let questions = JSON.parse(data["questions"]);
                    for (let i in questions) {
                        $(".questions-content").append(`<div class="card w-100" id="${questions[i]["pk"]}">
                                <div class="card-body">
                                    <div class="question-type">
                                        <span>
                                            <span>پایه دهم</span>
                                            <span>
                                                <svg class="bi bi-chevron-left" width="1em" height="1em"
                                                     viewBox="0 0 16 16"
                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                                                          clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span>بانک سوال</span>
                                            <span>
                                                <svg class="bi bi-chevron-left" width="1em" height="1em"
                                                     viewBox="0 0 16 16"
                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                                                          clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span>همه ی سوالات</span>
                                        </span>
                                    </div>
                                    <div class="question-info">
                                        <div class="question-info-data">
                                                    <span class="question-level">
                                                        <svg class="bi bi-dot bi-dot-simple" width="1em" height="1em"
                                                             viewBox="0 0 16 16" fill="currentColor"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                  d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                                                  clip-rule="evenodd">
                                                            </path>
                                                        </svg>
                                                        <span>ساده</span>
                                                    </span>
                                            <span>
                                                    <svg class="bi bi-pie-chart" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                        <path fill-rule="evenodd"
                                                              d="M7.5 7.793V1h1v6.5H15v1H8.207l-4.853 4.854-.708-.708L7.5 7.793z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                    </svg>
                                                        </span>
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                    <svg class="bi bi-three-dots" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                    </svg>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="question-info-img">
                                            <img src=""
                                                    alt="question source">
                                            <p>98-99</p>
                                        </div>
                                    </div>
                                    <div class="form-group form-check">
                                        <label class="form-check-label customBox"
                                               for="Check">
                                            <input type="checkbox" class="form-check-input"
                                                   id="Check">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="question-text">
                                                <pre>
                                                    ${questions[i]["fields"]["body"]}
                                                </pre>
                                    </div>
                                    <div class="question-inline-choices">
                                        <span>1) ${questions[i]["fields"]["choice_1"]}</span>
                                        <span class="selected-correct-choice"><span
                                                class="inline-selected-correct-choice-tick"></span>2) ${questions[i]["fields"]["choice_2"]}</span>
                                        <span>3) ${questions[i]["fields"]["choice_3"]}</span>
                                        <span>4) ${questions[i]["fields"]["choice_4"]}</span>
                                    </div>
                                    <span>پاسخ تشریحی</span>
                                </div>
                                <div class="verbose-ans">
                                    <h3>پاسخ تشریحی</h3>
                                    <pre>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است.</pre>
                                    <button type="button" class="close">
                                        <svg class="bi bi-x" width="20px" height="20px" viewBox="0 0 16 16"
                                             fill="currentColor"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                                                  clip-rule="evenodd"></path>
                                            <path fill-rule="evenodd"
                                                  d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>`)
                    }
                    $(".linear-activity").removeClass("active");
                    $(".loading-background").remove();
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                    $(".question-sidebar, .question-body").removeClass("loading-background");
                    $(".linear-activity").removeClass("active");
                    iziToast.warning({
                        class: 'customized-warning-izi-toast',
                        title: 'هشدار',
                        message: 'دریافت اطلاعات با موفقیت انجام نشد !',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                                "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                                "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"></path>\n" +
                                "                    </svg>\n" +
                                "                </div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                }
            });
        }
    });
    $(".next-question-page-body #exampleModalCenter button").click(function () {
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

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
