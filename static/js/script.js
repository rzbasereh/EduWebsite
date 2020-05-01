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
});