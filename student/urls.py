from django.urls import path
from . import views

app_name = 'student'

urlpatterns = [
    path('', views.index, name='index'),
    path('class', views.class_room, name='class_room'),
    path('exam', views.exam, name='exam'),
    path('exam/online', views.online_exam, name='online_exam'),
    path('exam/online/preview/<int:pk>', views.preview_exam, name='preview_exam'),
    path('exam/online/preview/ajax_save', views.interval_save, name='interval_save'),
    path('exam/online/preview/end_exam', views.end_exam, name='end_exam'),
]
