from django.shortcuts import render_to_response, redirect, render
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

def iframe_view(request, template_string):
    """Presentation iframe vire"""
    template = 'presentation_iframe/{0}.html'.format(template_string)
    return render_to_response(template, {})

