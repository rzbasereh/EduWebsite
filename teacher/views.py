from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.shortcuts import render, render_to_response
from django.contrib import messages
from .models import *
from manager.models import TeacherAccess, Grade
from main.models import Message, Notification
from django.core import serializers
from django.db.models import Q
import json
from django.conf import settings
from os.path import isfile, join
from mimetypes import MimeTypes
from os import listdir
from wand.image import Image
import wand.image
import hashlib
import json
import time
import hmac
import copy
import sys
import os


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
    elif Question.objects.filter(author=request.user, on_write=True).exists():
        messages.success(request, "برای دسترسی به صفحه قبل لازم است ابتدا این ویرایش را تکمیل کنید!")
        return HttpResponseRedirect(reverse("teacher:newQuestion"))
    else:
        user = commonData(request)
        questions_data = {
            'count': Question.objects.filter(Q(author=request.user) | Q(is_publish=True), visibility=True).count(),
            'list': list(
                Question.objects.filter(Q(author=request.user) | Q(is_publish=True), visibility=True).order_by('-pk')[
                :10]),
        }
        grade = Grade.objects.last().source
        selected_question = []
        if Exam.objects.filter(creator=request.user, is_submit=False).exists():
            exam = Exam.objects.get(creator=request.user, is_submit=False)
            exam_questions = ExamQuestion.objects.filter(exam=exam).all()
            for q in exam_questions:
                selected_question.append(q.question.id)
    return render(request, 'teacher/questions.html',
                  {'user': user, 'questions': questions_data, 'selected_question': selected_question,
                   'grade': grade})


def newQuestion(request):
    if TeacherAccess.objects.filter(teacher=request.user.teacher).exists() and \
            TeacherAccess.objects.filter(teacher=request.user.teacher)[
                0].add_question_access and Question.objects.filter(on_write=True, author=request.user).exists():
        user = commonData(request)
        pk = Question.objects.get(on_write=True, author=request.user).id
        return render(request, 'teacher/new_question.html', {'user': user, 'pk': pk})
    messages.error(request, "شما مجاز به انجام این عملیات نیستید!")
    return HttpResponseRedirect(reverse('teacher:questions'))


def saveGrades(request):
    if request.method == "POST":
        grades = request.POST.getlist('grades[]')
        if len(grades) == 0:
            return JsonResponse({"value": "empty list"})
        else:
            if TeacherAccess.objects.filter(teacher=request.user.teacher).exists() and \
                    TeacherAccess.objects.filter(teacher=request.user.teacher)[0].add_question_access:
                author = request.user
                question = Question(author=author, grades=grades, on_write=True)
                question.save()
                return JsonResponse({"value": "success", "url": reverse("teacher:newQuestion")})
            messages.error(request, "شما مجاز به انجام این عملیات نیستید!")
            return HttpResponseRedirect(reverse('teacher:questions'))
    else:
        return JsonResponse({"value": "invalid Request"})


