from django.shortcuts import render, redirect
from django.http import JsonResponse

from main.models import Student, Teacher, Adviser, Manager
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse

from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


def send_html_email(to_list, subject, context, sender=settings.DEFAULT_FROM_EMAIL):
    msg_html = render_to_string('main/layouts/email.html', context)
    msg = EmailMessage(subject=subject, body=msg_html, from_email=sender, bcc=to_list)
    msg.content_subtype = "html"  # Main content is now text/html
    return msg.send()


def index(request):
    return render(request, 'main/index.html', {})


def component(request):
    return render(request, 'main/index.html', {})


def loginPage(request):
    if request.user.is_authenticated:
        return redirect(reverse('index'))
    return render(request, 'main/login.html', {})


def logoutUser(request):
    logout(request)
    return redirect('/')


def notFound(request):
    return render(request, 'main/404.html', {})


def recoverPassword(request):
    return render(request, 'main/recoverPassword.html', {})


def recover_password_request(request):
    if request.is_ajax():
        if request.method == "POST":
            email = request.POST.get("email")
            context = {
                'news': 'We have good news!'
            }
            send_html_email(list(email), 'Good news', context, "info@example.org")

            return JsonResponse({"ds": email})


def LoginPost(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = request.POST.get('email')
            password = request.POST.get('password')
            remember_token = request.POST.get('remember_me', None)
            user = authenticate(request, username=email, password=password)
            print(user)
            print(remember_token)
            if user is not None:
                login(request, user)
                if not remember_token:
                    request.session.set_expiry(0)
                return JsonResponse({'url': reverse('index') + userType(user)})
        else:
            return JsonResponse({'form-errors': form.errors})
    else:
        return JsonResponse({'Error'})


def userType(user):
    if Student.objects.filter(user=user).count():
        return "student"
    elif Teacher.objects.filter(user=user).count():
        return "teacher"
    elif Adviser.objects.filter(user=user).count():
        return "adviser"
    elif Manager.objects.filter(user=user).count():
        return "manager"
    else:
        return "none"
