from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('component', views.component, name="component"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('recover-pass/', views.recoverPassword, name="recoverPassword"),
    path('recover-pass/request', views.recover_password_request, name="recover_password_request"),
    path('login/post/', views.LoginPost, name="login-post"),
    path('notFound/', views.notFound, name="notFound"),
]
