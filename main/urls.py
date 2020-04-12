from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('recover-pass/', views.recoverPassword, name="recoverPassword"),
    path('login/post/', views.LoginPost, name="login-post")
]
