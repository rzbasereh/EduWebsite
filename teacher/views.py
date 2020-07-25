from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from django.contrib import messages
from .models import *
from manager.models import TeacherAccess, Grade
from main.models import Message, Notification
from django.core import serializers
from django.db.models import Q
import json


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = TeacherForm.objects.filter(user=request.user.teacher)[0].avatar.url
    has_message = Message.objects.filter(user=request.user, is_seen=False).exists()
    message = Message.objects.filter(user=request.user)
    has_notification = Notification.objects.filter(user=request.user, is_seen=False).exists()
    notification = Notification.objects.filter(user=request.user, is_seen=False)
    is_add_to_edit = Exam.objects.filter(creator=request.user, is_submit=True, is_edit=True, is_add=True).exists()
    edited_pk = -1
    if is_add_to_edit:
        edited_pk = Exam.objects.get(creator=request.user, is_submit=True, is_edit=True, is_add=True)
    user = {
        'full_name': full_name,
        'avatar': avatar,
        'has_message': has_message,
        'message': message,
        'has_notification': has_notification,
        'notification': notification,
        'is_add_to_edit': is_add_to_edit,
        'edited_pk': edited_pk
    }
    return user


def index(request):
    user = commonData(request)
    return render(request, 'teacher/index.html', {'user': user})


def questions(request):
    # for i in range(50):
    #     m = Question(author=request.user.teacher, body=i)
    #     m.save()
    if Exam.objects.filter(creator=request.user, is_submit=True, is_edit=True, is_add=False).exists():
        messages.success(request, "برای دسترسی به صفحه قبل لازم است ابتدا این ویرایش را تکمیل کنید!")
        exam_pk = Exam.objects.get(creator=request.user, is_submit=True, is_edit=True, is_add=False).id
        return HttpResponseRedirect(reverse("teacher:edit_exam", kwargs={"pk": exam_pk}))
    else:
        user = commonData(request)
        questions_data = {
            'count': Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True)).count(),
            'list': Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True)).order_by('-pk')[:10],
        }
        grade = Grade.objects.last().source
        selected_question = []
        if Exam.objects.filter(creator=request.user, is_publish=True).exists():
            if Exam.objects.filter(creator=request.user, is_publish=True, is_submit=False).exists():
                exam = Exam.objects.get(creator=request.user, is_submit=False)
                exam_questions = ExamQuestion.objects.filter(exam=exam).all()
                for q in exam_questions:
                    selected_question.append(q.question.id)
        return render(request, 'teacher/questions.html',
                      {'user': user, 'questions': questions_data, 'selected_question': selected_question,
                       'grade': grade})


def newQuestion(request):
    if TeacherAccess.objects.filter(teacher=request.user.teacher).exists() and \
            TeacherAccess.objects.filter(teacher=request.user.teacher)[0].add_question_access:
        user = commonData(request)
        pk = request.session['pk']
        del request.session['pk']
        return render(request, 'teacher/new_question.html', {'user': user, 'pk': pk})
    messages.error(request, "شما مجاز به انجام این عملیات نیستید!")
    return HttpResponseRedirect(reverse('teacher:questions'))


def saveGrades(request):
    if request.method == "POST":
        grades = request.POST.getlist('grades[]')
        if len(grades) == 0:
            return JsonResponse({"value": "empty list"})
        else:
            author = request.user.teacher
            question = Question(author=author, grades=grades)
            question.save()
            pk = question.id
            request.session['pk'] = pk
            return JsonResponse({"value": "success", "url": reverse("teacher:newQuestion")})
    else:
        return JsonResponse({"value": "invalid Request"})


def addQuestion(request):
    if request.method == "POST":
        pk = request.POST.get('pk')
        author = request.user.teacher
        body = request.POST.get('body')
        choice1 = request.POST.get('ChoiceVal1')
        choice2 = request.POST.get('ChoiceVal2')
        choice3 = request.POST.get('ChoiceVal3')
        choice4 = request.POST.get('ChoiceVal4')
        is_redirect = request.POST.get('redirect')
        # choice5 = ""
        # print(is_redirect == "tru")
        is_redirect = False
        # if SubGrade.objects.filter(name=request.POST.get('GradeSelect')).exists():
        #     grade = SubGrade.objects.filter(name=request.POST.get('GradeSelect')).first()
        # else:
        grade = ""
        # lesson = request.POST.get('LessonSelect')
        # chapter = request.POST.get('ChapterSelect')
        lesson = None
        chapter = None
        correct_ans = ""
        verbose_ans = request.POST.get('verbose_ans')
        is_publish = False
        if Question.objects.filter(id=pk).exists():
            question = Question.objects.get(id=pk)
            question.body = body
            question.author = author
            question.verbose_ans = verbose_ans
            question.choice_1 = choice1
            question.choice_2 = choice2
            question.choice_3 = choice3
            question.choice_4 = choice4
            question.grade = grade
            question.lesson = lesson
            question.chapter = chapter
            question.is_publish = is_publish
            question.save()
            if not is_redirect:
                return JsonResponse({'success': "update"})
        else:
            return JsonResponse({'success': "Error"})
        messages.success(request, 'successfully add')
        return HttpResponseRedirect(reverse('teacher:questions'))
    else:
        return JsonResponse({'error': 'Invalid Request!'})


