from django.conf.urls import patterns, include, url
from caseword import views
from caseword.documents import views as documents_views

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^save/([0-9]+)/$', documents_views.save_brief, name = 'save_brief'),
    url(r'^admin/', include(admin.site.urls)),
)
