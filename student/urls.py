from django.urls import path
from . import views

app_name = 'student'

urlpatterns = [
    path('', views.index, name='index'),
    path('exam', views.exam, name='exam'),
    path('QuestionBank', views.questionBank),
]
