from django import template
from main.models import *
from student.models import StudentForm
from teacher.models import TeacherForm
from manager.models import ManagerForm

register = template.Library()


@register.simple_tag
def get_avatar(user):
    if StudentForm.objects.filter(user=user).count():
        avatar = StudentForm.objects.get(user=user).avatar.url
    elif TeacherForm.objects.filter(user=user).count():
        avatar = TeacherForm.objects.get(user=user).avatar.url
    elif ManagerForm.objects.filter(user=user).count():
        avatar = TeacherForm.objects.get(user=user).avatar.url
    else:
        return "none"
    return avatar
