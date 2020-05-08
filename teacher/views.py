from django.http import JsonResponse
from django.shortcuts import render
from .models import TeacherForm, Question
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
    pk = Question.objects.last().id + 1
    return render(request, 'teacher/new_question.html', {'user': user, 'pk': pk})


def addQuestion(request):
    if request.method == "POST":
        pk = request.POST.get('pk')
        author = request.user.teacher
        body = request.POST.get('body')
        choice1 = ""
        choice2 = ""
        choice3 = ""
        choice4 = ""
        choice5 = ""
        correct_ans = ""
        verbose_ans = request.POST.get('verbose_ans')
        is_publish = False
        if Question.objects.filter(id=pk).exists():
            question = Question.objects.get(id=pk)
            question.body = body
            question.author = author
            question.verbose_ans = verbose_ans
            question.is_publish = is_publish
            question.save()
            return JsonResponse({'success': "update"})
        else:
            question = Question(body=body, is_publish=is_publish, author=author, verbose_ans=verbose_ans)
            question.save()
            return JsonResponse({'success': "new"})
    else:
        return JsonResponse({'error': 'Invalid Request!'})
