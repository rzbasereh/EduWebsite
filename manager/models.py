from django.db import models
from main.models import Teacher


# Create your models here.
class TeacherAccess(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    online_exam = models.BooleanField(default=False)

    def __str__(self):
        return self.teacher.user.get_full_name()
