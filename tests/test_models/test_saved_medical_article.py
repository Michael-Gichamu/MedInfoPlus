#!/usr/bin/python3
"""
Contains tests for SavedMedicalArticle class.
"""
from datetime import datetime
import models
from tests.test_models.test_db_storage import TestDBStorage
from models.base_model import BaseModel
from models.resource import Resource
from models.medical_article import MedicalArticle
from models.user import User
from models.saved_medical_article import SavedMedicalArticle
import unittest


class TestSavedMedicalArticle(unittest.TestCase):
    """Test SavedMedicalArticle class"""
    def setUp(self):
        """Common setup for all test methods"""
        self.saved_medicalarticle = SavedMedicalArticle()

    def test_is_subclass(self):
        """Test that SavedMedicalArticle is a subclass of BaseModel"""
        self.assertIsInstance(self.saved_medicalarticle, BaseModel)
        self.assertTrue(hasattr(self.saved_medicalarticle, "id"))
        self.assertTrue(hasattr(self.saved_medicalarticle, "created_at"))
        self.assertTrue(hasattr(self.saved_medicalarticle, "updated_at"))

    def test_saved_medicalarticle_id_attr(self):
        """Test that SavedMedicalArticle has attribute saved_medicalarticle_id and its none."""
        self.assertTrue(hasattr(self.saved_medicalarticle, "saved_medicalarticle_id"))
        self.assertEqual(self.saved_medicalarticle.saved_medicalarticle_id, None)

    def test_user_Id_attr(self):
        """Test that SavedMedicalArticle has attribute user_Id and its none."""
        self.assertTrue(hasattr(self.saved_medicalarticle, "user_Id"))
        self.assertEqual(self.saved_medicalarticle.user_Id, None)

    def test_create_saved_medicalarticle(self):
        """Test the mapping of instance data to database."""
        self.tester = TestDBStorage()
        self.tester.setup()

        resource_data = {
            'name': 'Sample Resource',
            'medical_type': 'sample type'
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
            'resource_Id': '{}'.format(resource_sample.id)
        }
        article = MedicalArticle(**article_data)
        self.tester.db.new(article)
        
        test_user = User()
        test_user.name = "Tester"
        test_user.email = "test@example.com"
        test_user.password = "testpwd"
        self.tester.db.new(test_user)

        saved_medicalarticle_data = {
            'saved_medicalarticle_id': '{}'.format(article.id),
            'user_Id': '{}'.format(test_user.id)
        }
        saved_medicalarticle = SavedMedicalArticle(**saved_medicalarticle_data)
        self.tester.db.new(saved_medicalarticle)
        self.tester.db.save()
        self.tester.db.reload()

        fetched_saved_medicalarticle = self.tester.db._DBStorage__session.query(SavedMedicalArticle).filter_by(user_Id=test_user.id).first()
        self.assertIsNotNone(fetched_saved_medicalarticle)
        self.assertEqual(fetched_saved_medicalarticle.saved_medicalarticle_id, article.id)
        self.tester.teardown()


if __name__ == '__main__':
    unittest.main()
