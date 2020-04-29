import jdatetime
from django.contrib.auth.models import User
from main.models import Teacher, Student
from manager.models import Lesson, Chapter, HeadLine
from django.db import models
from django.utils.timezone import now, timedelta


# Create your models here.
class TeacherForm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()


class ClassRoom(models.Model):
    name = models.CharField(max_length=1000)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
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
    field = models.CharField(choices=FIELD, max_length=2, blank=True, null=True)
    students = models.ManyToManyField(Student, blank=True)
    initial_date = models.DateField(default=now)
    validate_date = models.DateField(default=now() + timedelta(days=30))

    def __str__(self):
        return self.name


class Question(models.Model):
    author = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()
    choice_1 = models.CharField(max_length=1000, blank=True, null=True)
    choice_2 = models.CharField(max_length=1000, blank=True, null=True)
    choice_3 = models.CharField(max_length=1000, blank=True, null=True)
    choice_4 = models.CharField(max_length=1000, blank=True, null=True)
    choice_5 = models.CharField(max_length=1000, blank=True, null=True)
    correct_ans = models.CharField(max_length=1, blank=True, null=True)
    verbose_ans = models.TextField(null=True, blank=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, blank=True, null=True)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, blank=True, null=True)
    head_line = models.ForeignKey(HeadLine, on_delete=models.CASCADE, blank=True, null=True)
    SOURCE = (
        ('Author', 'تالیفی'),
        ('Entrance', 'کنکور سراسری'),
        ('Kanoon', 'قلم چی')
    )
    source = models.CharField(choices=SOURCE, max_length=10, blank=True, null=True)
    LEVEL = (
        ('1', 'ساده'),
        ('2', 'متوسط'),
        ('3', 'دشوار'),
        ('4', 'دشوارتر'),
    )
    level = models.CharField(choices=LEVEL, max_length=1, blank=True, null=True)

    def __str__(self):
        return self.lesson.name


class Exam(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    className = models.ManyToManyField(ClassRoom, blank=True)
    initial_date = models.DateTimeField(default=now, blank=True, null=True)
    hold_from = models.DateTimeField(blank=True, null=True)
    hold_to = models.DateTimeField(blank=True, null=True)
    preview = models.BooleanField(default=False)
    code = models.CharField(max_length=100, blank=True, null=True)
    is_online = models.BooleanField(default=False)
    examKey = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-
    keyMapper = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.initial_date.day,
            month=self.initial_date.month,
            year=self.initial_date.year
        )
        return date.strftime('%d %B %y')


class QuestionPack(models.Model):
    exam_code = models.CharField(max_length=100, blank=True, null=True)
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return self.exam_code

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
