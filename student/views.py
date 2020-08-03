from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from main.models import Notification, Message
from teacher.models import *
from .models import *
import ast
from random import randrange


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = StudentForm.objects.filter(user=request.user.student)[0].avatar.url
    has_message = Message.objects.filter(user=request.user, is_seen=False).exists()
    message = Message.objects.filter(user=request.user)
    has_notification = Notification.objects.filter(user=request.user, is_seen=False).exists()
    notification = Notification.objects.filter(user=request.user, is_seen=False)
    user = {
        'full_name': full_name,
        'avatar': avatar,
        'has_message': has_message,
        'message': message,
        'has_notification': has_notification,
        'notification': notification,
    }
    return user


def percentCalc(key, ans):
    n = len(key)
    T = 0
    F = 0
    for i in range(len(key)):
        if key[i] == "-":
            n = n - 1
        elif key[i] == ans[i]:
            T = T + 1
        elif ans[i] != "0":
            F = F + 1
    percent = 0
    if n != 0:
        percent = (T * 3 - F) / (n * 3)
    return "{0:.2f}".format(percent * 100).rstrip('0').rstrip('.')


def levelCalc(code, key, first, end, percent):
    allResults = ExamResult.objects.filter(code=code)
    ave = 0
    for i in range(len(allResults)):
        ave = ave + float(percentCalc(key, allResults[i].answers[first:end + 1]))
    ave = ave / len(allResults)
    sigma = 0
    for i in range(len(allResults)):
        sigma = sigma + (ave - float(percentCalc(key, allResults[i].answers[first:end + 1]))) ** 2
    sigma = (sigma / len(allResults)) ** 0.5

    if sigma != 0:
        z = (float(percent) - ave) / sigma
    else:
        z = 0
    level = 900 * z + 6000
    return "{0:.2f}".format(level).rstrip('0').rstrip('.')


def rankCalc(code, key, first, end, level):
    levels = list()
    allResults = ExamResult.objects.filter(code=code)
    for i in range(len(allResults)):
        user_percent = percentCalc(key, allResults[i].answers[first: end + 1])
        user_level = levelCalc(code, key, first, end, user_percent)
        levels.append(user_level)
    levels = list(dict.fromkeys(levels))
    rank = sorted(levels, reverse=True).index(level) + 1
    return rank


def examResult(user, code):
    result = list()
    user_ans = list(ExamResult.objects.filter(user=user, code=code).first().answers)
    if Exam.objects.filter(code=code).first().is_online:
        questions = QuestionPack.objects.filter(exam_code=code).first().questions
        lessons = list()
        for question in questions.all():
            lessons.append(question.lesson)
        lessons = list(dict.fromkeys(lessons))
        lesson_data = list()
        for lesson in lessons:
            dict_data = {}
            # percent = percentCalc(,)
            # level = levelCalc(code, exam_key[first:end + 1], first, end, percent)
            dict_data.update({'name': lesson,
                              'percent': "",
                              'level': "",
                              'rank': "",
                              })
            lesson_data.append(dict_data)
        print(lesson_data)
        exam_key = user_ans
    else:
        exam_key = list(Exam.objects.filter(code=code).first().examKey)
        mapper = ast.literal_eval(str(Exam.objects.filter(code=code).first().keyMapper))
        for i in range(len(mapper)):
            value = list(mapper.values())[i]
            key = list(mapper.keys())[i]
            data = {}
            lesson_data = list()
            for j in range(len(value)):
                dict_data = {}
                first = int(list(value.values())[j][0])
                end = int(list(value.values())[j][-1])
                percent = percentCalc(exam_key[first:end + 1], user_ans[first:end + 1])
                level = levelCalc(code, exam_key[first:end + 1], first, end, percent)
                dict_data.update({'name': list(value.keys())[j],
                                  'percent': percent,
                                  'level': level,
                                  'rank': rankCalc(code, exam_key[first:end + 1], first, end, level)
                                  })
                lesson_data.append(dict_data)
            data.update({'type': key, 'lessonDate': lesson_data})
            result.append(data)
    key_ans = zip(exam_key, user_ans)
    data = {
        'key_ans': key_ans,
        'result': result,
    }
    return data


def index(request):
    user = commonData(request)
    return render(request, 'student/index.html', {'user': user})


def class_room(request):
    pass


