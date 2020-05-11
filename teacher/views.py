from django.http import JsonResponse
from django.shortcuts import render
from .models import TeacherForm, Question
from manager.models import SubGrade
from main.models import Message, Notification


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
    return render(request, 'teacher/questions.html', {'user': user})


def newQuestion(request):
    user = commonData(request)
    if Question.objects.count() == 0:
        pk = 1
    else:
        pk = Question.objects.last().id + 1
    grades = SubGrade.objects.all()
    return render(request, 'teacher/new_question.html', {'user': user, 'pk': pk, 'grades': grades})


def addQuestion(request):
    if request.method == "POST":
        pk = request.POST.get('pk')
        author = request.user.teacher
        body = request.POST.get('body')
        choice1 = request.POST.get('ChoiceVal1')
        choice2 = request.POST.get('ChoiceVal2')
        choice3 = request.POST.get('ChoiceVal3')
        choice4 = request.POST.get('ChoiceVal4')
        # choice5 = ""
        if SubGrade.objects.filter(name=request.POST.get('GradeSelect')).exists():
            grade = SubGrade.objects.filter(name=request.POST.get('GradeSelect')).first()
        else:
            grade = None
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
            return JsonResponse({'success': "update"})
        else:
            question = Question(body=body, is_publish=is_publish, author=author, verbose_ans=verbose_ans,
                                choice_1=choice1, choice_2=choice2, choice_3=choice3, choice_4=choice4,
                                correct_ans=correct_ans, grade=grade, lesson=lesson, chapter=chapter)
            question.save()
            return JsonResponse({'success': "new"})
    else:
        return JsonResponse({'error': 'Invalid Request!'})
