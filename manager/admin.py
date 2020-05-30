from django.contrib import admin
from .models import TeacherAccess, ManagerForm, Grade

# Register your models here.
admin.site.register(TeacherAccess)
admin.site.register(ManagerForm)
admin.site.register(Grade)
