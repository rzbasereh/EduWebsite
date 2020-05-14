from django.db import models
from main.models import Teacher, Manager


# Create your models here.
class ManagerForm(models.Model):
    user = models.OneToOneField(Manager, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='uploads/manager', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()


class TeacherAccess(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    online_exam_access = models.BooleanField(default=False)
    add_question_access = models.BooleanField(default=False)

    def __str__(self):
        return self.teacher.get_full_name()


class HeadLine(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    head_line = models.ManyToManyField(HeadLine)

    def __str__(self):
        return self.name


class Lesson(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    chapter = models.ManyToManyField(Chapter)

    def __str__(self):
        return self.name


class LessonField(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    TYPE = (
        ('1', 'عمومی'),
        ('2', 'اختصاصی')
    )
    type = models.CharField(choices=TYPE, max_length=2, null=True, blank=True)
    lesson = models.ManyToManyField(Lesson)

    def __str__(self):
        return self.name


class Field(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    lesson_field = models.ManyToManyField(LessonField)

    def __str__(self):
        return self.name


class SubGrade(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    field = models.ManyToManyField(Field)

    def __str__(self):
        return self.name


class Grade(models.Model):
    GRADE = (
        ('1', 'دوره اول متوسطه'),
        ('2', 'دوره دوم متوسطه'),
    )
    grade = models.CharField(choices=GRADE, max_length=2, null=True, blank=True)
    sub_grade = models.ManyToManyField(SubGrade)

    def __str__(self):
        return self.grade