def cancelAddQuestion(request, pk):
    if Question.objects.filter(id=pk).exists():
        Question.objects.filter(id=pk).delete()
    messages.success(request, "تغییرات با موفقیت لغو شد!")
    return HttpResponseRedirect(reverse('teacher:questions'))


def selectedQuestion(request):
    if request.method == "POST":
        pk = request.POST.get('pk')
        state = request.POST.get('state')
        count = 0
        if state == "add":
            if not Exam.objects.filter(creator=request.user).exists():
                exam = Exam(creator=request.user)
                exam.save()
                exam_question = ExamQuestion(question=Question.objects.get(id=pk), exam=exam, stat="submit")
                exam_question.save()
                count = 1
            elif Exam.objects.filter(is_submit=False).exists():
                exam = Exam.objects.get(is_submit=False)
                exam_question = ExamQuestion(question=Question.objects.get(id=pk), exam=exam, state="submit")
                exam_question.save()
                count = ExamQuestion.objects.filter(exam=exam).count()
            return JsonResponse({"value": "success", "type": "add", "count": count})
        # if QuestionPack.objects.filter(teacher=request.user.teacher).count() == 0 or QuestionPack.objects.filter(
        #         teacher=request.user.teacher).last().submit:
        #     question_pack = QuestionPack(teacher=teacher)
        #     question_pack.save()
        #     question_pack.questions.add(Question.objects.get(id=pk))
        #     pack_pk = question_pack.id
        #     count = question_pack.questions.count()
        # return JsonResponse({"value": "success", "type": "add", "pack_pk": pack_pk, "count": count})
        # else:
        #     question_pack = QuestionPack.objects.get(teacher=request.user.teacher, submit=False)
        #     question_pack.questions.add(Question.objects.get(id=pk))
        #     pack_pk = question_pack.id
        #     count = question_pack.questions.count()
        #     return JsonResponse({"value": "success", "type": "add", "pack_pk": pack_pk, "count": count})
        elif state == "remove":
            if Exam.objects.filter(creator=request.user, is_submit=False).exists():
                exam = Exam.objects.get(creator=request.user, is_submit=False)
                ExamQuestion.objects.get(question_id=pk, exam=exam).delete()
                count = ExamQuestion.objects.filter(exam=exam).count()
                return JsonResponse({"value": "success", "type": "remove", "count": count})

    return JsonResponse({"value": "error"})


# elif request.method == "GET":
#     pack_pk = request.GET.get('pack_pk')
#     if QuestionPack.objects.filter(id=pack_pk).exists():
#         question_pack = QuestionPack.objects.get(id=pack_pk)
#         selected_questions = serializers.serialize("json", question_pack.questions.all())
#         return JsonResponse({"value": "success", "questions": selected_questions})
#     else:
#         return JsonResponse({"value": "forbidden access"})
def edit_selected_question(request, pk):
    if request.method == "POST":
        q_pk = request.POST.get('pk')
        state = request.POST.get('state')
        count = 0
        if state == "add":
            if Exam.objects.filter(creator=request.user, is_edit=True, is_add=True, is_submit=True, id=pk).exists():
                exam = Exam.objects.get(creator=request.user, is_edit=True, is_add=True, is_submit=True, id=pk)
                exam_question = ExamQuestion(question=Question.objects.get(id=q_pk), exam=exam, state="add")
                exam_question.save()
                count = ExamQuestion.objects.filter(exam=exam).filter(Q(state="add") | Q(state="submit")).count()
            return JsonResponse({"value": "success", "type": "add", "count": count})
        elif state == "remove":
            if Exam.objects.filter(creator=request.user, is_edit=True, is_submit=True, id=pk).exists():
                exam = Exam.objects.get(creator=request.user, is_edit=True, is_submit=True, id=pk)
                exam_question = ExamQuestion.objects.get(question_id=q_pk, exam=exam)
                exam_question.state = "del"
                exam_question.save()
                count = ExamQuestion.objects.filter(exam=exam).filter(Q(state="add") | Q(state="submit")).count()
                return JsonResponse({"value": "success", "type": "remove", "count": count})
    return JsonResponse({"value": "error"})


