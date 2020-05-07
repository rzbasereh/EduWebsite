from django import template
from main.models import Student, Teacher, Adviser, Manager
from django.urls import reverse

register = template.Library()


@register.simple_tag
def index_url(user=None):
    if Student.objects.filter(user=user).count():
        return reverse("student:index")
    elif Teacher.objects.filter(user=user).count():
        return reverse("teacher:index")
    elif Adviser.objects.filter(user=user).count():
        return "adviser"
    elif Manager.objects.filter(user=user).count():
        return reverse("manager:index")
    else:
        return "none"
