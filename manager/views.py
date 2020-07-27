import secrets
import string
from finglish import f2p
from django.http import JsonResponse
from django.shortcuts import render
from main.models import Message, Notification, Student, Teacher, Adviser, Manager
from teacher.models import *
from student.models import StudentForm
from manager.models import ManagerForm
from .models import ManagerForm
from django.contrib.auth.models import User
from teacher.models import Report, ReportAttach
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.db.models import Q


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
        if Student.objects.filter(user=user).exists():
            data["type"] = "student"
            data["status"] = Student.objects.get(user=user).status
            data["avatar"] = StudentForm.objects.get(user=user.student).avatar.url
            data["phone_number"] = StudentForm.objects.get(user=user.student).phone_number
        elif Teacher.objects.filter(user=user).exists():
            data["type"] = "teacher"
            data["status"] = Teacher.objects.get(user=user).status
            data["avatar"] = TeacherForm.objects.get(user=user.teacher).avatar.url
            data["phone_number"] = TeacherForm.objects.get(user=user.teacher).phone_number
        elif Manager.objects.filter(user=user).exists():
            data["type"] = "manager"
            data["status"] = Manager.objects.get(user=user).status
            data["avatar"] = ManagerForm.objects.get(user=user.manager).avatar.url
            data["phone_number"] = ManagerForm.objects.get(user=user.manager).phone_number
        else:
            data["type"] = "none"
        if data["type"] != "none":
            data["full_name"] = user.get_full_name
            data["pk"] = user.id
            data["user_name"] = user.username
            data["email"] = user.email
            all_users.append(data)
    return render(request, 'manager/users.html', {'user': user, 'users': all_users})


def RepresentsInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


def user_search(request):
    if request.method == "POST":
        q = request.POST.get("q")
        if q:
            search_result = list(User.objects.filter(
                Q(first_name__icontains=q) | Q(last_name__icontains=q) | Q(email__icontains=q)).all())
            all_users = list()
            for user in User.objects.all():
                data = {}
                if Student.objects.filter(user=user).exists():
                    if (user in search_result) or (q in StudentForm.objects.get(user=user.student).phone_number):
                        data["type"] = "student"
                        data["status"] = Student.objects.get(user=user).status
                        data["avatar"] = StudentForm.objects.get(user=user.student).avatar.url
                        data["phone_number"] = StudentForm.objects.get(user=user.student).phone_number
                    else:
                        data["type"] = "none"
                elif Teacher.objects.filter(user=user).exists():
                    if (user in search_result) or (q in TeacherForm.objects.get(user=user.teacher).phone_number):
                        data["type"] = "teacher"
                        data["status"] = Teacher.objects.get(user=user).status
                        data["avatar"] = TeacherForm.objects.get(user=user.teacher).avatar.url
                        data["phone_number"] = TeacherForm.objects.get(user=user.teacher).phone_number
                    else:
                        data["type"] = "none"
                elif Manager.objects.filter(user=user).exists():
                    if (user in search_result) or (q in ManagerForm.objects.get(user=user.manager).phone_number):
                        data["type"] = "manager"
                        data["status"] = Manager.objects.get(user=user).status
                        data["avatar"] = ManagerForm.objects.get(user=user.manager).avatar.url
                        data["phone_number"] = ManagerForm.objects.get(user=user.manager).phone_number
                    else:
                        data["type"] = "none"
                else:
                    data["type"] = "none"
                if data["type"] != "none":
                    data["full_name"] = user.get_full_name
                    data["pk"] = user.id
                    data["user_name"] = user.username
                    data["email"] = user.email
                    all_users.append(data)
            return JsonResponse({"result": all_users})
        else:
            all_users = []
            for user in User.objects.all():
                data = {}
                if Student.objects.filter(user=user).exists():
                    data["type"] = "student"
                    data["status"] = Student.objects.get(user=user).status
                    data["avatar"] = StudentForm.objects.get(user=user.student).avatar.url
                    data["phone_number"] = StudentForm.objects.get(user=user.student).phone_number
                elif Teacher.objects.filter(user=user).exists():
                    data["type"] = "teacher"
                    data["status"] = Teacher.objects.get(user=user).status
                    data["avatar"] = TeacherForm.objects.get(user=user.teacher).avatar.url
                    data["phone_number"] = TeacherForm.objects.get(user=user.teacher).phone_number
                elif Manager.objects.filter(user=user).exists():
                    data["type"] = "manager"
                    data["status"] = Manager.objects.get(user=user).status
                    data["avatar"] = ManagerForm.objects.get(user=user.manager).avatar.url
                    data["phone_number"] = ManagerForm.objects.get(user=user.manager).phone_number
                else:
                    data["type"] = "none"
                if data["type"] != "none":
                    data["full_name"] = user.get_full_name
                    data["pk"] = user.id
                    data["user_name"] = user.username
                    data["email"] = user.email
                    all_users.append(data)
            return JsonResponse({"result": ""})


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


