from django import template

register = template.Library()


@register.filter(name='divide')
def divide(value, arg):
    result = int(value / arg)
    if not value % arg == 0:
        result += 1
    return range(result)
