$(document).ready(function () {

    // add question Page
    $("input.tag-input").tagsInput({
        defaultText: '',
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
            if (CorrectChoice === 0 && mute) {
                iziToast.warning({
                    title: 'خطا',
                    message: 'لطفا گزینه ی صحیح را علامت بزنید',
                    rtl: 'true',
                    class: 'izi-font',
                });
            } else {
                return CorrectChoice;
            }
            return false;
        } else if (element === "ChoiceVal1") {
            let ChoiceVal1 = $(".first-choice-text").text();
            if (ChoiceVal1.length === 0) {
                if (mute) {
                    $(".first-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                    if ($(this).closest('.choice').find('.choice-warning').length > 1) {
                        $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                    }
                    $(".first-choice-text").click(function () {
                        $(this).closest('.choice').find('.choice-warning').css('display', 'none');
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
                    $(".second-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                    if ($(this).closest('.choice').find('.choice-warning').length > 1) {
                        $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                    }
                    $(".second-choice-text").click(function () {
                        $(this).closest('.choice').find('.choice-warning').css('display', 'none');
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
                    if ($(this).closest('.choice').find('.choice-warning').length > 1) {
                        $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                    }
                    $(".third-choice-text").click(function () {
                        $(this).closest('.choice').find('.choice-warning').css('display', 'none');
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
                    $(".fourth-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                    if ($(this).closest('.choice').find('.choice-warning').length > 1) {
                        $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                    }
                }
                $(".fourth-choice-text").click(function () {
                    $(this).closest('.choice').find('.choice-warning').css('display', 'none');
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
                    $("#grade-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                    if ($(this).closest(".form-group").find(".choice-warning").length > 1) {
                        $(this).closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                    }
                    $("#grade-select").click(function () {
                        $(this).closest(".form-group").find('.choice-warning').css('display', 'none');
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
                    if ($(this).closest(".form-group").find(".choice-warning").length > 1) {
                        $(this).closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                    }
                    $("#lesson-select").click(function () {
                        $(this).closest(".form-group").find('.choice-warning').css('display', 'none');
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
                    if ($(this).closest(".form-group").find(".choice-warning").length > 1) {
                        $(this).closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                    }
                    $("#chapter-select").click(function () {
                        $(this).closest(".form-group").find('.choice-warning').css('display', 'none');
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

        console.log($("input[name='is_publish']").val());
        $.ajax({
            type: "POST",
            url: addQuestionForm.attr("action"),
            data: {
                'pk': addQuestionForm.closest(".card").attr("id"),
                'body': collectData("QuestionSubject", false),
                'verbose_ans': collectData("CompleteAns", false),
                'is_publish': $("input[name='is_publish']").val(),
                'ChoiceVal1': collectData("ChoiceVal1", false),
                'ChoiceVal2': collectData("ChoiceVal2", false),
                'ChoiceVal3': collectData("ChoiceVal3", false),
                'ChoiceVal4': collectData("ChoiceVal4", false),
                'GradeSelect': collectData("GradeSelect", false),
                'LessonSelect': collectData("LessonSelect", false),
                'ChapterSelect': collectData("ChapterSelect", false),
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        })
    });
    $('.owl-carousel').owlCarousel({
        mouseDrag: false,
        touchDrag: false,
        loop: false,
        margin: 10,
        nav: false,
        items: 1,
        dots: false,
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
        data.is_publish = $("input[name='is_publish']").val();
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

    $(".dispensing-btn").click(function () {

    });

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
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    });
    editor($('.write'));
});