from django.shortcuts import render
from main.models import Notification, Message


# Create your views here.
def index(request):
    full_name = request.user.get_full_name()
    has_message = Message.objects.filter(user=request.user, is_seen=False).exists()
    has_notification = Notification.objects.filter(user=request.user, is_seen=False).exists()
    user = {
        'full_name': full_name,
        'has_message': has_message,
        'has_notification': has_notification,

    }
    return render(request, 'student/index.html', {'user': user})
