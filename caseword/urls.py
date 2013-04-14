from django.conf.urls import patterns, include, url
from caseword import views
from caseword.documents import views as documents_views
from caseword.presentation_iframe import views as presentation_views

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
    url(r'^iframe/(\w+)/$', presentation_views.iframe_view, name = 'iframe_view'),
    url(r'^admin/', include(admin.site.urls)),
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
)

#urlpatterns += staticfiles_urlpatterns()
