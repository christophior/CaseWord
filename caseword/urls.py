from django.conf.urls import patterns, include, url
from caseword import views
from caseword.documents import views as documents_views

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
admin.autodiscover()

from dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^save/([0-9]+)/$', documents_views.save_brief, name = 'save_brief'),
    url(r'^edit/([0-9]+)/$', documents_views.edit_brief, name = 'edit_brief'),
    url(r'^show_all/$', documents_views.BriefListView.as_view(),\
        name = 'brief_list'),
    url(r'^admin/', include(admin.site.urls)),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)

#urlpatterns += staticfiles_urlpatterns()
