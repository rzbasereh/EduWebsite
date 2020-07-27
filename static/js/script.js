$(document).ready(function () {
    $(".slider-control").click(function () {
        $(".sidebar").toggleClass('close-sidebar');
        $(".sidebar > div > a > span").toggleClass('removeText');
        $(".topDrive").toggleClass('changeTopDrive');
        $(".Page-Body").toggleClass('max-width');
    });

    // Side Nav
    $("[data-toggle='side-nav']").click(function () {
        const dataTarget = $(this).attr("data-target");
        $(".side-nav" + dataTarget).addClass("show");
        $("body").append(`<div class="side-nav-backdrop fade show"></div>`);

    });

    $("[data-dismiss='side-nav']").click(function () {
        $(".side-nav").removeClass("show");
        $("body").find(".side-nav-backdrop.fade.show").remove();
    });
    // End Side Nav

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