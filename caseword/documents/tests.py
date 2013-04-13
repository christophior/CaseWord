"""
Tests for the documents app
"""

from django.contrib.auth.models import User
from django.test import TestCase
from caseword.documents.models import Brief

class TestBriefAPI(TestCase):
    def setUp(self):
        self.author = User.objects.create_user('testuser', 'test@gmail.com',\
            'testpwd')
        self.brief = Brief.objects.create(title = 'Test title',\
            author = self.author)

    def test_save(self):
        response = self.client.post('/save/{0}/'.format(self.brief.id),\
            {'text': 'Test text'})
        self.assertEqual(response.status_code, 200)
        brief = Brief.objects.get(id = self.brief.id)
        self.assertEqual(brief.text, 'Test text')


    def tearDown(self):
        pass
