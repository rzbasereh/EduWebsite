from django.urls import path
from . import views

app_name = 'manager'

urlpatterns = [
    path('', views.index, name="index"),
    path('users', views.users, name="users"),
    path('users/add', views.addUser, name="add_user"),
    path('classes', views.classes, name="classes"),
]
