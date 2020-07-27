from django.urls import path
from . import views

app_name = 'manager'

urlpatterns = [
    path('', views.index, name="index"),
    path('users', views.users, name="users"),
    path('users/<str:user_name>', views.user_detail, name="user_detail"),
    path('users/search', views.user_search, name="user_search"),
    path('users/add', views.addUser, name="add_user"),
    path('users/info', views.user_info, name="user_info"),
    path('users/info/edit', views.edit_user_info, name="edit_user_info"),
    path('classes', views.classes, name="classes"),
    path('reports', views.reports, name="reports"),
    path('reports/display_report', views.display_report, name="display_report"),
    path('reports/send_reply', views.reply_report, name="reply_report"),
    path('reports/send_reply', views.reply_report, name="reply_report"),
    path('chats', views.chats, name="chats"),
]
