from django.contrib import admin
from .models import Student, Notification, Message, Teacher

# Register your models here.
admin.site.register(Student)
admin.site.register(Notification)
admin.site.register(Message)
admin.site.register(Teacher)
