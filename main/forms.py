from django import forms
from django.db import models
from .models import User


class LoginForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ('password', 'email')