def filter_page(request):
    if request.method == "POST":
        filters = json.loads(request.POST.get("filters"))
        my_questions = filters.get("my_questions")
        level = filters.get("level")
        if request.POST.get("requestType") == "pagination":
            unit = int(request.POST.get('unit'))
            page = int(request.POST.get('page'))
            start = (page - 1) * unit
            end = unit * page
            new_questions = Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True))
            if my_questions:
                new_questions = new_questions.filter(author=request.user.teacher)
            if level:
                new_questions = new_questions.filter(level=level)
            new_questions = serializers.serialize("json", new_questions.order_by('-pk')[start:end])
            # checked = list(QuestionPack.objects.get(submit=False).questions.all().values_list("id", flat=True))
            count = Question.objects.filter(author=request.user.teacher).count()
            return JsonResponse({"value": "success", "questions": new_questions, "count": count})
        elif request.POST.get("requestType") == "filter":
            unit = int(request.POST.get('unit'))
            page = 1
            start = (page - 1) * unit
            end = unit * page
            new_questions = Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True))
            if my_questions:
                new_questions = new_questions.filter(author=request.user.teacher)
            if level:
                new_questions = new_questions.filter(level=level)
            checked = 1
            count = new_questions.count()
            new_questions = serializers.serialize("json", new_questions.order_by('-pk')[start:end])
            return JsonResponse({"value": "success", "questions": new_questions, "checked": checked, "count": count})
    else:
        return JsonResponse({"value": "forbidden access"})


def edit_question(request):
    user = commonData(request)
    if not Exam.objects.filter(creator=request.user, is_submit=False).exists():
        messages.success(request, "برای دسترسی به این صفحه لازم است ابتدا تعدادی سوال انتخاب کنید.")
        return HttpResponseRedirect(reverse("teacher:questions"))
    else:
        exam = Exam.objects.get(creator=request.user, is_submit=False)
        exam.is_edit = True
        exam.save()
        exam_questions = ExamQuestion.objects.filter(exam=exam).all().order_by("position")
        selected_questions = list(q.question for q in exam_questions)
        return render(request, 'teacher/pre_submit_exam.html',
                      {"user": user, "questions": selected_questions, "exam_info": ""})


def edit_submit_question(request, pk):
    user = commonData(request)
    exam = Exam.objects.get(creator=request.user, is_submit=True, id=pk)
    exam.is_edit = True
    exam.is_add = False
    exam.save()
    exam_questions = ExamQuestion.objects.filter(exam=exam).filter(Q(state="add") | Q(state="submit")).all(). \
        order_by("position")
    selected_questions = list(q.question for q in exam_questions)
    exam_info = {
        'state': "submitted",
        'pk': exam.id,
        'name': exam.name,
        'suggested_time': exam.suggested_time,
        'info': exam.info,
        'is_publish': exam.is_publish
    }
    return render(request, 'teacher/pre_submit_exam.html',
                  {"user": user, "questions": selected_questions, "exam_info": exam_info})


def add_to_edit(request, pk):
    user = commonData(request)
    exam = Exam.objects.get(creator=request.user, is_submit=True, is_edit=True, id=pk)
    exam.is_add = True
    exam.save()
    questions_data = {
        'count': Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True)).count(),
        'list': Question.objects.filter(Q(author=request.user.teacher) | Q(is_publish=True)).order_by('-pk')[:10],
    }
    grade = Grade.objects.last().source
    selected_question = []
    exam_questions = ExamQuestion.objects.filter(exam=exam).all()
    for q in exam_questions:
        selected_question.append(q.question.id)
    exam_info = {
        'state': "submitted",
        'pk': exam.id
    }
    return render(request, 'teacher/questions.html',
                  {'user': user, 'questions': questions_data, 'selected_question': selected_question,
                   'grade': grade, 'exam_info': exam_info})


