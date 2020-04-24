import datetime

import jdatetime
from django.contrib.auth.models import User
from main.models import Teacher, Student
from django.db import models
from django.utils.timezone import now


# Create your models here.
class TeacherForm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()


class Exam(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    class_name = models.CharField
    date = models.DateField(default=now(), blank=True, null=True)
    GRADE = (
        ('12', 'کنکوری'),
        ('11', 'پایه یازدهم'),
        ('10', 'پایه دهم'),
    )
    grade = models.CharField(choices=GRADE, max_length=2, blank=True, null=True)
    FIELD = (
        ('1', 'علوم تجربی'),
        ('2', 'ریاضی و فیزیک'),
        ('3', 'انسانی'),
    )
    filed = models.CharField(choices=FIELD, max_length=2, blank=True, null=True)
    examKey = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-
    keyMapper = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.date.day,
            month=self.date.month,
            year=self.date.year
        )
        return date.strftime('%d %B %y')


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()
    correct_ans = models.CharField(max_length=1, blank=True, null=True)
    verbose_ans = models.TextField()
    GRADE = (
        ('12', 'کنکوری'),
        ('11', 'پایه یازدهم'),
        ('10', 'پایه دهم'),
    )
    grade = models.CharField(choices=GRADE, max_length=2, blank=True, null=True)
    SOURCE = (
        ('Author', 'تالیفی'),
        ('Entrance', 'کنکور سراسری'),
        ('Kanoon', 'قلم چی')
    )
    source = models.CharField(choices=SOURCE, max_length=10, blank=True, null=True)

    def __str__(self):
        return self.grade


class ClassRoom(models.Model):
    name = models.CharField(max_length=1000)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    students = models.ManyToManyField(Student, blank=True, null=True)

    def __str__(self):
        return self.name

# class Report(models.Model):
#     teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
#     className = models.ForeignKey(Class, on_delete=models.CASCADE, blank=True, null=True)
#     text = models.TextField()
#     date = models.DateTimeField(default=now())
#
#     def __str__(self):
#         jdatetime.set_locale("fa_IR")
#         date = jdatetime.datetime.fromgregorian(
#             second=self.date.second,
#             minute=self.date.minute,
#             hour=self.date.hour,
#             day=self.date.day,
#             month=self.date.month,
#             year=self.date.year
#         )
#         output = self.teacher + date.strftime("%s:%m:%h - %d %B %y")
#         return output