def addQuestion(request):
    if request.method == "POST":
        if Question.objects.filter(author=request.user, on_write=True).exists():
            pk = request.POST.get('pk')
            author = request.user
            body = request.POST.get('body')
            choices = request.POST.getlist('Choices[]')
            level = request.POST.get('level')
            source = request.POST.get('selectSource')
            correct_ans = request.POST.get('CorrectChoice')
            is_publish = request.POST.get("is_publish") == "true"
            is_descriptive = request.POST.get("is_descriptive") == "true"
            verbose_ans = request.POST.get('verbose_ans')
            is_redirect = request.POST.get('redirect') == "true"
            if Question.objects.filter(id=pk).exists():
                question = Question.objects.get(id=pk)
                question.body = body
                question.author = author
                question.verbose_ans = verbose_ans
                question.level = level
                question.source = source
                question.correct_ans = correct_ans
                question.is_descriptive = is_descriptive
                question.is_publish = is_publish
                question.save()
                if not is_descriptive:
                    if len(choices) < 5:
                        for i in range(5 - len(choices)):
                            choices.append("empty")
                    question.choice_1 = choices[0]
                    question.choice_2 = choices[1]
                    question.choice_3 = choices[2]
                    question.choice_4 = choices[3]
                    question.choice_5 = choices[4]
                    question.save()
                if not is_redirect:
                    return JsonResponse({'success': "update"})
                else:
                    question.on_write = False
                    question.save()
                    return JsonResponse({'url': reverse('teacher:questions')})
            else:
                return JsonResponse({'success': "Error"})
        else:
            return JsonResponse({"error": 403})
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
            if not Exam.objects.filter(creator=request.user, is_submit=False).exists():
                exam = Exam(creator=request.user)
                exam.save()
                exam_question = ExamQuestion(question=Question.objects.get(id=pk), exam=exam, state="submit")
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
            new_questions = Question.objects.filter(Q(author=request.user) | Q(is_publish=True))
            if my_questions:
                new_questions = new_questions.filter(author=request.user)
            if level:
                new_questions = new_questions.filter(level=level)
            new_questions = serializers.serialize("json", new_questions.order_by('-pk')[start:end])
            # checked = list(QuestionPack.objects.get(submit=False).questions.all().values_list("id", flat=True))
            count = Question.objects.filter(author=request.user).count()
            return JsonResponse({"value": "success", "questions": new_questions, "count": count})
        elif request.POST.get("requestType") == "filter":
            unit = int(request.POST.get('unit'))
            page = 1
            start = (page - 1) * unit
            end = unit * page
            new_questions = Question.objects.filter(Q(author=request.user) | Q(is_publish=True))
            if my_questions:
                new_questions = new_questions.filter(author=request.user)
            if level != '0' and level:
                new_questions = new_questions.filter(level=level)
            checked = 1
            count = new_questions.count()
            new_questions = serializers.serialize("json", new_questions.order_by('-pk')[start:end])
            return JsonResponse({"value": "success", "questions": new_questions, "checked": checked, "count": count})
    else:
        return JsonResponse({"value": "forbidden access"})


def edit_question(request, pk):
    if TempQuestion.objects.filter(related_question=Question.objects.get(id=pk)).exists():
        temp_q = TempQuestion.objects.get(related_question=Question.objects.get(id=pk))
    else:
        q = Question.objects.get(id=pk)
        temp_q = TempQuestion(related_question=q, editor_user=request.user, body=q.body, choice_layout=q.choice_layout,
                              choice_1=q.choice_1, choice_2=q.choice_2, choice_3=q.choice_3, choice_4=q.choice_4,
                              choice_5=q.choice_5, correct_ans=q.correct_ans, verbose_ans=q.verbose_ans,
                              grades=q.grades, source=q.source, level=q.level, is_publish=q.is_publish,
                              is_descriptive=q.is_descriptive, created_at=timezone.now(), on_write=True)
        temp_q.save()
    user = commonData(request)
    return render(request, 'teacher/new_question.html', {"user": user, "temp_q": temp_q, "pk": pk})


def store_edit_question(request):
    if request.method == "POST":
        if TempQuestion.objects.filter(on_write=True, editor_user=request.user).exists():
            pk = request.POST.get('pk')
            body = request.POST.get('body')
            choices = request.POST.getlist('Choices[]')
            level = request.POST.get('level')
            source = request.POST.get('selectSource')
            correct_ans = request.POST.get('CorrectChoice')
            is_publish = request.POST.get("is_publish") == "true"
            is_descriptive = request.POST.get("is_descriptive") == "true"
            verbose_ans = request.POST.get('verbose_ans')
            is_redirect = request.POST.get('is_redirect') == "true"
            temp_q = TempQuestion.objects.get(on_write=True, editor_user=request.user)
            temp_q.body = body
            temp_q.verbose_ans = verbose_ans
            temp_q.level = level
            temp_q.source = source
            temp_q.correct_ans = correct_ans
            temp_q.is_descriptive = is_descriptive
            temp_q.is_publish = is_publish
            temp_q.save()
            if not is_descriptive:
                if len(choices) < 5:
                    for i in range(5 - len(choices)):
                        choices.append("empty")
                        temp_q.choice_1 = choices[0]
                        temp_q.choice_2 = choices[1]
                        temp_q.choice_3 = choices[2]
                        temp_q.choice_4 = choices[3]
                        temp_q.choice_5 = choices[4]
                        temp_q.save()
            if not is_redirect:
                return JsonResponse({'success': "update"})
            else:
                if ExamQuestion.objects.filter(question=temp_q.related_question, exam__is_submit=True).exists():
                    return JsonResponse({'confirm': True})
                else:
                    q = temp_q.related_question
                    q.body = temp_q.body
                    q.choice_layout = temp_q.choice_layout
                    q.choice_1 = temp_q.choice_1
                    q.choice_2 = temp_q.choice_2
                    q.choice_3 = temp_q.choice_3
                    q.choice_4 = temp_q.choice_4
                    q.choice_5 = temp_q.choice_5
                    q.verbose_ans = temp_q.verbose_ans
                    q.correct_ans = temp_q.correct_ans
                    q.level = temp_q.level
                    q.source = temp_q.source
                    q.is_descriptive = temp_q.is_descriptive
                    q.is_publish = temp_q.is_publish
                    q.is_edited = True
                    q.save()
                    temp_q.delete()
                    return JsonResponse({'url': reverse('teacher:questions')})
        else:
            return JsonResponse({"error": 403})
    else:
        return JsonResponse({'error': 'Invalid Request!'})


