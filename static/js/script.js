$(document).ready(function () {

    $(".slider-control").click(function () {
        $(".sidebar").toggleClass('close-sidebar');
        $(".sidebar > div > a > span").toggleClass('removeText');
        $(".topDrive").toggleClass('changeTopDrive');
        $(".Page-Body").toggleClass('max-width');
        if ($(window).width() <= 992) {
            $('.sidebar').removeClass('close-sidebar');
            $('.topDrive').removeClass('changeTopDrive');
            $('.sidebar > div > a > span').removeClass('removeText');
            $('.sidebar').addClass('responsive-sidebar');
            $('.sidebar a').addClass('responsive-sidebar-a');
            $('.sidebar a').attr('data-original-title', null);
            $('.responsive-body').addClass('responsive-body-show')
        }
    });

    $(window).resize(function () {
        if ($(window).width() <= 992) {
            $('.topDrive').removeClass('changeTopDrive');
            $('.sidebar').removeClass('close-sidebar');
            $('.sidebar').removeClass('responsive-sidebar');
            $('.sidebar a').removeClass('responsive-sidebar-a');
            $('.sidebar > div > a > span').removeClass('removeText');
            $('.sidebar a').attr('data-original-title', null);
            $('.responsive-body').removeClass('responsive-body-show');
        }
        if ($(window).width() >= 992) {
            $('.responsive-body').removeClass('responsive-body-show');
            if (!$('.sidebar').hasClass('close-sidebar')) {
                $('.topDrive').removeClass('changeTopDrive');
            }
        }
    });

    $('.responsive-body').click(function () {
        $('.sidebar').removeClass('responsive-sidebar');
        $('.sidebar a').removeClass('responsive-sidebar-a');
        $(this).removeClass('responsive-body-show')
    });


    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
    // sidebar tooltip
    if (!$("div.sidebar").hasClass('close-sidebar')) {
        $('.sidebar a:first-child').attr('data-original-title', null);
        $('.sidebar a:nth-child(2)').attr('data-original-title', null);
        $('.sidebar a:nth-child(3)').attr('data-original-title', null);
        $('.sidebar a:nth-child(4)').attr('data-original-title', null);
        $('.sidebar a:last-child').attr('data-original-title', null);
    }
    $(".slider-control").click(function () {
        if (!$("div.sidebar").hasClass('close-sidebar')) {
            $('.sidebar a:first-child').attr('data-original-title', null);
            $('.sidebar a:nth-child(2)').attr('data-original-title', null);
            $('.sidebar a:nth-child(3)').attr('data-original-title', null);
            $('.sidebar a:nth-child(4)').attr('data-original-title', null);
            $('.sidebar a:last-child').attr('data-original-title', null);
        } else {
            $('.sidebar a:first-child').attr('data-original-title', "<p class=\'tool\'>داشبورد</p>");
            $('.sidebar a:nth-child(2)').attr('data-original-title', "<p class=\'tool\'>کاربران</p>");
            $('.sidebar a:nth-child(3)').attr('data-original-title', "<p class=\'tool\'>گزارش ها</p>");
            $('.sidebar a:nth-child(4)').attr('data-original-title', "<p class=\'tool\'>کلاس ها</p>");
            $('.sidebar a:last-child').attr('data-original-title', "<p class=\'tool\'>گفتگو</p>");
        }
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