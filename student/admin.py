from django.contrib import admin
from .models import UserForm, ExamResult

# Register your models here.
admin.site.register(UserForm)
admin.site.register(ExamResult)