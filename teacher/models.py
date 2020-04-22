import datetime

import jdatetime
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Exam(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today())
    TYPE = (
        ('12', 'کنکوری'),
        ('11', 'پایه یازدهم'),
        ('10', 'پایه دهم'),
    )
    type = models.CharField(choices=TYPE, max_length=2, blank=True, null=True)
    examKey = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.date.day,
            month=self.date.month,
            year=self.date.year
        )
        return date.strftime('%d %B %y')
