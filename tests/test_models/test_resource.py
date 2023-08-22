#!/usr/bin/python3
"""
Contains test for Resource Class.
"""
import unittest
import models
from models.resource import Resource
from models.base_model import BaseModel
from models.medical_article import MedicalArticle
from tests.test_models.test_db_storage import TestDBStorage

class TestResource(unittest.TestCase):
    """Test Resource Class"""
    def setUp(self):
        """Common setup for all test methods"""
        self.resource = Resource()

    def test_is_subclass(self):
        """Test that Resource is a subclass of BaseModel"""
        self.assertIsInstance(self.resource, BaseModel)
        self.assertTrue(hasattr(self.resource, "id"))
        self.assertTrue(hasattr(self.resource, "created_at"))
        self.assertTrue(hasattr(self.resource, "updated_at"))

    def test_name_attr(self):
        """Test that Resource has attribute name and its none"""
        self.assertTrue(hasattr(self.resource, "name"))
        self.assertEqual(self.resource.name, None)

    def test_medical_articles_attr(self):
        """Test that Resource has attribute medical_articles and its none"""
        self.assertTrue(hasattr(self.resource, "medical_articles"))
        self.assertEqual(self.resource.medical_articles, [])

    def test_create_resource(self):
        """Test the mapping of instance data to database"""
        self.tester = TestDBStorage()
        self.tester.setup()

        resource_data = {
            'name': 'SampleResource'
        }
        resource_sample = Resource(**resource_data)
        self.tester.db.new(resource_sample)
        self.tester.db.save()
        self.tester.db.reload()

        article_data = {
            'title': 'SampleArticle',
            'category': 'Health',
            'resource_Id': '{}'.format(resource_sample.id)
        }
        article = MedicalArticle(**article_data)
        self.tester.db.new(article)

        article_data1 = {
            'title': 'SampleArticle1',
            'category': 'Health',
            'resource_Id': '{}'.format(resource_sample.id)
        }
        article1 = MedicalArticle(**article_data1)
        self.tester.db.new(article1)

        self.tester.db.save()
        self.tester.db.reload()

        fetched_resource = self.tester.db._DBStorage__session.query(Resource).filter_by(name='SampleResource').first()
        self.assertIsNotNone(fetched_resource)

        medical_articles_length = self.tester.db._DBStorage__session.query(MedicalArticle). \
            join(Resource).filter(Resource.name == 'SampleResource').count()
        self.assertEqual(medical_articles_length, 2)


if __name__ == '__main__':
    unittest.main()
