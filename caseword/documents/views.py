from caseword.documents.models import Brief
from django.shortcuts import render_to_response, redirect, render
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

def edit_brief(request, brief_id):
    """Edit a Brief"""
    brief = Brief.objects.get(id = brief_id)
    context = {
        'brief': brief,
    }
    return render_to_response('documents/edit_brief.html', context)


def save_brief(request, brief_id):
    """Save a Brief to the database"""
    brief = Brief.objects.get(id = brief_id)
    brief.text = request.POST.get('text', '')
    brief.save()
    return HttpResponse('')

