from django.shortcuts import render
from main.models import Notification, Message
from teacher.models import Exam
from .models import StudentForm, ExamResult


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = StudentForm.objects.filter(user=request.user)
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


def examResult(user, exam_date):
    exam_key = list(Exam.objects.filter(date=exam_date).first().examKey)
    user_ans = list(ExamResult.objects.filter(user=user, date=exam_date).first().answers)

    reply = list()
    for i in range(len(exam_key)):
        if exam_key == '-':
            reply.append("D")
        elif user_ans[i] == exam_key[i]:
            reply.append("T")
        else:
            reply.append(exam_key[i])

    data = {
        'reply': reply,
    }
    return data


def index(request):
    user = commonData(request)
    return render(request, 'student/index.html', {'user': user})


def exam(request):
    user = commonData(request)
    exams = ExamResult.objects.filter(user=request.user).order_by('-date')
    data = examResult(request.user, exams.first().date)
    return render(request, 'student/exam.html', {'user': user, 'exams': exams, 'data': data})
