from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from django.contrib import messages
from .models import TeacherForm, Question, QuestionPack
from manager.models import TeacherAccess
from main.models import Message, Notification
from django.core import serializers


# Create your views here.
def commonData(request):
    full_name = request.user.get_full_name()
    avatar = TeacherForm.objects.filter(user=request.user.teacher)[0].avatar.url
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


def index(request):
    user = commonData(request)
    return render(request, 'teacher/index.html', {'user': user})


def questions(request):
    user = commonData(request)
    questions_data = {
        'count': Question.objects.all().count(),
        'list': Question.objects.all(),
    }
    if QuestionPack.objects.all().count() == 0:
        pack_pk = 1
    else:
        pack_pk = QuestionPack.objects.last().id + 1
    return render(request, 'teacher/questions.html', {'user': user, 'questions': questions_data, 'pack_pk': pack_pk})


def newQuestion(request):
    if TeacherAccess.objects.filter(teacher=request.user.teacher).exists() and \
            TeacherAccess.objects.filter(teacher=request.user.teacher)[0].add_question_access:
        user = commonData(request)
        pk = request.session['pk']
        del request.session['pk']
        return render(request, 'teacher/new_question.html', {'user': user, 'pk': pk})
    messages.error(request, "شما مجاز به انجام این عملیات نیستید!")
    return HttpResponseRedirect(reverse('teacher:questions'))


def saveGrades(request):
    if request.method == "POST":
        grades = request.POST.getlist('grades[]')
        if len(grades) == 0:
            return JsonResponse({"value": "empty list"})
        else:
            author = request.user.teacher
            question = Question(author=author, grades=grades)
            question.save()
            pk = question.id
            request.session['pk'] = pk
            return JsonResponse({"value": "success", "url": reverse("teacher:newQuestion")})
    else:
        return JsonResponse({"value": "invalid Request"})


def addQuestion(request):
    if request.method == "POST":
        pk = request.POST.get('pk')
        author = request.user.teacher
        body = request.POST.get('body')
        choice1 = request.POST.get('ChoiceVal1')
        choice2 = request.POST.get('ChoiceVal2')
        choice3 = request.POST.get('ChoiceVal3')
        choice4 = request.POST.get('ChoiceVal4')
        is_redirect = request.POST.get('redirect')
        # choice5 = ""
        # print(is_redirect == "tru")
        is_redirect = False
        # if SubGrade.objects.filter(name=request.POST.get('GradeSelect')).exists():
        #     grade = SubGrade.objects.filter(name=request.POST.get('GradeSelect')).first()
        # else:
        grade = ""
        # lesson = request.POST.get('LessonSelect')
        # chapter = request.POST.get('ChapterSelect')
        lesson = None
        chapter = None
        correct_ans = ""
        verbose_ans = request.POST.get('verbose_ans')
        is_publish = False
        if Question.objects.filter(id=pk).exists():
            question = Question.objects.get(id=pk)
            question.body = body
            question.author = author
            question.verbose_ans = verbose_ans
            question.choice_1 = choice1
            question.choice_2 = choice2
            question.choice_3 = choice3
            question.choice_4 = choice4
            question.grade = grade
            question.lesson = lesson
            question.chapter = chapter
            question.is_publish = is_publish
            question.save()
            if not is_redirect:
                return JsonResponse({'success': "update"})
        else:
            return JsonResponse({'success': "Error"})
        messages.success(request, 'successfully add')
        return HttpResponseRedirect(reverse('teacher:questions'))
    else:
        return JsonResponse({'error': 'Invalid Request!'})


def cancelAddQuestion(request, pk):
    if Question.objects.filter(id=pk).exists():
        Question.objects.filter(id=pk).delete()
    messages.success(request, "تغییرات با موفقیت لغو شد!")
    return HttpResponseRedirect(reverse('teacher:questions'))


def selectedQuestion(request):
    if request.method == "POST":
        pack_pk = request.POST.get('pack_pk')
        pk = request.POST.get('pk')
        state = request.POST.get('state')
        teacher = request.user.teacher
        if state == "add":
            if QuestionPack.objects.filter(id=pack_pk).exists():
                question_pack = QuestionPack.objects.get(id=pack_pk)
                question_pack.questions.add(Question.objects.filter(id=pk).first())
                print(question_pack.questions.all())
                return JsonResponse({"value": "success", "type": "add"})
            else:
                question_pack = QuestionPack(teacher=teacher)
                question_pack.save()
                question_pack.questions.add(Question.objects.filter(id=pk).first())
                return JsonResponse({"value": "success", "type": "add"})
        elif state == "remove":
            if QuestionPack.objects.filter(id=pack_pk).exists():
                question_pack = QuestionPack.objects.get(id=pack_pk)
                question_pack.questions.remove(Question.objects.filter(id=pk).first())
                return JsonResponse({"value": "success", "type": "remove"})
        return JsonResponse({"value": "error"})
    elif request.method == "GET":
        pack_pk = request.GET.get('pack_pk')
        if QuestionPack.objects.filter(id=pack_pk).exists():
            question_pack = QuestionPack.objects.get(id=pack_pk)
            selected_questions = serializers.serialize("json", question_pack.questions.all())
            return JsonResponse({"value": "success", "questions": selected_questions})
        else:
            return JsonResponse({"value": "forbidden access"})


def classRoom(request):
    user = commonData(request)
    return render(request, 'teacher/class_room.html', {'user': user})