def calc_percents(exam_run, exam_key):
    percents_list = list()
    for se in StudentExam.objects.filter(e_run=exam_run.e_run, is_finish=True).all():
        data = dict()
        data["student"] = se.student.id
        result = list()
        for eq in ExamQuestion.objects.filter(exam=exam_run.exam).all():
            seq = StudentExamQuestion.objects.get(student_exam=se, question=eq.question)
            if seq.answer == eq.question.correct_ans:
                result.append("T")
            elif seq.answer is None:
                result.append("N")
            else:
                result.append("F")
        if exam_run.e_run.has_negative_point:
            data["percent"] = "{0:.2f}".format(
                ((int(exam_run.e_run.negative_point) * result.count('T') - result.count("F")) / (
                        int(exam_run.e_run.negative_point) * len(exam_key))) * 100).rstrip('0').rstrip('.')
        else:
            data["percent"] = "{0:.2f}".format((result.count('T') / len(exam_key)) * 100).rstrip('0').rstrip('.')
        if se.student.id in [pl['student'] for pl in percents_list]:
            if float(data["percent"]) > float():
                # get  percent
                pass
        else:
            print(data["percent"])
            percents_list.append(data)
    return percents_list


def calc_level(percent, percents_list):
    ave = 0
    length = len([pl["percent"] for pl in percents_list])
    for user_p in [pl["percent"] for pl in percents_list]:
        ave = ave + float(user_p)
    ave = ave / length

    sigma = 0
    for user_p in [pl["percent"] for pl in percents_list]:
        sigma = sigma + (ave - float(user_p)) ** 2
    sigma = (sigma / length) ** 0.5

    if sigma != 0:
        z = (float(percent) - ave) / sigma
    else:
        z = 0
    level = 900 * z + 6000
    return "{0:.2f}".format(level).rstrip('0').rstrip('.')


def calc_rank(level, percents_list):
    levels_list = list()
    for percent in [pl["percent"] for pl in percents_list]:
        levels_list.append(calc_level(percent, percents_list))
    levels_list.reverse()
    levels_list = list(dict.fromkeys(levels_list))
    return levels_list.index(level) + 1


def calc_result(student, pk):
    if StudentExam.objects.filter(id=pk, student=student, is_finish=True).exists():
        e_run = StudentExam.objects.get(id=pk).e_run
        user_ans = [seq.answer for seq in
                    StudentExamQuestion.objects.filter(student_exam_id=pk).all().order_by("position")]
        exam_key = [seq.question.correct_ans for seq in
                    StudentExamQuestion.objects.filter(student_exam_id=pk).all().order_by("position")]
        exam_result = dict()
        exam_result["name"] = e_run.name
        # {'name': "", 'percent': "", 'level': "", 'rank': ""}
        lesson_data = list()
        for exam_run in ExamERun.objects.filter(e_run=e_run).all().order_by("position"):
            data = dict()
            result = list()
            for eq in ExamQuestion.objects.filter(exam=exam_run.exam).all():
                seq = StudentExamQuestion.objects.get(student_exam_id=pk, question=eq.question)
                if seq.answer == eq.question.correct_ans:
                    result.append("T")
                elif seq.answer is None:
                    result.append("N")
                else:
                    result.append("F")
            if e_run.has_negative_point:
                data["percent"] = "{0:.2f}".format(
                    ((int(e_run.negative_point) * result.count('T') - result.count("F")) / (
                            int(e_run.negative_point) * len(exam_key))) * 100).rstrip('0').rstrip('.')
            else:
                data["percent"] = "{0:.2f}".format((result.count('T') / len(exam_key)) * 100).rstrip('0').rstrip(
                    '.')
            data["name"] = exam_run.name
            percents_list = calc_percents(exam_run, exam_key)
            data["level"] = calc_level(data["percent"], percents_list)
            data["rank"] = calc_rank(data["level"], percents_list)
            lesson_data.append(data)
        exam_result["lesson_data"] = lesson_data
        return {"key_ans": zip(exam_key, user_ans), "result": exam_result}
    return False


def exam(request):
    user = commonData(request)
    # exams = ExamResult.objects.filter(user=request.user.student).order_by('-date')
    # data = examResult(request.user.student, exams.first().code)
    exams = ""
    exam_list = list()
    for se in StudentExam.objects.filter(student=request.user.student, is_finish=True).all():
        data = dict()
        data["id"] = se.id
        data["title"] = se.e_run.name
        exam_list.append(data)
    data = ""
    if StudentExam.objects.filter(student=request.user.student, is_finish=True).exists():
        student_exam = StudentExam.objects.filter(student=request.user.student, is_finish=True).last()
        data = calc_result(request.user.student, student_exam.id)
    return render(request, 'student/exam.html', {'user': user, 'data': data, "exam_list": exam_list})


def online_exam(request):
    user = commonData(request)
    exams = ERun.objects.filter(is_publish=True)
    user_exams = list()
    for active_exam in exams:
        if request.user.student in active_exam.add_on_user.all():
            user_exams.append(active_exam)
        else:
            for class_room in active_exam.class_name.all():
                if request.user.student in class_room.students.all():
                    user_exams.append(active_exam)

    return render(request, 'student/online_exam.html', {'user': user, 'online_exams': user_exams})


