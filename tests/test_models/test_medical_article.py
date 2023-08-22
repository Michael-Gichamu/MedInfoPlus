#!/usr/bin/python3
"""
Contains tests for MedicalArticle class.
"""
from datetime import datetime
import models
from tests.test_models.test_db_storage import TestDBStorage
from models.medical_article import MedicalArticle
from models.resource import Resource
from models.base_model import BaseModel
import unittest


class TestMedicalArticle(unittest.TestCase):
    """Test MedicalArticle class"""
    def setUp(self):
        """Common setup for all test methods"""
        self.medicalarticle = MedicalArticle()

    def test_is_subclass(self):
        """Test that City is a subclass of BaseModel"""
        self.assertIsInstance(self.medicalarticle, BaseModel)
        self.assertTrue(hasattr(self.medicalarticle, "id"))
        self.assertTrue(hasattr(self.medicalarticle, "created_at"))
        self.assertTrue(hasattr(self.medicalarticle, "updated_at"))
 
    def test_title_attr(self):
        """Test that MedicalArticle has attribute title and its none"""
        self.assertTrue(hasattr(self.medicalarticle, "title"))
        self.assertEqual(self.medicalarticle.title, None)

    def test_category_attr(self):
        """Test that MedicalArticle has attribute category and its none"""
        self.assertTrue(hasattr(self.medicalarticle, "category"))
        self.assertEqual(self.medicalarticle.category, None)

    def test_resource_Id_attr(self):
        """Test that MedicalArticle has attribute resource_Id and its none"""
        self.assertTrue(hasattr(self.medicalarticle, "resource_Id"))
        self.assertEqual(self.medicalarticle.resource_Id, None)

    def test_create_medical_article(self):
        """Test the mapping of instance data to database"""
        self.tester = TestDBStorage()
        self.tester.setup()
        
        resource_data = {
            'name': 'SampleResource'
        }
        resource = Resource(**resource_data)
        self.tester.db.new(resource)
        self.tester.db.save()
        self.tester.db.reload()

        article_data = {
            'title': 'SampleArticle',
            'category': 'Health',
            'resource_Id': '{}'.format(resource.id)
        }
        article = MedicalArticle(**article_data)
        self.tester.db.new(article)
        self.tester.db.save()
        self.tester.db.reload()

        fetched_article = self.tester.db._DBStorage__session.query(MedicalArticle).filter_by(title='SampleArticle').first()
        self.assertIsNotNone(fetched_article)
        self.assertEqual(fetched_article.category, 'Health')
        self.assertEqual(fetched_article.resource_Id, resource.id)

        self.tester.teardown()

if __name__ == '__main__':
    unittest.main()
