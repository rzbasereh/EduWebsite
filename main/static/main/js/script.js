$(document).ready(function () {

    let loginForm = $("form#login-form");
    loginForm.submit(function (event) {
        event.preventDefault();
        console.log(loginForm.serialize());
        console.log(loginForm.attr("action"));
        $.ajax({
            type: "POST",
            url: loginForm.attr("action"),
            data: loginForm.serialize(),
            success: function (data) {
                console.log("success");
                console.log(data);
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        })
    });

});