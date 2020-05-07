import re
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings

if hasattr(settings, "EXEMPT_URLS"):
    EXEMPT_URLS = [re.compile(url) for url in settings.EXEMPT_URLS]

class AuthRequiredMiddleware(MiddlewareMixin):

    def process_request(self, request):
        print(request.path)
        path = request.path
        if not request.user.is_authenticated:
            if any(url.match(path) for url in EXEMPT_URLS):
                return HttpResponseRedirect(reverse('login'))  # or http response
        return None
