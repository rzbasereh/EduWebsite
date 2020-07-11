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


    let add_class_form = $("#add-new-class");
    add_class_form.submit(function (event) {
        event.preventDefault();
        let data = {};
        data.title = add_class_form.find("input[name='title']").val();
        data.teacher = add_class_form.find("select[name='teacher']").val();
        data.classLink = add_class_form.find("input[name='classLink']").val();
        data.is_open = add_class_form.find("select[name='is_open']").val();
        data.sign_up_from = add_class_form.find("input[name='sign_up_from']").val();
        data.sign_up_until = add_class_form.find("input[name='sign_up_until']").val();
        data.start_class = add_class_form.find("input[name='start_class']").val();
        data.end_class = add_class_form.find("input[name='end_class']").val();
        data.time_table = add_class_form.find("input[name='time_table']").val();
        data.exam_access = add_class_form.find("input[name='exam_access']").val();

        $.ajax({
            method: "POST",
            url: add_class_form.attr("action"),
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