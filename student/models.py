from main.models import Student
from django.db import models
from teacher.models import *
from django.utils.timezone import now
import jdatetime


# Create your models here.


class StudentForm(models.Model):
    user = models.OneToOneField(Student, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='uploads/student', default="defaults/avatar/default.jpg")
    phone_number = models.CharField(max_length=11, null=True, blank=True)

    def __str__(self):
        return self.user.get_full_name()


class StudentExam(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    e_run = models.ForeignKey(ERun, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    is_finish = models.BooleanField(default=False)

    def __str__(self):
        return str(self.student) + " - " + str(self.e_run)


class StudentExamQuestion(models.Model):
    student_exam = models.ForeignKey(StudentExam, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=1, blank=True, null=True)
    position = models.IntegerField(default=0)
    answer_order = models.CharField(max_length=5, default="12345")

    def __str__(self):
        return str(self.student_exam) + " " + str(self.question.id) + " - " + str(self.answer)


class StudentExamResult(models.Model):
    student_exam = models.ForeignKey(StudentExam, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.student_exam)


class ExamResult(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateTimeField(default=now)
    e_run = models.ForeignKey(ERun, on_delete=models.CASCADE, blank=True, null=True)
    in_exam = models.BooleanField(default=False)
    code = models.CharField(max_length=100, blank=True, null=True)
    answers = models.CharField(max_length=1000, blank=True, null=True)  # answers: 0,1,2,3,4,5

    def __str__(self):
        jdatetime.set_locale(locale='fa_IR')
        date = jdatetime.date.fromgregorian(
            day=self.date.day,
            month=self.date.month,
            year=self.date.year
        )
        return date.strftime('%d %B %y')


class ExamResultQuestion(models.Model):
    exam_result = models.ForeignKey(ExamResult, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    student_ans = models.CharField(max_length=2)

    def __str__(self):
        return str(self.exam_result) + "-" + str(self.question)
