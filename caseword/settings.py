import os

if os.environ.get('PRODUCTION', False):
    from caseword.settings_prod import *
else:
    #from polarg.settings_prod import *
    from caseword.settings_dev import *