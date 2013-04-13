from django.db import models
from django.contrib.auth.models import User

class Brief(models.Model):
    title = models.CharField(max_length = 140)
    author = models.ForeignKey(User)
    text = models.TextField(default = '')
    legal_venue = models.CharField(max_length = 140)