def preview_exam(request, pk):
    if ERun.objects.filter(is_publish=True, id=pk).exists():
        user_exam = ERun.objects.get(is_publish=True, id=pk)
    else:
        return render(request, 'main/404.html', {})
    exam_students = list()
    for exam_class in user_exam.class_name.all():
        for student in exam_class.students.all():
            exam_students.append(student)
    if request.user.student in user_exam.add_on_user.all() or request.user.student in exam_students:
        if StudentExam.objects.filter(e_run=user_exam, student=request.user.student,
                                      is_finish=True).count() < user_exam.repeat_num:
            user = commonData(request)
            exam_runs = ExamERun.objects.filter(e_run=user_exam).all()
            flag = False
            if not StudentExam.objects.filter(student=request.user.student, e_run=user_exam, is_finish=False).exists():
                repeat_num = 1
                if StudentExam.objects.filter(student=request.user.student, e_run=user_exam).exists():
                    repeat_num = max(list(map(int, StudentExam.objects.filter(student=request.user.student,
                                                                              e_run=user_exam).all().values_list(
                        "repeat_num", flat=True)))) + 1
                student_exam = StudentExam(student=request.user.student, e_run=user_exam, repeat_num=repeat_num)
                student_exam.save()
                flag = True
            else:
                student_exam = StudentExam.objects.get(student=request.user.student, e_run=user_exam, is_finish=False)
            packs = list()
            q_num = 0
            for exam_run in exam_runs:
                data = dict()
                data["time"] = exam_run.time.strftime("%H:%M:%S")
                data["title"] = exam_run.exam.name
                questions_list = list()
                exam_run_count = ExamQuestion.objects.filter(exam=exam_run.exam).all().count()
                # create StudentExamQuestions for new StudentExam object
                if flag:
                    for idx, eq in enumerate(
                            ExamQuestion.objects.filter(exam=exam_run.exam).all().order_by("position")):
                        if exam_run.random_question:
                            is_repeated = True
                            while is_repeated:
                                a = randrange(exam_run_count)
                                if StudentExamQuestion.objects.filter(student_exam=student_exam).exists():
                                    is_repeated = a in [p for p in StudentExamQuestion.objects.filter(
                                        student_exam=student_exam).all().values_list("position", flat=True)]
                                else:
                                    is_repeated = False
                                if not is_repeated:
                                    seq = StudentExamQuestion(student_exam=student_exam, question=eq.question,
                                                              position=a + q_num)
                                    seq.save()
                        else:
                            seq = StudentExamQuestion(student_exam=student_exam, question=eq.question,
                                                      position=idx + q_num)
                            seq.save()
                # sort StudentExamQuestions by position and prepare to send
                for seq in StudentExamQuestion.objects.filter(student_exam=student_exam).all().order_by("position")[
                           q_num:q_num + exam_run_count]:
                    list_item = dict()
                    list_item["id"] = seq.question.id
                    list_item["num"] = q_num
                    list_item["body"] = seq.question.body
                    list_item["choice_1"] = seq.question.choice_1
                    list_item["choice_2"] = seq.question.choice_2
                    list_item["choice_3"] = seq.question.choice_3
                    list_item["choice_4"] = seq.question.choice_4
                    list_item["choice_5"] = seq.question.choice_5
                    list_item["last_ans"] = seq.answer
                    questions_list.append(list_item)
                    q_num += 1
                data["questions"] = questions_list
                packs.append(data)
                user_exam.participant_num = len(list(dict.fromkeys(list(p for p in StudentExamQuestion.objects.filter(
                    student_exam=student_exam).all().values_list("student_exam__student", flat=True)))))
                user_exam.save()
            return render(request, 'student/exam_layouts/kashki.html',
                          {'user': user, 'exam': user_exam, 'packs': packs})
    return render(request, 'main/404.html', {})


def interval_save(request):
    ans = request.POST.get("ans")
    pk = request.POST.get("pk")
    if StudentExamQuestion.objects.filter(question_id=pk, student_exam__student=request.user.student,
                                          student_exam__is_finish=False).exists():
        se_result = StudentExamQuestion.objects.get(question_id=pk, student_exam__student=request.user.student,
                                                    student_exam__is_finish=False)
        se_result.answer = ans
        se_result.save()
    else:
        pass
    return JsonResponse({"status": "success"})


def end_exam(request):
    student_exam = StudentExam.objects.get(student=request.user.student, is_finish=False)
    student_exam.is_finish = True
    student_exam.end_time = timezone.now()
    student_exam.save()
    # TODO: Save user answers
    return HttpResponseRedirect(reverse('student:exam'))
