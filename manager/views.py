import secrets
import string
from finglish import f2p
from django.http import JsonResponse
from django.shortcuts import render
from main.models import Message, Notification, Student, Teacher, Adviser, Manager
from teacher.models import ClassRoom, TeacherForm
from student.models import StudentForm
from manager.models import ManagerForm
from .models import ManagerForm
from django.contrib.auth.models import User
from teacher.models import Report, ReportAttach
from django.http import HttpResponseRedirect
from django.urls import reverse


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = ManagerForm.objects.filter(user=request.user.manager)[0].avatar.url
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


def index(request):
    user = commonData(request)
    return render(request, 'manager/index.html', {'user': user})


def users(request):
    user = commonData(request)
    all_users = []
    for user in User.objects.all():
        data = {}
        if Student.objects.filter(user= user).exists():
            data["type"] = "student"
            data["avatar"] = StudentForm.objects.get(user= user.student).avatar.url
        elif Teacher.objects.filter(user= user).exists():
            data["type"] = "teacher"
            data["avatar"] = TeacherForm.objects.get(user= user.teacher).avatar.url
        elif Manager.objects.filter(user= user).exists():
            data["type"] = "manager"
            data["avatar"] = ManagerForm.objects.get(user= user.manager).avatar.url
        else:
            data["type"] = "none"
        if data["type"] != "none":
            data["full_name"] = user.get_full_name
            all_users.append(data)
    return render(request, 'manager/users.html', {'user': user, 'users': all_users})


def addUser(request):
    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        user_type = request.POST.get('type')
        phone_number = request.POST.get('phone_number')
        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Duplicate user"})
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(20))
        username = f2p("reza")
        return JsonResponse({"success": username})
        user = User.objects.create_user(username, email, password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        if user_type == "دانش آموز":
            student = Student(user=user)
            student.save()
            return JsonResponse({"success": "stu"})
        return JsonResponse({"success": user_type})
    else:
        return JsonResponse({"error": "Invalid Request!"})


def classes(request):
    user = commonData(request)
    teachers = [teacher.get_full_name for teacher in Teacher.objects.all()]
    class_rooms = ClassRoom.objects.all()
    return render(request, 'manager/classes.html', {'user': user, 'teachers': teachers, 'classes': class_rooms})


def reports(request):
    user = commonData(request)
    reports_list = Report.objects.filter(teacher__manager=request.user.manager).all().order_by("-date_time")
    attachment = ReportAttach.objects.all()
    return render(request, 'manager/reports.html', {'user': user, 'reports': reports_list, "attachment": attachment})


def display_report(request):
    if request.method == "GET":
        pk = request.GET.get("id")
        report = Report.objects.get(id=pk)
        attachment = ReportAttach.objects.filter(report=report).all()
        return JsonResponse({'report': report, 'attachment': attachment})


def reply_report(request):
    pk = request.POST.get('pk')
    text = request.POST.get('text')
    file = request.POST.get('attachment')
    teacher = Report.objects.get(id=pk).teacher.user
    message = Message(sender=request.user, user=teacher, title="پاسخ گزارش", text=text, is_seen=False)
    message.save()
    print(teacher)
    return HttpResponseRedirect(reverse('manager:reports'))


def chats(request):
    user = commonData(request)
    return render(request, 'manager/chat.html', {"user": user})
