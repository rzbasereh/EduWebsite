from django.contrib import admin
from .models import Exam, Question, TeacherForm, ClassRoom, QuestionPack

# Register your models here.
admin.site.register(TeacherForm)
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(ClassRoom)
admin.site.register(QuestionPack)
