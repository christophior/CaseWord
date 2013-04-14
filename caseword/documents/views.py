from caseword.documents.models import Brief
from caseword.settings import SITE_ROOT
from django.views.generic import ListView
from django.shortcuts import render_to_response, redirect, render
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

def edit_brief(request, brief_id):
    """Edit a Brief"""
    brief = Brief.objects.get(id = brief_id)
    context = {
        'brief': brief,
        'SITE_ROOT': SITE_ROOT,
    }
    return render_to_response('documents/edit_brief.html', context)

@csrf_exempt
def save_brief(request, brief_id = None, title = 'Untitled'):
    """Save a Brief to the database"""
    if brief_id:
        brief = Brief.objects.get(id = brief_id)
        print request.POST
        text = request.POST.get('text', '')
        print text
        brief.text = text
        brief.save()
    else:
        brief = Brief.objects.create(title = title,
            author = request.user,
            text = text)
    return HttpResponse('')

class BriefListView(ListView):
    model = Brief
    context_object_name = 'brief_list'
