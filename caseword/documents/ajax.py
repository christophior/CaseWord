from django.utils import simplejson
from dajaxice.decorators import dajaxice_register

@dajaxice_register(name = 'save_brief')
def save_brief(request, text):
    return simplejson.dumps({'message': 'We will get this %s eventually!' % text})