from django.shortcuts import render_to_response, redirect, render
from django.http import HttpResponse, Http404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required


def home(request):
    return render_to_response('home.html', {})