def store_edit_question_as_new(request):
    if TempQuestion.objects.filter(on_write=True, editor_user=request.user).exists():
        temp_q = TempQuestion.objects.get(on_write=True, editor_user=request.user)
        q = Question(author=request.user)
        q.body = temp_q.body
        q.choice_layout = temp_q.choice_layout
        q.choice_1 = temp_q.choice_1
        q.choice_2 = temp_q.choice_2
        q.choice_3 = temp_q.choice_3
        q.choice_4 = temp_q.choice_4
        q.choice_5 = temp_q.choice_5
        q.verbose_ans = temp_q.verbose_ans
        q.correct_ans = temp_q.correct_ans
        q.level = temp_q.level
        q.source = temp_q.source
        q.is_descriptive = temp_q.is_descriptive
        q.is_publish = temp_q.is_publish
        q.save()
        temp_q.delete()
        return HttpResponseRedirect(reverse('teacher:questions'))
    else:
        return render(request, 'main/403.html', {})


def confirm_question_change(request):
    if TempQuestion.objects.filter(on_write=True, editor_user=request.user).exists():
        temp_q = TempQuestion.objects.get(on_write=True, editor_user=request.user)
        if request.POST.get("status") == "accept":
            q = temp_q.related_question
            q.body = temp_q.body
            q.choice_layout = temp_q.choice_layout
            q.choice_1 = temp_q.choice_1
            q.choice_2 = temp_q.choice_2
            q.choice_3 = temp_q.choice_3
            q.choice_4 = temp_q.choice_4
            q.choice_5 = temp_q.choice_5
            q.verbose_ans = temp_q.verbose_ans
            q.correct_ans = temp_q.correct_ans
            q.level = temp_q.level
            q.source = temp_q.source
            q.is_descriptive = temp_q.is_descriptive
            q.is_publish = temp_q.is_publish
            q.is_edited = True
            q.save()
            temp_q.delete()
            return JsonResponse({'url': reverse('teacher:questions')})
        else:
            q = temp_q.related_question
            q.visibility = False
            q.save()
            q = Question(author=request.user)
            q.body = temp_q.body
            q.choice_layout = temp_q.choice_layout
            q.choice_1 = temp_q.choice_1
            q.choice_2 = temp_q.choice_2
            q.choice_3 = temp_q.choice_3
            q.choice_4 = temp_q.choice_4
            q.choice_5 = temp_q.choice_5
            q.verbose_ans = temp_q.verbose_ans
            q.correct_ans = temp_q.correct_ans
            q.level = temp_q.level
            q.source = temp_q.source
            q.is_descriptive = temp_q.is_descriptive
            q.is_publish = temp_q.is_publish
            q.save()
            temp_q.delete()
            return JsonResponse({'url': reverse('teacher:questions')})
    else:
        return render(request, 'main/403.html', {})


def edit_exam(request):
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
        exam_info = {
            'pk': exam.id,
        }
        return render(request, 'teacher/pre_submit_exam.html',
                      {"user": user, "questions": selected_questions, "exam_info": exam_info})


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
        'count': Question.objects.filter(Q(author=request.user) | Q(is_publish=True)).count(),
        'list': Question.objects.filter(Q(author=request.user) | Q(is_publish=True)).order_by('-pk')[:10],
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
    sort = request.POST.get("sort")
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
    for eq in ExamQuestion.objects.filter(exam=exam).all():
        eq.position = list(map(int, sort.split(","))).index(eq.question.id)
        eq.save()
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


