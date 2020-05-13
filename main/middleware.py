import re
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from .models import Student, Teacher, Adviser, Manager

if hasattr(settings, "EXEMPT_URLS"):
    EXEMPT_URLS = [re.compile(url) for url in settings.EXEMPT_URLS]


class AuthRequiredMiddleware(MiddlewareMixin):

    def process_request(self, request):
        print(request.path)
        path = request.path
        if not request.user.is_authenticated:
            if any(url.match(path) for url in EXEMPT_URLS):
                return HttpResponseRedirect(reverse('login'))  # or http response
        else:
            user_type = userType(request.user)
            print("user: " + user_type)
            if any(url.match(path) for url in EXEMPT_URLS):
                print("user is in EXEMPT_URLS")
                if user_type not in path:
                    return HttpResponseRedirect(reverse('notFound'))
        return None


def userType(user):
    if Student.objects.filter(user=user).count():
        return "student"
    elif Teacher.objects.filter(user=user).count():
        return "teacher"
    elif Adviser.objects.filter(user=user).count():
        return "adviser"
    elif Manager.objects.filter(user=user).count():
        return "manager"
    else:
        return "none"
