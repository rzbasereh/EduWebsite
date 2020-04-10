from django.db import models

# Create your models here.
messages = {
    'invalid': 'لطفا یک ایمیل صحیح را وارد کنید!',
}


class User(models.Model):
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE, null=True, blank=True)
    STATUS = (
        ('Check', 'در حال بررسی'),
        ('Active', 'فعال'),
        ('Suspend', 'مسدود'),
    )
    status = models.CharField(max_length=7, choices=STATUS, default="Check")
    USER_TYPE = (
        ('S', 'student'),
        ('E', 'expert'),
        ('C', 'consultant'),
        ('CE', 'consultant&expert'),
    )
    type = models.CharField(max_length=2, choices=USER_TYPE, default='S')

    def __str__(self):
        return self.user.email
