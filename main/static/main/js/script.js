$(document).ready(function () {

    let loginForm = $("form#login-form");
    loginForm.submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: loginForm.attr("action"),
            data: loginForm.serialize(),
            success: function (data) {
                console.log(data);
                if (data.url) {
                    $(location).attr("href", data.url)
                }
            },
            error: function (data) {
                console.log(data);
            }
        })
    });

});