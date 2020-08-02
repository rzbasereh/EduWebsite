from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from main.models import Notification, Message
from teacher.models import *
from .models import *
import ast


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = StudentForm.objects.filter(user=request.user.student)[0].avatar.url
    has_message = Message.objects.filter(user=request.user, is_seen=False).exists()
    message = Message.objects.filter(user=request.user)
    has_notification = Notification.objects.filter(user=request.user, is_seen=False).exists()
    notification = Notification.objects.filter(user=request.user, is_seen=False)
    user = {
        'full_name': full_name,
        'avatar': avatar,
        'has_message': has_message,
        'message': message,
        'has_notification': has_notification,
        'notification': notification,
    }
    return user


def percentCalc(key, ans):
    n = len(key)
    T = 0
    F = 0
    for i in range(len(key)):
        if key[i] == "-":
            n = n - 1
        elif key[i] == ans[i]:
            T = T + 1
        elif ans[i] != "0":
            F = F + 1
    percent = 0
    if n != 0:
        percent = (T * 3 - F) / (n * 3)
    return "{0:.2f}".format(percent * 100).rstrip('0').rstrip('.')


def levelCalc(code, key, first, end, percent):
    allResults = ExamResult.objects.filter(code=code)
    ave = 0
    for i in range(len(allResults)):
        ave = ave + float(percentCalc(key, allResults[i].answers[first:end + 1]))
    ave = ave / len(allResults)
    sigma = 0
    for i in range(len(allResults)):
        sigma = sigma + (ave - float(percentCalc(key, allResults[i].answers[first:end + 1]))) ** 2
    sigma = (sigma / len(allResults)) ** 0.5

    if sigma != 0:
        z = (float(percent) - ave) / sigma
    else:
        z = 0
    level = 900 * z + 6000
    return "{0:.2f}".format(level).rstrip('0').rstrip('.')


def rankCalc(code, key, first, end, level):
    levels = list()
    allResults = ExamResult.objects.filter(code=code)
    for i in range(len(allResults)):
        user_percent = percentCalc(key, allResults[i].answers[first: end + 1])
        user_level = levelCalc(code, key, first, end, user_percent)
        levels.append(user_level)
    levels = list(dict.fromkeys(levels))
    rank = sorted(levels, reverse=True).index(level) + 1
    return rank


def examResult(user, code):
    result = list()
    user_ans = list(ExamResult.objects.filter(user=user, code=code).first().answers)
    if Exam.objects.filter(code=code).first().is_online:
        questions = QuestionPack.objects.filter(exam_code=code).first().questions
        lessons = list()
        for question in questions.all():
            lessons.append(question.lesson)
        lessons = list(dict.fromkeys(lessons))
        lesson_data = list()
        for lesson in lessons:
            dict_data = {}
            # percent = percentCalc(,)
            # level = levelCalc(code, exam_key[first:end + 1], first, end, percent)
            dict_data.update({'name': lesson,
                              'percent': "",
                              'level': "",
                              'rank': "",
                              })
            lesson_data.append(dict_data)
        print(lesson_data)
        exam_key = user_ans
    else:
        exam_key = list(Exam.objects.filter(code=code).first().examKey)
        mapper = ast.literal_eval(str(Exam.objects.filter(code=code).first().keyMapper))
        for i in range(len(mapper)):
            value = list(mapper.values())[i]
            key = list(mapper.keys())[i]
            data = {}
            lesson_data = list()
            for j in range(len(value)):
                dict_data = {}
                first = int(list(value.values())[j][0])
                end = int(list(value.values())[j][-1])
                percent = percentCalc(exam_key[first:end + 1], user_ans[first:end + 1])
                level = levelCalc(code, exam_key[first:end + 1], first, end, percent)
                dict_data.update({'name': list(value.keys())[j],
                                  'percent': percent,
                                  'level': level,
                                  'rank': rankCalc(code, exam_key[first:end + 1], first, end, level)
                                  })
                lesson_data.append(dict_data)
            data.update({'type': key, 'lessonDate': lesson_data})
            result.append(data)
    key_ans = zip(exam_key, user_ans)
    data = {
        'key_ans': key_ans,
        'result': result,
    }
    return data


def index(request):
    user = commonData(request)
    return render(request, 'student/index.html', {'user': user})


def class_room(request):
    pass


