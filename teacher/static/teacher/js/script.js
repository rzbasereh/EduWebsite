$(document).ready(function () {

    // add question Page
    $("input.tag-input").tagsInput({
        defaultText: '',
    });

    function collectData(element, mute) {
        mute = !mute;
        if (element === "QuestionSubject") {
            let QuestionSubjectData = $("div.question-textarea").text().trim().length;
            if (QuestionSubjectData === 0 && mute) {
                $(".question-textarea-label").append("<span class='warning'><span>*</span> لطفا صورت سوال را کامل کنید</span>");
                if ($(".question-textarea-label > span.warning").length > 1) {
                    $(".question-textarea-label > span.warning:last-child").css('display', 'none');
                }
                $(".Page-Body").scrollTop($(".question-textarea-label").position().top);
                $("div.question-textarea").click(function () {
                    $(".question-textarea-label > span.warning").css('display', 'none');
                });
            } else {
                return QuestionSubjectData;
            }
            return false;
        } else if (element === "CompleteAns") {
            let CompleteAnsData = $("div.complete-ans").text().trim().length;
            if (CompleteAnsData === 0 && mute) {
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
        } else if (element === "StateData") {
            $(".state .form-control").each(function (index, element) {
                let StateData = $(this).val();
                let SelectedOptionDate = $(this).closest(".form-group").find('option[selected]').text();
                if (StateData === SelectedOptionDate && mute) {
                    $(this).closest(".form-group").append("<span class='choice-warning'><span>*</span> لطفا وضعیت را مشخص کنید </span>");
                    if ($(this).closest(".form-group").find('.choice-warning').length > 1) {
                        $(this).closest(".form-group").find('.choice-warning:last-child').css('display', 'none');
                    }
                }
                $(this).click(function () {
                    $(this).closest(".form-group").find('.choice-warning').css('display', 'none');
                })
            });
            return false;
        } else if (element === "ChoiceVal1") {

        } else if (element === "ChoiceVal2") {

        } else if (element === "ChoiceVal3") {

        } else if (element === "ChoiceVal4") {

        } else if (element === "GradeSelect") {

        } else if (element === "LessonSelect") {

        } else if (element === "ChapterSelect") {

        } else if (element === "IsPublish") {

        } else if (element === "Tags") {

        }
        return false;
    }

    let addQuestionForm = $("#add-question-form");
    addQuestionForm.submit(function (event) {
        event.preventDefault();

        // let ChoiceTextData = $(".choice-text").text().length;
        // $(".choice-text").each(function (index, element) {
        //     if (ChoiceTextData === 0) {
        //         $(this).closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
        //         if ($(this).closest('.choice').find('.choice-warning').length > 1) {
        //             $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
        //         }
        //     }
        //     $(this).click(function () {
        //         $(this).closest('.choice').find('.choice-warning').css('display', 'none');
        //     });
        // });

        console.log($("input[name='is_publish']").val());
        $.ajax({
            type: "POST",
            url: addQuestionForm.attr("action"),
            data: {
                'pk': addQuestionForm.closest(".card").attr("id"),
                'body': collectData("QuestionSubject", false),
                'verbose_ans': collectData("CompleteAns", false),
                'is_publish': $("input[name='is_publish']").val()
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
        $(".updating").removeClass("updating-show ");
        $(".saved").addClass('saved-show');
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
                $(".saved").removeClass('saved-show');
                $(".updating").addClass("updating-show ");
            },
            error: function (data) {
                console.log(data);
            }
        })
    }

    $(".dispensing-btn").click(function () {
        intervalSave();
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
});