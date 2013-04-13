from django.utils import simplejson
from dajaxice.decorators import dajaxice_register

@dajaxice_register
def save_brief(request):
    """Save a Brief to the database"""
    print 'here'
    print request
    if brief_id:
        brief = Brief.objects.get(id = brief_id)
        brief.text = request.POST.get('text', '')
        brief.save()
    else:
        brief = Brief.objects.create(title = title,
            author = request.user,
            text = text)
    return simplejson.dumps({'error': False})
