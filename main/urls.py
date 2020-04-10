from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.login, name="login"),
    path('recover-pass/', views.recoverPassword, name="recoverPassword"),
]
