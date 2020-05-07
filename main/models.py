from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Adviser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    text = models.TextField()
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    text = models.TextField()
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return self.title
