$(document).ready(function () {
    $(".fa-sliders-h").click(function () {
        $(".sidebar").toggleClass('showSlideBar');
        $(".sidebar > ul > li > span:last-child ").toggleClass('removeText');
        $(".topDrive").toggleClass('changeTopDrive');
    });
});