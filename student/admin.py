from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(StudentForm)
admin.site.register(ExamResult)
admin.site.register(StudentExamResult)
admin.site.register(StudentExamQuestion)
admin.site.register(StudentExam)
