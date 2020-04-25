from django.shortcuts import render
from main.models import Notification, Message
from teacher.models import Exam
from .models import StudentForm, ExamResult


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
    percent = (T * 3 - F) / (n * 3)
    return "{0:.2f}".format(percent * 100).rstrip('0').rstrip('.')


def examResult(user, exam_date):
    result = list()
    user_ans = list(ExamResult.objects.filter(user=user, date=exam_date).first().answers)
    if Exam.objects.filter(date=exam_date).first().is_online:
        exam_key = user_ans  # # TODO: when is_online=True => get Exam key from question code
    else:
        exam_key = list(Exam.objects.filter(date=exam_date).first().examKey)
        mapper = str(Exam.objects.filter(date=exam_date).first().keyMapper)
        while mapper != "":
            lesson_data = {}
            dash = mapper.find("-")
            plus = mapper.find("+")
            key = mapper[:dash]
            lesson_data.update({'name': key})
            question_num = list(map(int, mapper[dash + 1:plus]))
            lesson_data.update({'percent': percentCalc(
                exam_key[question_num[0]:question_num[-1] + 1],
                user_ans[question_num[0]:question_num[-1] + 1])
            })
            result.append(lesson_data)
            mapper = mapper[plus + 1:]
            print(exam_key[question_num[0]:question_num[-1] + 1])

    data = {
        'ans': user_ans,
        'key': exam_key,
        'result': result,
    }
    return data


def index(request):
    user = commonData(request)
    return render(request, 'student/index.html', {'user': user})


def exam(request):
    user = commonData(request)
    exams = ExamResult.objects.filter(user=request.user.student).order_by('-date')
    data = examResult(request.user.student, exams.first().date)
    return render(request, 'student/exam.html', {'user': user, 'exams': exams, 'data': data})
