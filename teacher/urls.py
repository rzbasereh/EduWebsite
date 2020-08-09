from django.urls import path
from . import views

app_name = 'teacher'

urlpatterns = [
    path('', views.index, name="index"),
    path('questions', views.questions, name="questions"),
    path('questions/get_page', views.filter_page, name="filter_page"),
    path('questions/edit_exam', views.edit_exam, name="new_exam"),
    path('questions/edit_exam/<int:pk>', views.edit_submit_question, name="edit_exam"),
    path('question/edit/<int:pk>', views.edit_question, name="edit_question"),
    path('question/edit/save', views.store_edit_question, name="store_edit_question"),
    path('question/edit/save/confirm', views.confirm_question_change, name="confirm_question_change"),
    path('question/edit/save/as_new', views.store_edit_question_as_new, name="store_edit_question_as_new"),
    path('questions/edit_exam/<int:pk>/add', views.add_to_edit, name="add_to_edit"),
    path('questions/edit_exam/save', views.save_edit_question, name="save_new_exam"),
    path('questions/delete_exam/<int:pack_pk>', views.delete_exam, name="delete_exam"),
    path('questions/add_new/save_grades', views.saveGrades, name="saveGrades"),
    path('question/add', views.newQuestion, name="newQuestion"),
    path('questions/add_new/save', views.addQuestion, name='saveNewQuestion'),
    path('questions/add_new/cancel/<int:pk>', views.cancelAddQuestion, name='cancelAddQuestion'),
    path('questions/selected', views.selectedQuestion, name="selectedQuestion"),
    path('questions/edit_exam/<int:pk>/add/selected', views.edit_selected_question, name="selectedQuestion_edit"),
    path('class', views.classRoom, name="class"),
    path('exam', views.examManagement, name="examManagement"),
    path('report', views.report, name="report"),
    path('report/search', views.report_search, name="report_search"),
    path('report/save', views.save_report, name="save_report"),
    path('report/display', views.display_report, name="display_report"),
    path('report/reply', views.reply_report, name="reply_report"),
    path("upload_image", views.upload_image, name="upload_image"),
    path("upload_image_validation", views.upload_image_validation, name="upload_image_validation"),
]
