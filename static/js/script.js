$(document).ready(function () {
    $(".fa-sliders-h").click(function () {
        $(".sidebar").toggleClass('showSlideBar');
        $(".sidebar > ul > a > li > span:last-child").toggleClass('removeText');
        $(".topDrive").toggleClass('changeTopDrive');
        $(".Page-Body").toggleClass('max-width');
    });
    $(".question-sidebar  a").click(function () {
        $(".active").removeClass('active');
        $(this).addClass('active');
    });
    // Make Exam Page
    $("input.tag-input").tagsInput({
        defaultText: '',
    });
    let addQuestionForm = $(".add-question-form");
    addQuestionForm.submit(function (e) {
        e.preventDefault();
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
    $(".me-btns .btn-blue").click(function () {
        let QuestionSubjectData = $("div.question-textarea").text().trim().length;
        if (QuestionSubjectData === 0) {
            $(".question-textarea-label").append("<span class='warning'><span>*</span> لطفا صورت سوال را کامل کنید</span>");
            if ($(".question-textarea-label > span.warning").length > 1) {
                $(".question-textarea-label > span.warning:last-child").css('display', 'none');
            }
            $(".Page-Body").scrollTop($(".question-textarea-label").position().top);
        }
        $("div.question-textarea").click(function () {
            $(".question-textarea-label > span.warning").css('display', 'none');
        });
        let CompleteAnsData = $("div.complete-ans").text().trim().length;
        if (CompleteAnsData === 0) {
            $(".complete-ans-label").append("<span class='warning'><span>*</span> لطفا پاسخ تشریحی را وارد کنید</span>");
            if ($(".complete-ans-label > span.warning").length > 1) {
                $(".complete-ans-label > span.warning:last-child").css('display', 'none');
            }
            $('.owl-carousel').trigger('next.owl.carousel');
            $(".change-btns .btn:first-child").removeClass('btn-blue');
            $('.change-btns .btn:last-child').addClass('btn-blue');
            $(".Page-Body").scrollTop($(".complete-ans").position().top);
        }
        $("div.complete-ans").click(function () {
            $(".complete-ans-label > span.warning").css('display', 'none');
        });
        let ChoiceTextData = $(".choice-text").text().length;
        $(".choice-text").each(function (index, element) {
            if (ChoiceTextData === 0) {
                $(this).closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                if ($(this).closest('.choice').find('.choice-warning').length > 1) {
                    $(this).closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                }
            }
            $(this).click(function () {
                $(this).closest('.choice').find('.choice-warning').css('display', 'none');
            });
        });
        let CorrectChoice = $(".custom-input input:checked ~ .tick").length;
        if (CorrectChoice === 0) {
            iziToast.warning({
                title: 'خطا',
                message: 'لطفا گزینه ی صحیح را علامت بزنید',
                rtl: 'true',
                class: 'izi-font',
            });
        }

        $(".state .form-control").each(function (index, element) {
            let StateData = $(this).val();
            let SelectedOptionDate = $(this).closest(".form-group").find('option[selected]').text();
            if (StateData === SelectedOptionDate) {
                $(this).closest(".form-group").append("<span class='choice-warning'><span>*</span> لطفا وضعیت را مشخص کنید </span>");
                if ($(this).closest(".form-group").find('.choice-warning').length > 1) {
                    $(this).closest(".form-group").find('.choice-warning:last-child').css('display', 'none');
                }
            }
            $(this).click(function () {
                $(this).closest(".form-group").find('.choice-warning').css('display', 'none');
            })
        });
    });
    $(".dispensing-btn").click(function () {
        $(this).toggleClass("clicked");
        if ($(this).hasClass('clicked')) {
            $(".saved").removeClass('saved-show');
            $(".updating").addClass("updating-show ");
        }
        if (!$(this).hasClass('clicked')) {
            $(".updating").removeClass("updating-show ");
            $(".saved").addClass('saved-show');
        }
    });
});