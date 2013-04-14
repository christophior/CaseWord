# Django settings for caseword project.

import os
import os.path
import sys
from caseword.settings_prod import INSTALLED_APPS, TEMPLATE_LOADERS,\
     TEMPLATE_CONTEXT_PROCESSORS, MIDDLEWARE_CLASSES, STATICFILES_FINDERS

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

SITE_ROOT = '/'.join(os.path.dirname(__file__).split('/')[0:-1])

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'databases/caseword.db',                    # Or path to database file if using sqlite3.
    }
}

if 'test' in sys.argv:
        DATABASES['default'] = {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'caseword',
        }
        SOUTH_TESTS_MIGRATE = False

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
MEDIA_ROOT = ''

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://example.com/static/", "http://static.example.com/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    os.path.join(SITE_ROOT, 'static'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)


# Make this unique, and don't share it with anybody.
SECRET_KEY = 'k2n*zhka2b4&&u0w%(z27yy7_k0uok523y&mewxw+q1(h&uoa('

# List of callables that know how to import templates from various sources.

#MIDDLEWARE_CLASSES += (
#    'debug_toolbar.middleware.DebugToolbarMiddleware',
#)

ROOT_URLCONF = 'caseword.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'caseword.wsgi.application'

TEMPLATE_DIRS = (
    os.path.join(SITE_ROOT, 'templates'),
)

#if DEBUG:
#    INSTALLED_APPS += ('debug_toolbar',)

INTERNAL_IPS = ('127.0.0.1',)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
