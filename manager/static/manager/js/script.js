$(document).ready(function () {

    let add_user_form = $("#add-new-user");
    add_user_form.submit(function (event) {
        event.preventDefault();
        let data = {};
        data.first_name = add_user_form.find("input[name='first_name']").val();
        data.last_name = add_user_form.find("input[name='last_name']").val();
        data.email = add_user_form.find("input[name='email']").val();
        data.type = add_user_form.find("select[name='user_type']").val();
        data.phone_number = add_user_form.find("input[name='phone_number']").val();

        $.ajax({
            method: "POST",
            url: add_user_form.attr("action"),
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });


});