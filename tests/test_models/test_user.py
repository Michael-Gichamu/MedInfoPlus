#!/usr/bin/python3
"""
Contains test for User Class.
"""
import unittest
import models
from models.base_model import BaseModel
from models.user import User
from models.resource import Resource
from models.medical_article import MedicalArticle
from models.saved_medical_article import SavedMedicalArticle
from tests.test_models.test_db_storage import TestDBStorage


class TestUser(unittest.TestCase):
    """Test User Class."""
    def setUp(self):
        """Common setup for all test methods"""
        self.user = User()

    def test_is_subclass(self):
        """Test that User is a subclass of BaseModel"""
        self.assertIsInstance(self.user, BaseModel)
        self.assertTrue(hasattr(self.user, "id"))
        self.assertTrue(hasattr(self.user, "created_at"))
        self.assertTrue(hasattr(self.user, "updated_at"))

    def test_name(self):
        """Test that User has attribute name and its none"""
        self.assertTrue(hasattr(self.user, "name"))
        self.assertEqual(self.user.name, None)

    def test_email_attr(self):
        """Test that User has attribute email and its none"""
        self.assertTrue(hasattr(self.user, "email"))
        self.assertEqual(self.user.email, None)

    def test_password_attr(self):
        """Test that User has attribute _password and its none"""
        self.assertTrue(hasattr(self.user, "_password"))
        self.assertEqual(self.user._password, None)

    def test_saved_medicalarticles_attr(self):
        """Test that User has attribute saved_medicalarticles and its none"""
        self.assertTrue(hasattr(self.user, "saved_medicalarticles"))
        self.assertEqual(self.user.saved_medicalarticles, [])
    
    def test_create_user(self):
        """Test the mapping of instance data to database"""
        self.tester = TestDBStorage()
        self.tester.setup()

        test_user = User()
        test_user.name = "Tester"
        test_user.email = "test@example.com"
        test_user.password = "testpwd"
        self.tester.db.new(test_user)

        resource_data = {
            'name': 'Sample Resource',
            'medical_type': 'sample type',
            'image': 'Sample_Resource.jpg'
        }
        resource_sample = Resource(**resource_data)
        self.tester.db.new(resource_sample)
        self.tester.db.save()
        self.tester.db.reload()

        article_data = {
            'title': 'SampleArticle',
            'category': 'SampleCategory',
            'summary': 'Sample has a summary',
            'image': 'samplearticle.jpg',
            'content': '<h1>This is a sample content of a medicalarticle</h1>',
            'resource_Id': '{}'.format(resource_sample.id)
        }
        article = MedicalArticle(**article_data)
        self.tester.db.new(article)

        article_data1 = {
            'title': 'SampleArticle1',
            'category': 'SampleCategory1',
            'summary': 'Sample1 has a summary',
            'image': 'samplearticle1.jpg',
            'content': '<h1>This is a sample content of a medicalarticle1</h1>',
            'resource_Id': '{}'.format(resource_sample.id)
        }
        article1 = MedicalArticle(**article_data1)
        self.tester.db.new(article1)

        self.tester.db.save()
        self.tester.db.reload()
        
        saved_medicalarticles_data = {
            'saved_medicalarticle_id': '{}'.format(article.id),
            'user_Id': '{}'.format(test_user.id)
        }
        saved_medicalarticles_data1 = {
            'saved_medicalarticle_id': '{}'.format(article1.id),
            'user_Id': '{}'.format(test_user.id)
        }

        saved_medicalarticle = SavedMedicalArticle(**saved_medicalarticles_data)
        saved_medicalarticle1 = SavedMedicalArticle(**saved_medicalarticles_data1)
        self.tester.db.new(saved_medicalarticle)
        self.tester.db.new(saved_medicalarticle1)
        self.tester.db.save()
        self.tester.db.reload()

        fetched_test_user = self.tester.db._DBStorage__session.query(User).filter_by(email="test@example.com").first()

        self.assertIsNotNone(fetched_test_user)
        self.assertTrue(fetched_test_user.name == "Tester")
        self.assertTrue(fetched_test_user.check_password("testpwd"))
        
        saved_medicalarticles_length = self.tester.db._DBStorage__session.query(SavedMedicalArticle). \
            join(User).filter(User.name == 'Tester').count()
        self.assertEqual(saved_medicalarticles_length, 2)


if __name__ == '__main__':
    unittest.main()
