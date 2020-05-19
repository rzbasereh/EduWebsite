$(document).ready(function () {
    let add_user_form = $("#add-new-user");
    add_user_form.submit(function (event) {
        console.log("start");
        event.preventDefault();
        let data = {};
        data.first_name = add_user_form.find("input[name='first_name']").val();
        console.log(data.first_name);
        data.last_name = add_user_form.find("input[name='last_name']").val();
        console.log(data.last_name);
        data.email = add_user_form.find("input[name='email']").val();
        console.log(data.email);
        data.type = add_user_form.find("select[name='user_type']").val();
        console.log(data.type);
        data.phone_number = add_user_form.find("input[name='phone_number']").val();
        console.log(data.phone_number);
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