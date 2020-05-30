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


class Grade(models.Model):
    source = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return str(self.id)