def save_edit_question(request):
    name = request.POST.get('name')
    second = int(request.POST.get('second'))
    minute = int(request.POST.get('minute'))
    hour = int(request.POST.get('hour'))
    seconds = second + 60 * minute + 3600 * hour
    more_info = request.POST.get('more_info')
    is_publish = request.POST.get('is_publish') == "on"
    exam = Exam.objects.get(is_edit=True, creator=request.user)
    exam.name = name
    exam.suggested_time = str(datetime.timedelta(seconds=seconds))
    exam.info = more_info
    exam.is_submit = True
    exam.is_edit = False
    exam.is_publish = is_publish
    exam.save()
    added_questions = ExamQuestion.objects.filter(exam=exam, state="add").all()
    for add_q in added_questions:
        add_q.state = "submit"
        add_q.save()
    deleted_questions = ExamQuestion.objects.filter(exam=exam, state="del").all()
    for del_q in deleted_questions:
        del_q.delete()
    return HttpResponseRedirect(reverse('teacher:examManagement'))


def cancel_edit_question(request):
    exam.is_edit = False
    exam.save()
    changed_questions = ExamQuestion.objects.filter(exam=exam).filter(Q(state="add") | Q(state="del")).all()
    for chng_q in changed_questions:
        chng_q.delete()
    return HttpResponseRedirect(reverse('teacher:examManagement'))


def delete_exam(request, pack_pk):
    QuestionPack.objects.get(id=pack_pk).delete()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


def classRoom(request):
    user = commonData(request)
    class_rooms = ClassRoom.objects.filter(teacher=request.user.teacher).all()
    return render(request, 'teacher/class_room.html', {'user': user, "classes": class_rooms})


def examManagement(request):
    if Exam.objects.filter(creator=request.user, is_edit=True, is_submit=True).exists():
        messages.success(request, "برای دسترسی به صفحه قبل لازم است ابتدا این ویرایش را تکمیل کنید!")
        exam = Exam.objects.get(creator=request.user, is_edit=True, is_submit=True)
        exam.is_add = False
        exam.save()
        exam_pk = exam.id
        return HttpResponseRedirect(reverse("teacher:edit_exam", kwargs={'pk': exam_pk}))
    else:
        user = commonData(request)
        exams = Exam.objects.filter(is_submit=True).all()
        return render(request, 'teacher/manage_exam.html', {'user': user, 'exams': exams})


def report(request):
    user = commonData(request)
    reports_list = Report.objects.filter(teacher=request.user.teacher).all().order_by("-date_time")
    attachment = ReportAttach.objects.all()
    return render(request, 'teacher/report.html', {'user': user, 'reports': reports_list})


def save_report(request):
    title = request.POST.get("title")
    text = request.POST.get("text")
    new_report = Report(teacher=request.user.teacher, title=title, text=text)
    new_report.save()
    return JsonResponse({"success": True})


def reply_report(request):
    return JsonResponse({"success": True})


def display_report(request):
    if request.method == "GET":
        pk = request.GET.get("id")
        report = Report.objects.get(id=pk, teacher=request.user.teacher)
        report_attaches = list() 
        for attach in ReportAttach.objects.filter(type="report", report=report).all():
            report_attaches.append({
                "name":attach.file.name,
                "size":attach.get_file_size(),
                "href":attach.file.url,  
            })
        report = {
            "avatar": TeacherForm.objects.get(user=report.teacher).avatar.url,
            "full_name": report.teacher.user.get_full_name(),
            "created_time": report.get_time_diff(),
            "title": report.title,
            "text": report.text,
            "all_reports": Report.objects.filter(teacher=request.user.teacher).count(),
            "num": list(
                Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True)).index(
                int(pk)) + 1,
        }
        if report.get("num") == 1:
            report["next_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[1]
        elif report.get("num") == report.get("all_reports"):
            report["prev_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[-2]
        else:
            report["prev_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[report.get("num") - 2]
            report["next_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[report.get("num")]

        report_replays = list()
        for replay in ReportReply.objects.filter(
                report=Report.objects.get(id=pk, teacher=request.user.teacher)).all().order_by("-id"):
            if replay.user == request.user:
                report_replays.append({
                    "me": True,
                    "text": replay.text,
                    "data_created": replay.get_time_diff()
                })
            else:
                report_replays.append({
                    "me": False,
                    "avatar": replay.get_sender_avatar(),
                    "full_name": replay.user.get_full_name(),
                    "text": replay.text,
                    "data_created": replay.get_time_diff()
                })
        return JsonResponse({'report': report, 'report_attaches': report_attaches, "report_replays": report_replays})
