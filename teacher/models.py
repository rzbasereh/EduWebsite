import jdatetime
import datetime
import locale
from django.contrib.auth.models import User
from main.models import Teacher, Student, Manager
from manager.models import ManagerForm
from django.db import models
from django.utils import timezone
from django.utils.timezone import now, timedelta
from django.utils import timezone
from django.utils.timezone import utc
from finglish import f2p
from django.utils.timezone import localtime
from khayyam import *


# Create your models here.
class TeacherForm(models.Model):
    user = models.OneToOneField(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='uploads/teacher', default="defaults/avatar/default.jpg")
    phone_number = models.CharField(max_length=11, null=True, blank=True)

    def __str__(self):
        return self.user.get_full_name()


class ClassRoom(models.Model):
    name = models.CharField(max_length=1000)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    # GRADE = (
    #    ('12', 'کنکوری'),
    #    ('11', 'پایه یازدهم'),
    #    ('10', 'پایه دهم'),
    # )
    # grade = models.CharField(choices=GRADE, max_length=2, blank=True, null=True)
    # FIELD = (
    #    ('1', 'علوم تجربی'),
    #    ('2', 'ریاضی و فیزیک'),
    #    ('3', 'انسانی'),
    # )
    # field = models.CharField(choices=FIELD, max_length=2, blank=True, null=True)
    students = models.ManyToManyField(Student, blank=True)
    initial_date = models.DateTimeField(default=now)
    start_date = models.DateField()
    end_date = models.DateField()
    class_link = models.CharField(max_length=1000, blank=True, null=True)
    class_cap = models.IntegerField()
    is_active = models.BooleanField(default=False)
    open_signup = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()
    LAYOUT = (
        ('horizontal', "افقی"),
        ('vertical', "عمودی"),
        ('2in2', "دو در دو")
    )
    choice_layout = models.CharField(choices=LAYOUT, max_length=10, default="horizontal")
    choice_1 = models.TextField()
    choice_2 = models.TextField()
    choice_3 = models.TextField()
    choice_4 = models.TextField()
    choice_5 = models.TextField()
    correct_ans = models.CharField(max_length=1, blank=True, null=True)
    verbose_ans = models.TextField(null=True, blank=True)
    grades = models.CharField(max_length=1000, blank=True, null=True)
    SOURCE = (
        ('Author', 'تالیفی'),
        ('2', 'کنکور سراسری'),
        ('3', 'المپیاد'),
        ('Sanjesh', 'سنجش'),
        ('kanoon', 'قلم چی'),
        ('Gozine2', 'گزینه دو'),
        ('7', 'سایر'),
    )
    source = models.CharField(choices=SOURCE, max_length=10, default='1')
    LEVEL = (
        ('1', 'ساده'),
        ('2', 'متوسط'),
        ('3', 'دشوار'),
        ('4', 'پیل افکن'),
    )
    level = models.CharField(choices=LEVEL, max_length=1, blank=True, null=True)
    is_publish = models.BooleanField(default=False)
    is_descriptive = models.BooleanField(default=False)
    on_write = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)


class Exam(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    info = models.TextField(blank=True, null=True)
    className = models.ManyToManyField(ClassRoom, blank=True)
    initial_date = models.DateTimeField(default=now, blank=True, null=True)
    hold_from = models.DateTimeField(blank=True, null=True)
    hold_to = models.DateTimeField(blank=True, null=True)
    preview = models.BooleanField(default=False)
    code = models.CharField(max_length=100, blank=True, null=True)
    suggested_time = models.TimeField(null=True, blank=True)
    is_online = models.BooleanField(default=True)
    is_submit = models.BooleanField(default=False)
    is_edit = models.BooleanField(default=False)
    is_add = models.BooleanField(default=False)
    is_publish = models.BooleanField(default=False)
    examKey = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-
    keyMapper = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5,-

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.initial_date.day,
            month=self.initial_date.month,
            year=self.initial_date.year
        )
        return f2p(date.strftime('%d %B %y'))


