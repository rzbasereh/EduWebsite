from django.contrib.auth.models import User
from django.db import models
import datetime
import jdatetime


# Create your models here.


class UserForm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()


class ExamResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(default=datetime.date.today())
    TYPE = (
        ('12', 'کنکوری'),
        ('11', 'پایه یازدهم'),
        ('10', 'پایه دهم'),
    )
    type = models.CharField(choices=TYPE, max_length=2, blank=True, null=True)
    answers = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.date.day,
            month=self.date.month,
            year=self.date.year
        )
        return date.strftime('%d %B %y')