def report_search(request):
    if request.is_ajax():
        if request.method == "GET":
            q = request.GET.get("q")
            reports_find = Report.objects.filter(
                Q(title__contains=q) | Q(text__contains=q) | Q(teacher__user__first_name__contains=q) | Q(
                    teacher__user__last_name__contains=q) | Q(teacher__user__username__contains=q) | Q(
                    teacher__user__email__contains=q)).all()
            reports_list = list()
            for report in reports_find:
                has_attachment = report in [ra.report for ra in ReportAttach.objects.all()]
                reports_list.append({
                    'id': report.id,
                    'title': report.title,
                    'body': report.text[0:100],
                    'date_modified': report.get_time_diff(),
                    'is_seen': report.is_seen,
                    'has_attachment': has_attachment
                })
            return JsonResponse({"reports": reports_list})
    return JsonResponse({"d": "fd"})


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
                "name": attach.file.name,
                "size": attach.get_file_size(),
                "href": attach.file.url,
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
        if report.get("all_reports") == 1:
            pass
        elif report.get("num") == 1:
            report["next_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[
                1]
        elif report.get("num") == report.get("all_reports"):
            report["prev_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[
                -2]
        else:
            report["prev_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[
                report.get("num") - 2]
            report["next_pk"] = list(Report.objects.filter(teacher=request.user.teacher).values_list("id", flat=True))[
                report.get("num")]

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


def upload_image(request):
    print("upload_image")
    print(request)
    response = Image.upload(DjangoAdapter(request), "/media/")
    try:
        print("upload_image try")

    except Exception:
        print("upload_image except")
        response = {"error": str(sys.exc_info()[1])}
    return HttpResponse(json.dumps(response), content_type="application/json")


def upload_image_validation(request):
    print("upload_image_validation")

    def validation(filePath, mimetype):
        with wand.image.Image(filename=filePath) as img:
            if img.width != img.height:
                return False
            return True

    options = {
        "fieldname": "myImage",
        "validation": validation
    }

    try:
        response = Image.upload(DjangoAdapter(request), "/media/", options)
    except Exception:
        response = {"error": str(sys.exc_info()[1])}
    return HttpResponse(json.dumps(response), content_type="application/json")


class Image(object):
    defaultUploadOptions = {
        "fieldname": "file",
        "validation": {
            "allowedExts": ["gif", "jpeg", "jpg", "png", "svg", "blob"],
            "allowedMimeTypes": ["image/gif", "image/jpeg", "image/pjpeg", "image/x-png", "image/png",
                                 "image/svg+xml"]
        },
        # string resize param from http://docs.wand-py.org/en/0.4.3/guide/resizecrop.html#transform-images
        # Examples: "100x100", "100x100!". Find more on http://www.imagemagick.org/script/command-line-processing.php#geometry
        "resize": None
    }

    @staticmethod
    def upload(req, fileRoute, options=None):
        """
        Image upload to disk.
        Parameters:
            req: framework adapter to http request. See BaseAdapter.
            fileRoute: string
            options: dict optional, see defaultUploadOptions attribute
        Return:
            dict: {link: "linkPath"}
        """

        if options is None:
            options = Image.defaultUploadOptions
        else:
            options = Utils.merge_dicts(Image.defaultUploadOptions, options)

        return File.upload(req, fileRoute, options)

    @staticmethod
    def delete(src):
        """
        Delete image from disk.
        Parameters:
            src: string
        """
        return File.delete(src)

    @staticmethod
    def list(folderPath, thumbPath=None):
        """
        List images from disk.
        Parameters:
            folderPath: string
            thumbPath: string
        Return:
            list: list of images dicts. example: [{url: "url", thumb: "thumb", name: "name"}, ...]
        """

        if thumbPath is None:
            thumbPath = folderPath

        # Array of image objects to return.
        response = []

        absoluteFolderPath = Utils.getServerPath() + folderPath

        # Image types.
        imageTypes = Image.defaultUploadOptions["validation"]["allowedMimeTypes"]

        # Filenames in the uploads folder.
        fnames = [f for f in listdir(absoluteFolderPath) if isfile(join(absoluteFolderPath, f))]

        for fname in fnames:
            mime = MimeTypes()
            mimeType = mime.guess_type(absoluteFolderPath + fname)[0]

            if mimeType in imageTypes:
                response.append({
                    "url": folderPath + fname,
                    "thumb": thumbPath + fname,
                    "name": fname
                })

        return response


