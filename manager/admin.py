from django.contrib import admin
from .models import TeacherAccess, Grade, SubGrade, Field, LessonField, Lesson, Chapter, HeadLine

# Register your models here.
admin.site.register(TeacherAccess)
admin.site.register(Grade)
admin.site.register(SubGrade)
admin.site.register(Field)
admin.site.register(Lesson)
admin.site.register(LessonField)
admin.site.register(Chapter)
admin.site.register(HeadLine)
