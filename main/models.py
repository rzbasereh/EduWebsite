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
    created_at = models.DateTimeField(auto_now_add=True)

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
    created_at = models.DateTimeField(auto_now_add=True)

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
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    text = models.TextField()
    TYPE = (
        ('error', 'خطا'),
        ('warning', "هشدار"),
        ('info', 'درباره'),
        ('success', 'موفقیت')
    )
    type = models.CharField(choices=TYPE, max_length=7, null=True, blank=True)
    is_seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

    def get_full_name(self):
        return self.user.get_full_name()


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver", null=True, blank=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    text = models.TextField()
    is_seen = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
