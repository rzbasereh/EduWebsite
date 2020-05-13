from django.urls import path
from . import views

app_name = 'teacher'

urlpatterns = [
    path('', views.index, name="index"),
    path('questions', views.questions, name="questions"),
    path('questions/add_new', views.newQuestion, name="newQuestion"),
    path('questions/add_new/save', views.addQuestion, name='saveNewQuestion'),
    path('questions/add_new/cancel/<int:pk>', views.cancelAddQuestion, name='cancelAddQuestion'),
]
