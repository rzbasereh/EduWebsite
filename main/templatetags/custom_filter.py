from django import template
from teacher.models import ReportAttach

register = template.Library()


@register.filter(name='has_attachment')
def has_attachment(value, arg):
    if arg == "report":
        attachments = ReportAttach.objects.filter(report=value).count()
        return attachments
    return False
