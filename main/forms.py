from django import forms
from django.db import models
from .models import User


class LoginForm(forms.ModelForm):
    # STATUS = (
    #     ('Check', 'در حال بررسی'),
    #     ('Active', 'فعال'),
    #     ('Suspend', 'مسدود'),
    # )
    # status = models.CharField(max_length=7, choices=STATUS, default="Check")
    # USER_TYPE = (
    #     ('S', 'student'),
    #     ('E', 'expert'),
    #     ('C', 'consultant'),
    #     ('CE', 'consultant&expert'),
    # )
    # type = models.CharField(max_length=2, choices=USER_TYPE, default='S')

    class Meta:
        model = User
        fields = ('password', 'email')
