from django.contrib import admin
from .models import Student, Notification, Message, Teacher, Adviser, Manager

# Register your models here.
admin.site.register(Student)
admin.site.register(Notification)
admin.site.register(Message)
admin.site.register(Teacher)
admin.site.register(Adviser)
admin.site.register(Manager)
