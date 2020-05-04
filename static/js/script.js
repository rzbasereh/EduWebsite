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
    addQuestionForm.submit(function (event) {
        event.preventDefault();
        // Todo  sadra: Check all field are fill and show appropriate warnings
        console.log($("input[name='is_publish']").val());
        $.ajax({
            type: "POST",
            url: addQuestionForm.attr("action"),
            data: {
                'pk': addQuestionForm.closest(".card").attr("id"),
                'body': "Question Body",
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
        nav: true,
        items: 1,
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