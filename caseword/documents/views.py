from caseword.documents.models import Brief
from django.http import HttpResponse

def edit_brief(request, brief_id):
    brief = Brief.objects.get(id = brief_id)
    context = {
        'brief': brief,
    }
    return render('documents/edit_brief.html', context)


def save_brief(request, brief_id):
    """Save a Brief to the database"""
    brief = Brief.objects.get(id = brief_id)
    brief.text = request.POST.get('text', '')
    brief.save()
    return HttpResponse('')

