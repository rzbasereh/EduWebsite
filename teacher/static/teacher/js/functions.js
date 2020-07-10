function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function collectData(element, mute) {
    mute = !mute;
    if (element === "QuestionSubject") {
        let QuestionSubjectData = $("div.question-textarea .fr-element.fr-view").html();
        if (QuestionSubjectData.trim().length === 0) {
            if (mute) {
                $(".question-textarea-label").append("<span class='warning'><span>*</span> لطفا صورت سوال را کامل کنید</span>");
                if ($(".question-textarea-label > span.warning").length > 1) {
                    $(".question-textarea-label > span.warning:last-child").css('display', 'none');
                }
                $(".Page-Body").scrollTop($(".question-textarea-label").position().top);
                $("div.question-textarea").click(function () {
                    $(".question-textarea-label > span.warning").css('display', 'none');
                });
            }
        } else {
            return QuestionSubjectData;
        }
        return false;
    } else if (element === "CompleteAns") {
        let CompleteAnsData = $("div.complete-ans  .fr-element.fr-view").html();
        if (CompleteAnsData.trim().length === 0) {
            if (mute) {
                $(".complete-ans-label").append("<span class='warning'><span>*</span> لطفا پاسخ تشریحی را وارد کنید</span>");
                if ($(".complete-ans-label > span.warning").length > 1) {
                    $(".complete-ans-label > span.warning:last-child").css('display', 'none');
                }
                $('.owl-carousel').trigger('next.owl.carousel');
                $(".change-btns .btn:first-child").removeClass('btn-blue');
                $('.change-btns .btn:last-child').addClass('btn-blue');
                $(".Page-Body").scrollTop($(".complete-ans").position().top);
                $("div.complete-ans").click(function () {
                    $(".complete-ans-label > span.warning").css('display', 'none');
                });
            }
        } else {
            return CompleteAnsData;
        }
        return false;
    } else if (element === "CorrectChoice") {
        let CorrectChoice = $(".custom-input input:checked ~ .tick").length;
        if (CorrectChoice === 0) {
            if (mute) {
                iziToast.warning({
                    title: 'خطا',
                    message: 'لطفا گزینه ی صحیح را علامت بزنید',
                    rtl: 'true',
                    class: 'izi-font',
                });
            }
        } else {
            return CorrectChoice;
        }
        return false;
    } else if (element === "ChoiceVal1") {
        let ChoiceVal1 = $(".first-choice-text .fr-element.fr-view").html();
        if (ChoiceVal1.length === 0) {
            if (mute) {
                $(".first-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                if ($(".first-choice-text").closest('.choice').find('.choice-warning').length > 1) {
                    $(".first-choice-text").closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                }
                $(".first-choice-text").click(function () {
                    $(".first-choice-text").closest('.choice').find('.choice-warning').css('display', 'none');
                });
            }
        } else {
            return ChoiceVal1;
        }
        return false;
    } else if (element === "ChoiceVal2") {
        let ChoiceVal2 = $(".second-choice-text .fr-element.fr-view").html();
        if (ChoiceVal2.length === 0) {
            if (mute) {
                $(".second-choice-text").closest('.choice').append("<span class='left-choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                if ($(".second-choice-text").closest('.choice').find('.left-choice-warning').length > 1) {
                    $(".second-choice-text").closest('.choice').find('.left-choice-warning:last-child').css('display', 'none');
                }
                $(".second-choice-text").click(function () {
                    $(".second-choice-text").closest('.choice').find('.left-choice-warning').css('display', 'none');
                });
            }
        } else {
            return ChoiceVal2;
        }
        return false;
    } else if (element === "ChoiceVal3") {
        let ChoiceVal3 = $(".third-choice-text .fr-element.fr-view").html();
        if (ChoiceVal3.length === 0) {
            if (mute) {
                $(".third-choice-text").closest('.choice').append("<span class='choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                if ($(".third-choice-text").closest('.choice').find('.choice-warning').length > 1) {
                    $(".third-choice-text").closest('.choice').find('.choice-warning:last-child').css('display', 'none');
                }
                $(".third-choice-text").click(function () {
                    $(".third-choice-text").closest('.choice').find('.choice-warning').css('display', 'none');
                });
            }
        } else {
            return ChoiceVal3;
        }
        return false;
    } else if (element === "ChoiceVal4") {
        let ChoiceVal4 = $(".fourth-choice-text .fr-element.fr-view").html();
        if (ChoiceVal4.length === 0) {
            if (mute) {
                $(".fourth-choice-text").closest('.choice').append("<span class='left-choice-warning'><span>*</span> لطفا گزینه را کامل کنید</span>");
                if ($(".fourth-choice-text").closest('.choice').find('.left-choice-warning').length > 1) {
                    $(".fourth-choice-text").closest('.choice').find('.left-choice-warning:last-child').css('display', 'none');
                }
            }
            $(".fourth-choice-text").click(function () {
                $(".fourth-choice-text").closest('.choice').find('.left-choice-warning').css('display', 'none');
            });
        } else {
            return ChoiceVal4;
        }
        return false;
    } else if (element === "GradeSelect") {
        let GradeSelect = $("#grade-select").val();
        let GradeSelectOption = $("#grade-select").closest(".form-group").find("option[selected]").text();
        if (GradeSelect === GradeSelectOption) {
            if (mute) {
                if ($("#grade-select").closest(".form-group").find(".choice-warning").length === 0) {
                    $("#grade-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                }
                $("#grade-select").click(function () {
                    $("#grade-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                });
            }
        } else {
            return GradeSelect;
        }
        return false;
    } else if (element === "LessonSelect") {
        let LessonSelect = $("#lesson-select").val();
        let LessonSelectOption = $("#lesson-select").closest(".form-group").find("option[selected]").text();
        if (LessonSelect === LessonSelectOption) {
            if (mute) {
                $("#lesson-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                if ($("#lesson-select").closest(".form-group").find(".choice-warning").length > 1) {
                    $("#lesson-select").closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                }
                $("#lesson-select").click(function () {
                    $("#lesson-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                });
            }
        } else {
            return LessonSelect;
        }
        return false;
    } else if (element === "ChapterSelect") {
        let ChapterSelect = $("#chapter-select").val();
        let ChapterSelectOption = $("#chapter-select").closest(".form-group").find("option[selected]").text();
        if (ChapterSelect === ChapterSelectOption) {
            if (mute) {
                $("#chapter-select").closest(".form-group").append("<span class='choice-warning'><span>*</span>لطفا وضعیت را مشخص کنید</span>");
                if ($("#chapter-select").closest(".form-group").find(".choice-warning").length > 1) {
                    $("#chapter-select").closest(".form-group").find(".choice-warning:last-child").css('display', 'none');
                }
                $("#chapter-select").click(function () {
                    $("#chapter-select").closest(".form-group").find('.choice-warning').css('display', 'none');
                });
            }
        }
    } else {
        return ChapterSelect;
    }
    return false;
}

function intervalSave() {
    $(".saved").removeClass('saved-show');
    $(".updating").addClass("updating-show ");

    let data = {};
    data.pk = addQuestionForm.closest(".card").attr("id");
    if (collectData("QuestionSubject", true) !== false) {
        data.body = collectData("QuestionSubject", true)
    } else {
        data.body = ""
    }
    if (collectData("CompleteAns", true) !== false) {
        data.verbose_ans = collectData("CompleteAns", true)
    } else {
        data.verbose_ans = ""
    }
    if (collectData("ChoiceVal1", true) !== false) {
        data.ChoiceVal1 = collectData("ChoiceVal1", true);
    } else {
        data.ChoiceVal1 = ""
    }
    if (collectData("ChoiceVal2", true) !== false) {
        data.ChoiceVal2 = collectData("ChoiceVal2", true);
    } else {
        data.ChoiceVal2 = ""
    }
    if (collectData("ChoiceVal3", true) !== false) {
        data.ChoiceVal3 = collectData("ChoiceVal3", true);
    } else {
        data.ChoiceVal3 = ""
    }
    if (collectData("ChoiceVal4", true) !== false) {
        data.ChoiceVal4 = collectData("ChoiceVal4", true);
    } else {
        data.ChoiceVal4 = ""
    }
    if (collectData("GradeSelect", true) !== false) {
        data.GradeSelect = collectData("GradeSelect", true);
    } else {
        data.GradeSelect = ""
    }
    if (collectData("LessonSelect", true) !== false) {
        data.LessonSelect = collectData("LessonSelect", true);
    } else {
        data.LessonSelect = ""
    }
    if (collectData("ChapterSelect", true) !== false) {
        data.ChapterSelect = collectData("ChapterSelect", true);
    } else {
        data.ChapterSelect = ""
    }
    if (collectData("CorrectChoice", true) !== false) {
        data.CorrectChoice = collectData("CorrectChoice", true);
    } else {
        data.CorrectChoice = ""
    }
    data.is_publish = $("input[name='is_publish']").val();
    data.redirect = "true";
    console.log("updating ...");
    $.ajax({
        type: "POST",
        url: addQuestionForm.attr("action"),
        data: data,
        success: function (data) {
            console.log(data);
            $(".updating").removeClass("updating-show ");
            $(".saved").addClass('saved-show');
        },
        error: function (data) {
            console.log(data);
        }
    })
}

function questionSelection() {
    let this_element = $(this);
    let state = "add";
    if (this_element.hasClass("clicked")) {
        state = "remove";
    }
    $.ajax({
        method: "POST",
        url: $(".question-counter").attr("data-url"),
        data: {
            "pk": this_element.closest(".card").attr("id"),
            "state": state,
        },
        success: function (data) {
            if (data.value === "success") {
                $(".question-counter").addClass("question-counter-active");
                $(".question-counter h2 > span").css("display", "inline-block");
                this_element.toggleClass("clicked");
                $(".counter").html(data["count"]);

                if (data["count"] === 0) {
                    $(".question-counter").removeClass("question-counter-active");
                    $(".question-counter h2 > span").css("display", "none");
                }
                if (data.type === "add") {
                    iziToast.success({
                        class: 'customized-success-izi-toast-small',
                        message: 'سوال با موفقیت انتخاب شد !',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-texts").addClass("customized-izi-text-small");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-success");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").addClass("customized-izi-icon-small");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"success-alert-circle\">\n" +
                                "    <svg class=\"bi bi-check\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>\n" +
                                "</div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                } else if (data.type === "remove") {
                    iziToast.success({
                        class: 'customized-success-izi-toast-small',
                        message: 'سوال با موفقیت حذف شد !',
                        position: 'bottomLeft',
                        onOpening: function () {
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-texts").addClass("customized-izi-text-small");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-success");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").addClass("customized-izi-icon-small");
                            $(".customized-success-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"success-alert-circle\">\n" +
                                "    <svg class=\"bi bi-check\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>\n" +
                                "</div>");
                            $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                "</svg>");
                        }
                    });
                }
            } else {
                iziToast.info({
                    class: 'customized-info-izi-toast',
                    title: 'هشدار',
                    message: 'لطفا دوباره امتحان کنید',
                    position: 'bottomLeft',
                    onOpening: function () {
                        $(".iziToast-title").addClass("customized-izi-title");
                        $(".customized-info-izi-toast>.iziToast-body .iziToast-icon").removeClass("ico-info");
                        $(".customized-info-izi-toast>.iziToast-body .iziToast-icon").html("<div class=\"info-alert-circle\">\n" +
                            "    <svg class=\"bi bi-info\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                            "         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "        <path d=\"M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z\"/>\n" +
                            "        <circle cx=\"8\" cy=\"4.5\" r=\"1\"/>\n" +
                            "    </svg>\n" +
                            "</div>");
                        $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                            "</svg>");
                    }
                });
            }
        },
        error: function (data) {

        }
    });
}

function updatePagination(count) {
    let unit = parseInt($('.t').val());
    $("ul.pagination li.page-item").off();
    $("ul.pagination li.page-item").click({Page: true}, getPage);
    if (count%unit === 0) {
        let page = parseInt(count / unit);
    } else {
        page = parseInt(count / unit) + 1;
    }
    console.log($('ul.pagination li.pagination-item:last-child > a ').html());
}

function getPage(event) {
    let thisElement = $(this);
    if (!thisElement.hasClass("active") && !thisElement.hasClass("disabled")) {
        $(".Page-Body").append(`<div class="loading-background"></div>`);
        $(".linear-activity").addClass("active");
        let data = {};
        let unit = parseInt($('.t').val());
        data.unit = unit;
        data.requestType = "pagination";
        let url;
        if (event.data.Page === true) {
            var page = parseInt(thisElement.closest("ul").find(".page-item.active a").text(), 10);
            if ($(this).find("a[aria-label='Next']").length) {
                page++;
            } else if (thisElement.find("a[aria-label='Previous']").length) {
                page--;
            } else {
                page = parseInt(thisElement.find("a").text(), 10);
            }
            data.page = page;
            url = thisElement.closest("nav").attr("data-url");
            console.log(data.page);
        } else {
            data.page = 1;
            var orderedNum = parseInt(thisElement.val());
            data.unit = orderedNum;
            url = thisElement.attr("data-url");
        }
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            success: function (data) {
                thisElement.closest("nav").find("a[aria-label='Next']").closest("li").removeClass("disabled");
                thisElement.closest("nav").find("a[aria-label='Previous']").closest("li").removeClass("disabled");
                if (page === 1) {
                    thisElement.closest("nav").find("a[aria-label='Previous']").closest("li").addClass("disabled");
                } else if (page === parseInt(thisElement.closest("nav").find("li:nth-last-child(2) a").text())) {
                    thisElement.closest("nav").find("a[aria-label='Next']").closest("li").addClass("disabled");
                }
                thisElement.closest("nav").find("li.page-item.active").removeClass("active");
                thisElement.closest("nav").find("a.page-link span:contains(" + page + ")").closest("li.page-item").addClass("active");
                $(".questions-content").html("");
                let questions = JSON.parse(data["questions"]);
                let m = 0;
                thisElement.closest("div.pagination").find(".start-question-number").text((page - 1) * unit + 1);
                thisElement.closest("div.pagination").find(".end-question-number").text((page - 1) * unit + questions.length);
                for (let i in questions) {
                    let checked_pk = -1;
                    if ($.inArray(questions[i]["pk"], data["checked"]) !== -1) {
                        checked_pk = questions[i]["pk"];
                    }
                    $(".questions-content").append(`<div class="card w-100" id="${questions[i]["pk"]}">
                                <div class="card-body">
                                    <div class="question-type">
                                        <span>
                                            <span>پایه دهم</span>
                                            <span>
                                                <svg class="bi bi-chevron-left" width="1em" height="1em"
                                                     viewBox="0 0 16 16"
                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                                                          clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span>بانک سوال</span>
                                            <span>
                                                <svg class="bi bi-chevron-left" width="1em" height="1em"
                                                     viewBox="0 0 16 16"
                                                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                                                          clip-rule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span>همه ی سوالات</span>
                                        </span>
                                    </div>
                                    <div class="question-info">
                                        <div class="question-info-data">
                                                    <span class="question-level">
                                                        <svg class="bi bi-dot 
                                                        ${questions[i]["fields"]["level"] === "1" ? "bi-dot-simple" : ""}
                                                        ${questions[i]["fields"]["level"] === "2" ? "bi-dot-middle" : ""}
                                                        ${questions[i]["fields"]["level"] === "3" ? "bi-dot-hard" : ""}
                                                        " width="1em" height="1em"
                                                             viewBox="0 0 16 16" fill="currentColor"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                  d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                                                  clip-rule="evenodd">
                                                            </path>
                                                        </svg>
                                                        <span>
                                                            ${questions[i]["fields"]["level"] === "1" ? "ساده" : ""}
                                                            ${questions[i]["fields"]["level"] === "2" ? "متوسط" : ""}
                                                            ${questions[i]["fields"]["level"] === "3" ? "دشوار" : ""}
                                                        </span>
                                                    </span>
                                            <span>
                                                    <svg class="bi bi-pie-chart" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                        <path fill-rule="evenodd"
                                                              d="M7.5 7.793V1h1v6.5H15v1H8.207l-4.853 4.854-.708-.708L7.5 7.793z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                    </svg>
                                                        </span>
                                            <div class="dropdown">
                                                <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                    <svg class="bi bi-three-dots" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                                                              clip-rule="evenodd">
                                                        </path>
                                                    </svg>
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="question-info-img">
                                            <img src="/static/main/img/${questions[i]["fields"]["source"]}.png" alt="question source">
                                        </div>
                                        <span>98-99</span>
                                    </div>
                                    <div class="form-group form-check">
                                        <label class="form-check-label customBox"
                                               for="Check-${m}">
                                            <input type="checkbox" class="form-check-input"
                                                   id="Check-${m}" ${checked_pk === -1 ? "" : "checked"}>
                                            <span class="checkmark ${checked_pk === -1 ? "" : "clicked"}"></span>
                                        </label>
                                    </div>
                                    <div class="question-text">
                                        ${questions[i]["fields"]["body"]}           
                                    </div>
                                    <div class="question-inline-choices">
                                        <span ${questions[i]["fields"]["correct_ans"] === "1" ? `class="selected-correct-choice"` : ""}>
                                        ${questions[i]["fields"]["correct_ans"] === "1" ? `<span class="inline-selected-correct-choice-tick"></span>` : ""}
                                        1) ${questions[i]["fields"]["choice_1"]}
                                        </span>
                                        <span ${questions[i]["fields"]["correct_ans"] === "2" ? `class="selected-correct-choice"` : ""}>
                                        ${questions[i]["fields"]["correct_ans"] === "2" ? `<span class="inline-selected-correct-choice-tick"></span>` : ""}
                                        2) ${questions[i]["fields"]["choice_2"]}
                                        </span>
                                        <span ${questions[i]["fields"]["correct_ans"] === "3" ? `class="selected-correct-choice"` : ""}>
                                        ${questions[i]["fields"]["correct_ans"] === "3" ? `<span class="inline-selected-correct-choice-tick"></span>` : ""}
                                        3) ${questions[i]["fields"]["choice_3"]}
                                        </span>
                                        <span ${questions[i]["fields"]["correct_ans"] === "4" ? `class="selected-correct-choice"` : ""}>
                                        ${questions[i]["fields"]["correct_ans"] === "4" ? `<span class="inline-selected-correct-choice-tick"></span>` : ""}
                                        4) ${questions[i]["fields"]["choice_4"]}
                                        </span>
                                    </div>
                                    ${questions[i]["fields"]["verbose_ans"] !== "" ? '<span>پاسخ تشریحی</span>' : ""}
                                </div>
                                ${questions[i]["fields"]["verbose_ans"] !== "" ? `
                                <div class="verbose-ans">
                                    <h3>پاسخ تشریحی</h3>
                                    <pre>
                                        ${questions[i]["fields"]["verbose_ans"]}
                                    </pre>
                                    <button type="button" class="close">
                                        <svg class="bi bi-x" width="20px" height="20px" viewBox="0 0 16 16"
                                             fill="currentColor"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                                                  clip-rule="evenodd"/>
                                            <path fill-rule="evenodd"
                                                  d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                                ` : ""}
                            </div>`);
                    m++;
                }
                console.log(data.count);
                $(".questions-content .checkmark").click(questionSelection);
                $(".question-counter").click(function () {
                    console.log($("span.clicked").length === 0);
                    if ($("span.clicked").length === 0) {
                        let preventClick = false;
                        $('.sidebar-bottom-box').click(function (e) {
                            if (!preventClick) {
                                $(this).html($(this).html());
                            }
                            preventClick = true;
                            return false;
                        });

                        iziToast.warning({
                            class: 'customized-warning-izi-toast-small',
                            title: 'هشدار',
                            message: 'سوالی انتخاب نشده است !',
                            position: 'bottomLeft',
                            onOpening: function () {
                                $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-texts").addClass("customized-izi-text-small");
                                $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").removeClass("ico-warning");
                                $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").addClass("customized-izi-icon-small");
                                $(".customized-warning-izi-toast-small>.iziToast-body .iziToast-icon").html("<div class=\"warning-alert-circle\">\n" +
                                    "                    <svg class=\"bi bi-exclamation\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
                                    "                         xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "                        <path d=\"M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z\"></path>\n" +
                                    "                    </svg>\n" +
                                    "                </div>");
                                $(".iziToast>.iziToast-close").html("<svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                    "  <path fill-rule=\"evenodd\" d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                    "  <path fill-rule=\"evenodd\" d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\" clip-rule=\"evenodd\"/>\n" +
                                    "</svg>");
                            }
                        });
                    } else {
                        let pack_pk = parseInt($(".question-counter").attr("id").replace("pack-", ""), 10);
                    }
                });
                console.log(orderedNum);
                updatePagination(data.count, event.data.unit);
                $(".linear-activity").removeClass("active");
                $(".loading-background").remove();
                if (event.data.Page === true) {
                    $(".question-body").animate({
                        scrollTop: $(".row.questions-content .card:first-child").offset().top
                    }, 1000);
                }
                $(".questions .card-body > span").click(function () {
                    $(this).closest(".card").find(".verbose-ans").show();
                });
                $(".verbose-ans .close").click(function () {
                    $(this).closest(".card").find(".verbose-ans").hide();
                });
            },
            error: function (data) {
                console.log(data);
                $(".linear-activity").removeClass("active");
                $(".loading-background").remove();
                iziToast.warning({
                    class: 'customized-warning-izi-toast',
                    title: 'هشدار',
                    message: 'دریافت اطلاعات با موفقیت انجام نشد !',
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
        });
    }
}

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