class Utils(object):
    """
    Utils static class.
    """

    @staticmethod
    def hmac(key, string, hex=False):
        """
        Calculate hmac.
        Parameters:
            key: string
            string: string
            hex: boolean optional, return in hex, else return in binary
        Return:
            string: hmax in hex or binary
        """

        # python 2-3 compatible:
        try:
            hmac256 = hmac.new(key.encode() if isinstance(key, str) else key,
                               msg=string.encode("utf-8") if isinstance(string, str) else string,
                               digestmod=hashlib.sha256)  # v3
        except Exception:
            hmac256 = hmac.new(key, msg=string, digestmod=hashlib.sha256)  # v2

        return hmac256.hexdigest() if hex else hmac256.digest()

    @staticmethod
    def merge_dicts(a, b, path=None):
        """
        Deep merge two dicts without modifying them. Source: http://stackoverflow.com/questions/7204805/dictionaries-of-dictionaries-merge/7205107#7205107
        Parameters:
            a: dict
            b: dict
            path: list
        Return:
            dict: Deep merged dict.
        """

        aClone = copy.deepcopy(a)
        # Returns deep b into a without affecting the sources.
        if path is None:
            path = []
        for key in b:
            if key in a:
                if isinstance(a[key], dict) and isinstance(b[key], dict):
                    aClone[key] = Utils.merge_dicts(a[key], b[key], path + [str(key)])
                else:
                    aClone[key] = b[key]
            else:
                aClone[key] = b[key]
        return aClone

    @staticmethod
    def getExtension(filename):
        """
        Get filename extension.
        Parameters:
            filename: string
        Return:
            string: The extension without the dot.
        """
        return os.path.splitext(filename)[1][1:]

    @staticmethod
    def getServerPath():
        """
        Get the path where the server has started.
        Return:
            string: serverPath
        """
        return os.path.abspath(os.path.dirname(sys.argv[0]))

    @staticmethod
    def isFileValid(filename, mimetype, allowedExts, allowedMimeTypes):
        """
        Test if a file is valid based on its extension and mime type.
        Parameters:
            filename string
            mimeType string
            allowedExts list
            allowedMimeTypes list
        Return:
            boolean
        """

        # Skip if the allowed extensions or mime types are missing.
        if not allowedExts or not allowedMimeTypes:
            return False

        extension = Utils.getExtension(filename)
        return extension.lower() in allowedExts and mimetype in allowedMimeTypes

    @staticmethod
    def isValid(validation, filePath, mimetype):
        """
        Generic file validation.
        Parameters:
            validation: dict or function
            filePath: string
            mimetype: string
        """

        # No validation means you dont want to validate, so return affirmative.
        if not validation:
            return True

        # Validation is a function provided by the user.
        if callable(validation):
            return validation(filePath, mimetype)

        if isinstance(validation, dict):
            return Utils.isFileValid(filePath, mimetype, validation["allowedExts"], validation["allowedMimeTypes"])

        # Else: no specific validating behaviour found.
        return False


class BaseAdapter(object):
    """
    Interface. Inherit this class to use the lib in your framework.
    """

    def __init__(self, request):
        """
        Constructor.
        Parameters:
            request: http request object from some framework.
        """
        self.request = request

    def riseError(self):
        """
        Use this when you want to make an abstract method.
        """
        raise NotImplementedError("Should have implemented this method.")

    def getFilename(self, fieldname):
        """
        Get upload filename based on the fieldname.
        Parameters:
            fieldname: string
        Return:
            string: filename
        """
        self.riseError()

    def getMimetype(self, fieldname):
        """
        Get upload file mime type based on the fieldname.
        Parameters:
            fieldname: string
        Return:
            string: mimetype
        """
        self.riseError()

    def saveFile(self, fieldname, fullNamePath):
        """
        Save the upload file based on the fieldname on the fullNamePath location.
        Parameters:
            fieldname: string
            fullNamePath: string
        """
        self.riseError()


class DjangoAdapter(BaseAdapter):
    """
    Django Adapter: Check BaseAdapter to see what methods description.
    """

    def checkFile(self, fieldname):
        if fieldname not in self.request.FILES:
            raise Exception("File does not exist.")

    def getFilename(self, fieldname):
        self.checkFile(fieldname)
        return self.request.FILES[fieldname].name

    def getMimetype(self, fieldname):
        self.checkFile(fieldname)
        return self.request.FILES[fieldname].content_type

    def saveFile(self, fieldname, fullNamePath):
        print("should save now")
        print("the path" + fullNamePath)
        self.checkFile(fieldname)

        with open(fullNamePath, "wb+") as destination:
            for chunk in self.request.FILES[fieldname].chunks():
                destination.write(chunk)