def user_info(request):
    if request.method == "GET":
        pk = request.GET.get("id")
        user = User.objects.get(id=pk)
        res = {}
        if Student.objects.filter(user=user).exists():
            res["type"] = "student"
            res["status"] = Student.objects.get(user=user).status
            res["phone_number"] = StudentForm.objects.get(user=user.student).phone_number
        elif Teacher.objects.filter(user=user).exists():
            res["type"] = "teacher"
            res["status"] = Teacher.objects.get(user=user).status
            res["phone_number"] = TeacherForm.objects.get(user=user.teacher).phone_number
        elif Manager.objects.filter(user=user).exists():
            res["type"] = ManagerForm.objects.get(user=user.manager).phone_number
            res["status"] = Manager.objects.get(user=user).status
            res["phone_number"] = user.email
        else:
            return JsonResponse({"error": "Error"})
        res["first_name"] = user.first_name
        res["last_name"] = user.last_name
        res["email"] = user.email
        return JsonResponse({"user_info": res})


def edit_user_info(request):
    pk = request.POST.get("pk")
    status = request.POST.get("status")
    first_name = request.POST.get("first_name")
    last_name = request.POST.get("last_name")
    email = request.POST.get("email")
    user_type = request.POST.get("user_type")  # TODO:this is very hard :D
    phone_number = request.POST.get("phone_number")
    user = User.objects.get(id=pk)
    if Student.objects.filter(user=user).exists():
        student = Student.objects.get(user=user)
        student.status = status
        student.save()
        student_form = StudentForm.objects.get(user=user.student)
        student_form.phone_number = phone_number
        student_form.save()
    elif Teacher.objects.filter(user=user).exists():
        teacher = Teacher.objects.get(user=user)
        teacher.status = status
        teacher.save()
        teacher_form = TeacherForm.objects.get(user=user.teacher)
        teacher_form.phone_number = phone_number
        teacher_form.save()
    elif Manager.objects.filter(user=user).exists():
        manager = Manager.objects.get(user=user)
        manager.status = status
        manager.save()
        manager_form = ManagerForm.objects.get(user=user.manager)
        manager_form.phone_number = phone_number
        manager_form.save()
    else:
        return JsonResponse({"error": "Error"})
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.save()
    return JsonResponse({"sd": status})


def classes(request):
    user = commonData(request)
    teachers = [teacher.get_full_name for teacher in Teacher.objects.all()]
    class_rooms = ClassRoom.objects.all()
    return render(request, 'manager/classes.html', {'user': user, 'teachers': teachers, 'classes': class_rooms})


def reports(request):
    user = commonData(request)
    reports_list = Report.objects.filter(teacher__manager=request.user.manager).all().order_by("-date_time")
    attached_reports = list()
    for report in reports_list:
        if ReportAttach.objects.filter(type="report", report=report).exists():
            attached_reports.append(report)
    return render(request, 'manager/reports.html',
                  {'user': user, 'reports': reports_list, "attached_reports": attached_reports})


def display_report(request):
    if request.method == "GET":
        pk = request.GET.get("id")
        report = Report.objects.get(id=pk, teacher__manager=request.user.manager)
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
            "all_reports": Report.objects.filter(teacher__manager=request.user.manager).count(),
            "num": list(
                Report.objects.filter(teacher__manager=request.user.manager).values_list("id", flat=True)).index(
                int(pk)) + 1,
        }
        if report.get("num") == 1:
            report["next_pk"] = \
            list(Report.objects.filter(teacher__manager=request.user.manager).values_list("id", flat=True))[1]
        elif report.get("num") == report.get("all_reports"):
            report["prev_pk"] = \
            list(Report.objects.filter(teacher__manager=request.user.manager).values_list("id", flat=True))[-2]
        else:
            report["prev_pk"] = \
            list(Report.objects.filter(teacher__manager=request.user.manager).values_list("id", flat=True))[
                report.get("num") - 2]
            report["next_pk"] = \
            list(Report.objects.filter(teacher__manager=request.user.manager).values_list("id", flat=True))[
                report.get("num")]

        report_replays = list()
        for replay in ReportReply.objects.filter(
                report=Report.objects.get(id=pk, teacher__manager=request.user.manager)).all().order_by("-id"):
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


def reply_report(request):
    pk = request.POST.get('pk')
    text = request.POST.get('text')
    report_replay = ReportReply(user=request.user,
                                report=Report.objects.get(id=pk, teacher__manager=request.user.manager),
                                text=text)
    report_replay.save()
    report_replays = list()
    for replay in ReportReply.objects.filter(
            report=Report.objects.get(id=pk, teacher__manager=request.user.manager)).all():
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
    return JsonResponse({'status': "success", "report_replays": report_replays})


def chats(request):
    user = commonData(request)
    return render(request, 'manager/chat.html', {"user": user})
