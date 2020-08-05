from django.urls import path
from . import views

app_name = 'teacher'

urlpatterns = [
    path('', views.index, name="index"),
    path('questions', views.questions, name="questions"),
    path('questions/get_page', views.filter_page, name="filter_page"),
    path('questions/edit', views.edit_question, name="new_exam"),
    path('questions/edit/<int:pk>', views.edit_submit_question, name="edit_exam"),
    path('questions/edit/<int:pk>/add', views.add_to_edit, name="add_to_edit"),
    path('questions/edit/save', views.save_edit_question, name="save_new_exam"),
    path('questions/delete_exam/<int:pack_pk>', views.delete_exam, name="delete_exam"),
    path('questions/add_new/save_grades', views.saveGrades, name="saveGrades"),
    path('questions/add_new', views.newQuestion, name="newQuestion"),
    path('questions/add_new/save', views.addQuestion, name='saveNewQuestion'),
    path('questions/add_new/cancel/<int:pk>', views.cancelAddQuestion, name='cancelAddQuestion'),
    path('questions/selected', views.selectedQuestion, name="selectedQuestion"),
    path('questions/edit/<int:pk>/add/selected', views.edit_selected_question, name="selectedQuestion_edit"),
    path('class', views.classRoom, name="class"),
    path('exam', views.examManagement, name="examManagement"),
    path('report', views.report, name="report"),
    path('report/search', views.report_search, name="report_search"),
    path('report/save', views.save_report, name="save_report"),
    path('report/display', views.display_report, name="display_report"),
    path('report/reply', views.reply_report, name="reply_report"),
]
