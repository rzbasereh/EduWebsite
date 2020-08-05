$(document).ready(function () {
    $("body").css("visibility", "visible");

    let loginForm = $("form#login-form");
    loginForm.submit(function (event) {
        event.preventDefault();
        loginForm.find("button[type='submit'] > span").addClass("d-none");
        loginForm.find("button[type='submit'] > div").removeClass("d-none");
        loginForm.find("button[type='submit']").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: loginForm.attr("action"),
            data: loginForm.serialize(),
            success: function (data) {
                console.log(data);
                if (data.url) {
                    loginForm.find("button[type='submit'] > span").removeClass("d-none");
                    loginForm.find("button[type='submit'] > div").addClass("d-none");
                    $(location).attr("href", data.url)
                } else {
                    loginForm.find("button[type='submit'] > span").removeClass("d-none");
                    loginForm.find("button[type='submit'] > div").addClass("d-none");
                    loginForm.find("button[type='submit']").prop("disabled", false);
                    iziToast.warning({
                        class: 'customized-warning-izi-toast',
                        title: 'هشدار',
                        message: 'نام کاربری یا رمزعبور شما اشتباه است.',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                            $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                                "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                                "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"/>\n" +
                                "                    </svg>\n" +
                                "                </div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                }
            },
            error: function (data) {
                loginForm.find("button[type='submit'] > span").removeClass("d-none");
                loginForm.find("button[type='submit'] > div").addClass("d-none");
                loginForm.find("button[type='submit']").prop("disabled", false);
                console.log(data);
                iziToast.warning({
                    class: 'customized-warning-izi-toast',
                    title: 'هشدار',
                    message: 'نام کاربری یا رمزعبور شما اشتباه است.',
                    position: 'bottomLeft',
                    onOpening: function () {
                        $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                        $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                            "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                            "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"/>\n" +
                            "                    </svg>\n" +
                            "                </div>");
                        $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "</svg>");
                    }
                });
            }
        })
    });

    let recoverForm = $("form#ajax_recover_pass");
    recoverForm.submit(function (event) {
        event.preventDefault();
        recoverForm.find("button[type='submit'] > span").addClass("d-none");
        recoverForm.find("button[type='submit'] > div").removeClass("d-none");
        recoverForm.find("button[type='submit']").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: recoverForm.attr("action"),
            data: recoverForm.serialize(),
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                recoverForm.find("button[type='submit'] > span").removeClass("d-none");
                recoverForm.find("button[type='submit'] > div").addClass("d-none");
                recoverForm.find("button[type='submit']").prop("disabled", false);
                console.log(data);
                iziToast.warning({
                    class: 'customized-warning-izi-toast',
                    title: 'هشدار',
                    message: 'این عملیات با مشکل مواجه شد، لطفا دوباره اقدام کنید.',
                    position: 'bottomLeft',
                    onOpening: function () {
                        $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                        $(".customized-warning-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                            "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                            "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"/>\n" +
                            "                    </svg>\n" +
                            "                </div>");
                        $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "</svg>");
                    }
                });
            }
        })
    });
});