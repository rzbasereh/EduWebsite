import jdatetime
import datetime
from django.contrib.auth.models import User
from main.models import Teacher, Student, Manager
from django.db import models
from django.utils.timezone import now, timedelta
from django.utils import timezone
from django.utils.timezone import utc


# Create your models here.
class TeacherForm(models.Model):
    user = models.OneToOneField(Teacher, on_delete=models.CASCADE, null=True, blank=True)
    avatar = models.ImageField(upload_to='uploads/teacher', default="defaults/avatar/default.jpg")

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
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    body = models.TextField()
    TYPE = (
        ('1', 'تستی'),
        ('2', 'تشریحی')
    )
    type = models.CharField(choices=TYPE, max_length=1, blank=True, null=True)
    LAYOUT = (
        ('horizontal', "افقی"),
        ('vertical', "عمودی"),
        ('2in2', "دو در دو")
    )
    choice_layout = models.CharField(choices=LAYOUT, max_length=10, default="horizontal")
    correct_ans = models.CharField(max_length=1, blank=True, null=True)
    verbose_ans = models.TextField(null=True, blank=True)
    grades = models.CharField(max_length=1000, blank=True, null=True)
    SOURCE = (
        ('Author', 'تالیفی'),
        ('Entrance', 'کنکور سراسری'),
        ('Sanjesh', 'سنجش'),
        ('Kanoon', 'قلم چی'),
        ('Gozine2', 'گزینه دو'),
    )
    source = models.CharField(choices=SOURCE, max_length=10, default='Author')
    LEVEL = (
        ('1', 'ساده'),
        ('2', 'متوسط'),
        ('3', 'دشوار'),
    )
    level = models.CharField(choices=LEVEL, max_length=1, blank=True, null=True)
    is_publish = models.BooleanField(default=False)
    on_write = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    position = models.IntegerField()
    text = models.TextField()

    def __str__(self):
        return str(self.question) + " - " + str(self.position)


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
        return date.strftime('%d %B %y')


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
    position = models.IntegerField(max_length=1000, default=0)

    def __str__(self):
        return str(self.exam) + " - " + str(self.position)


class ERun(models.Model):
    name = models.CharField(max_length=1000, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class_name = models.ManyToManyField(ClassRoom)
    add_on_user = models.ManyToManyField(Student)
    TYPE = (
        ('float', 'شناور'),
        ('fix', 'ایستا')
    )
    type = models.CharField(choices=TYPE, max_length=5, default="float")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    reject = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ExamERun(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    e_run = models.ForeignKey(ERun, on_delete=models.CASCADE)
    time = models.TimeField()
    random_question = models.BooleanField(default=False)
    random_choice = models.BooleanField(default=False)

    def __str__(self):
        return str(self.exam + self.e_run)


class Report(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, blank=True, null=True)
    # className = models.ForeignKey(Class, on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField()
    date_time = models.DateTimeField(default=now())

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
        output = self.teacher.user.get_full_name() + " - " + date.strftime("%d %B %y")
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


class ReportAttach(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, blank=True, null=True)
    file = models.FileField(upload_to='reports/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
