from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class UserForm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")

    def __str__(self):
        return self.user.get_full_name()