def calc_result(request, pk):
    if StudentExam.objects.filter(id=pk, student=request.user.student, is_finish=True).exists():
        e_run = StudentExam.objects.get(id=pk).e_run

    return pk


def exam(request):
    user = commonData(request)
    # exams = ExamResult.objects.filter(user=request.user.student).order_by('-date')
    # data = examResult(request.user.student, exams.first().code)
    exams = ""
    data = ""
    exam_list = list()
    for se in StudentExam.objects.filter(student=request.user.student, is_finish=True).all():
        data = dict()
        data["id"] = se.id
        data["title"] = se.e_run.name
        exam_list.append(data)
    if StudentExam.objects.filter(student=request.user.student, is_finish=True).exists():
        student_exam = StudentExam.objects.filter(student=request.user.student, is_finish=True).last()
        data = calc_result(request, student_exam.id)
    return render(request, 'student/exam.html', {'user': user, 'data': data, "exam_list": exam_list})


def online_exam(request):
    user = commonData(request)
    exams = ERun.objects.filter(is_publish=True)
    user_exams = list()
    for active_exam in exams:
        if request.user.student in active_exam.add_on_user.all():
            user_exams.append(active_exam)
        else:
            for class_room in active_exam.class_name.all():
                if request.user.student in class_room.students.all():
                    user_exams.append(active_exam)

    return render(request, 'student/online_exam.html', {'user': user, 'online_exams': user_exams})


def preview_exam(request, pk):
    user_exam = ERun.objects.get(is_publish=True, id=pk)
    exam_students = list()
    for class_room in user_exam.class_name.all():
        for student in class_room.students.all():
            exam_students.append(student)
    if request.user.student in user_exam.add_on_user.all() or request.user.student in exam_students:
        if StudentExam.objects.filter(e_run=user_exam, student=request.user.student,
                                      is_finish=True).count() < user_exam.repeat_num:
            user = commonData(request)
            exam_runs = ExamERun.objects.filter(e_run=user_exam).all()
            if not StudentExam.objects.filter(student=request.user.student, e_run=user_exam, is_finish=False).exists():
                student_exam = StudentExam(student=request.user.student, e_run=user_exam)
                student_exam.save()
                user_exam.participant_num += 1
                user_exam.save()
            else:
                student_exam = StudentExam.objects.get(student=request.user.student, e_run=user_exam, is_finish=False)
            packs = list()
            for exam_run in exam_runs:
                data = dict()
                data["time"] = exam_run.time.strftime("%H:%M:%S")
                data["title"] = exam_run.exam.name
                questions_list = list()
                if exam_run.random_question:
                    pass
                else:
                    for eq in ExamQuestion.objects.filter(exam=exam_run.exam).all().order_by("position"):
                        list_item = dict()
                        list_item["id"] = eq.question.id
                        list_item["body"] = eq.question.body
                        list_item["choice_1"] = eq.question.choice_1
                        list_item["choice_2"] = eq.question.choice_2
                        list_item["choice_3"] = eq.question.choice_3
                        list_item["choice_4"] = eq.question.choice_4
                        list_item["choice_5"] = eq.question.choice_5
                        if StudentExamQuestion.objects.filter(student_exam=student_exam, question=eq.question).exists():
                            list_item["last_ans"] = StudentExamQuestion.objects.get(student_exam=student_exam,
                                                                                    question=eq.question).answer
                        else:
                            list_item["last_ans"] = ""
                        questions_list.append(list_item)
                data["questions"] = questions_list
                packs.append(data)
                return render(request, 'student/exam_layouts/kashki.html',
                              {'user': user, 'exam': user_exam, 'packs': packs})
    return render(request, 'main/404.html', {})


def interval_save(request):
    ans = request.POST.get("ans")
    pk = request.POST.get("pk")
    if StudentExamQuestion.objects.filter(question_id=pk, student_exam__student=request.user.student).exists():
        se_result = StudentExamQuestion.objects.get(question_id=pk, student_exam__student=request.user.student)
        se_result.answer = ans
        se_result.save()
    else:
        pass
    return JsonResponse({"status": "success"})


def end_exam(request):
    student_exam = StudentExam.objects.get(student=request.user.student, is_finish=False)
    student_exam.is_finish = True
    student_exam.end_time = timezone.now()
    student_exam.save()
    # TODO: Save user answers
    return HttpResponseRedirect(reverse('student:exam'))
