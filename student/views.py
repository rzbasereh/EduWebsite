from django.http import JsonResponse
from django.shortcuts import render
from main.models import Notification, Message
from manager.models import Lesson
from teacher.models import Exam, QuestionPack, Question
from .models import StudentForm, ExamResult
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


def exam(request):
    user = commonData(request)
    exams = ExamResult.objects.filter(user=request.user.student).order_by('-date')
    data = examResult(request.user.student, exams.first().code)
    return render(request, 'student/exam.html', {'user': user, 'exams': exams, 'data': data})
