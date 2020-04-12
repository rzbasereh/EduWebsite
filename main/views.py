import urllib.parse

from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponseRedirect
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.contrib.auth.models import User


def index(request):
    return render(request, 'main/index.html', {})


def loginPage(request):
    if request.user.is_authenticated:
        return render(request, 'main/index.html', {})
    return redirect(reverse('index'))


def logoutUser(request):
    logout(request)
    return redirect('/')


def recoverPassword(request):
    return render(request, 'main/recoverPassword.html', {})


def LoginPost(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = request.POST.get('email')
            password = request.POST.get('password')
            remember_token = request.POST.get('remember_token', 'off')
            user = authenticate(request, username=email, password=password)
            print(user)
            if user is not None:
                login(request, user)
                return JsonResponse({'url': reverse('index')})
        else:
            return JsonResponse({'form-errors': form.errors})
    else:
        return JsonResponse({'Error'})
