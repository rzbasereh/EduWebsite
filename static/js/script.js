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
        // Todo  sadra: Check all field are fill and show appropriate warnings
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
        $(".owl-carousel .owl-stage").css('transition', '1s');
        $(".change-btns .btn:first-child").removeClass('btn-blue');
        $(this).addClass('btn-blue')
    });
    $('.change-btns .btn:first-child').click(function () {
        $('.owl-carousel').trigger('prev.owl.carousel', [300]);
        $(".owl-carousel .owl-stage").css('transition', '1s');
        $(".change-btns .btn:last-child").removeClass('btn-blue');
        $(this).addClass('btn-blue');
    });
});