class QuestionPack(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    second = models.IntegerField(default=0)
    minute = models.IntegerField(default=0)
    hour = models.IntegerField(default=0)
    info = models.TextField(blank=True, null=True)
    questions = models.ManyToManyField(Question)
    submit = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


class ExamQuestion(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    STATE = (
        ('del', "حذف شده"),
        ('add', 'اضافه شده'),
        ('submit', "ثبت شده")
    )
    state = models.CharField(choices=STATE, max_length=6, default="add")
    position = models.IntegerField(default=0)

    def __str__(self):
        return str(self.exam) + " - " + str(self.position)


class ERun(models.Model):
    name = models.CharField(max_length=1000, null=True, blank=True)
    info = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.ManyToManyField(ClassRoom, blank=True)
    add_on_user = models.ManyToManyField(Student, blank=True)
    TYPE = (
        ('float', 'شناور'),
        ('fix', 'ایستا')
    )
    type = models.CharField(choices=TYPE, max_length=5, default="float")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    time = models.CharField(max_length=1000, default="")
    reject = models.BooleanField(default=False)
    is_publish = models.BooleanField(default=True)
    participant_num = models.IntegerField(default=0)
    repeat_num = models.IntegerField(default=1)
    has_negative_point = models.BooleanField(default=False)
    negative_point = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name

    @property
    def is_active(self):
        if self.start_time < now() < self.end_time:
            return True
        else:
            return False

    def jd_start_time(self):
        time = localtime(self.start_time)
        date = jdatetime.datetime.fromgregorian(
            minute=time.minute,
            hour=time.hour,
            day=time.day,
            month=time.month,
            year=time.year
        )
        return date.strftime("%A %B")

    def jd_end_time(self):
        time = localtime(self.end_time)
        # locale.setlocale(utc)
        #
        date = jdatetime.datetime.fromgregorian(
            minute=time.minute,
            hour=time.hour,
            day=time.day,
            month=time.month,
            year=time.year
        )
        return date.strftime("%d %B %y %H:%M")


class ExamERun(models.Model):
    name = models.CharField(max_length=1000, blank=True, null=True)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    e_run = models.ForeignKey(ERun, on_delete=models.CASCADE)
    time = models.TimeField()
    random_question = models.BooleanField(default=False)
    random_choice = models.BooleanField(default=False)
    position = models.IntegerField(default=0)

    def __str__(self):
        return str(self.exam) + " - " + str(self.e_run)


class Report(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    # className = models.ForeignKey(Class, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=1000, null=True, blank=True)
    text = models.TextField()
    is_seen = models.BooleanField(default=False)
    date_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        jdatetime.set_locale("fa_IR")
        date = jdatetime.datetime.fromgregorian(
            second=self.date_time.second,
            minute=self.date_time.minute,
            hour=self.date_time.hour,
            day=self.date_time.day,
            month=self.date_time.month,
            year=self.date_time.year
        )
        output = self.teacher.user.get_full_name() + " - " + f2p(date.strftime("%d %B %y"))
        return output

    def get_teacher_avatar(self):
        avatar = TeacherForm.objects.get(user=self.teacher).avatar
        return avatar.url

    def get_time_diff(self):
        now_time = datetime.datetime.utcnow().replace(tzinfo=utc)
        time_diff = (now_time - self.date_time).total_seconds()
        SECOND = 1
        MINUTE = 60 * SECOND
        HOUR = 60 * MINUTE
        DAY = 24 * HOUR
        MONTH = 30 * DAY

        if time_diff < MINUTE:
            return "لحظاتی قبل"
        elif time_diff < 2 * MINUTE:
            return "یک دقیقه قبل"
        elif time_diff < 60 * MINUTE:
            minute = int(time_diff / 60)
            return str(minute) + " دقیقه قبل"
        elif time_diff < 120 * MINUTE:
            return "یک ساعت قبل"
        elif time_diff < 24 * HOUR:
            hour = int(time_diff / 3600)
            return str(hour) + " ساعت قبل"
        elif time_diff < 48 * HOUR:
            return "دیروز"
        elif time_diff < 30 * DAY:
            day = int(time_diff / 86400)
            return str(day) + " روز قبل"
        elif time_diff < 12 * MONTH:
            month = int(time_diff / 2592000)
            if month == 1:
                return "یک ماه قبل"
            return str(month) + " ماه قبل"
        else:
            year = int(time_diff / (MONTH * 12))
            if year == 1:
                return "پارسال"
            return str(year) + " سال قبل"


class ReportReply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField()
    date_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        jdatetime.set_locale("fa_IR")
        date = jdatetime.datetime.fromgregorian(
            second=self.date_time.second,
            minute=self.date_time.minute,
            hour=self.date_time.hour,
            day=self.date_time.day,
            month=self.date_time.month,
            year=self.date_time.year
        )
        output = self.user.get_full_name() + " - " + f2p(date.strftime("%d %B %y"))
        return output

    def get_sender_avatar(self):
        try:
            avatar = TeacherForm.objects.get(user=self.user.teacher).avatar
            return avatar.url
        except:
            avatar = ManagerForm.objects.get(user=self.user.manager).avatar
            return avatar.url

    def get_time_diff(self):
        now_time = datetime.datetime.utcnow().replace(tzinfo=utc)
        time_diff = (now_time - self.date_time).total_seconds()
        SECOND = 1
        MINUTE = 60 * SECOND
        HOUR = 60 * MINUTE
        DAY = 24 * HOUR
        MONTH = 30 * DAY

        if time_diff < MINUTE:
            return "لحظاتی قبل"
        elif time_diff < 2 * MINUTE:
            return "یک دقیقه قبل"
        elif time_diff < 60 * MINUTE:
            minute = int(time_diff / 60)
            return str(minute) + " دقیقه قبل"
        elif time_diff < 120 * MINUTE:
            return "یک ساعت قبل"
        elif time_diff < 24 * HOUR:
            hour = int(time_diff / 3600)
            return str(hour) + " ساعت قبل"
        elif time_diff < 48 * HOUR:
            return "دیروز"
        elif time_diff < 30 * DAY:
            day = int(time_diff / 86400)
            return str(day) + " روز قبل"
        elif time_diff < 12 * MONTH:
            month = int(time_diff / 2592000)
            if month == 1:
                return "یک ماه قبل"
            return str(month) + " ماه قبل"
        else:
            year = int(time_diff / (MONTH * 12))
            if year == 1:
                return "پارسال"
            return str(year) + " سال قبل"


class ReportAttach(models.Model):
    TYPE = (
        ("report", "گزارش"),
        ("report_replay", "پاسخ گزارش")
    )
    type = models.CharField(choices=TYPE, max_length=20, default="report")
    report = models.ForeignKey(Report, on_delete=models.CASCADE, blank=True, null=True)
    report_replay = models.ForeignKey(ReportReply, on_delete=models.CASCADE, blank=True, null=True)
    file = models.FileField(upload_to='reports/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name

    def get_file_size(self):
        file_size = self.file.size
        if file_size < 1000:
            file_size = str(file_size) + " B"
        elif 1000 < file_size < 1000000:
            file_size = str(int(file_size / 1000)) + " KB"
        else:
            file_size = str(int(file_size / 1000000)) + " MB"
        return file_size
