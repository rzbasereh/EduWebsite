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
    let addQuestionForm = $("#add-question-form");
    addQuestionForm.submit(function (e) {
        e.preventDefault();
        // Todo  sadra: Check all field are fill and show appropriate warnings
        $.ajax({
            type: "POST",
            url: addQuestionForm.attr("action"),
            data: {
                'data': "DATA",
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
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});
});