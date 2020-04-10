from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import LoginForm
from django.contrib.auth import authenticate, login


def index(request):
    return render(request, 'main/index.html', {})


def login(request):
    return render(request, 'main/login.html', {})


def recoverPassword(request):
    return render(request, 'main/recoverPassword.html', {})


def LoginPost(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = request.POST.get('email', '')
            password = request.POST.get('password', '')
            remember_token = request.POST.get('remember_token', 'off')
            user = authenticate(request, email=email, password=password)
            print(user)
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'login'})
            else:
                return JsonResponse({'email': email, 'password': password, 'token': remember_token})
        else:
            return JsonResponse({'form-errors': form.errors})
    else:
        return JsonResponse({'Error'})
