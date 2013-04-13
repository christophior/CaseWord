from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from caseword import views
from caseword import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns()
