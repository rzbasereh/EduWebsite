from main.models import Student
from django.db import models
from django.utils.timezone import now
import datetime
import jdatetime


# Create your models here.


class StudentForm(models.Model):
    user = models.OneToOneField(Student, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()


class ExamResult(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(default=now())
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
