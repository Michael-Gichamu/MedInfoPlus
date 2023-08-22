#!/usr/bin/python3
"""Test BaseModel Class"""
from datetime import datetime, timedelta
import models
import unittest
import uuid
from models.base_model import BaseModel


class TestBaseModel(unittest.TestCase):
    """Test the BaseModel class."""
    def setUp(self):
        """Common setup for all test methods"""
        self.base_model = BaseModel()
        self.base_model.name = "MedInfoPlus"
        self.base_model.description = "Test for Class"
        self.base_model2 = BaseModel()

    def test_instatiation(self):
        """Test Object correctly created"""
        self.assertIs(type(self.base_model), BaseModel)
        attrs_types = {
            "id": str,
            "created_at": datetime,
            "updated_at": datetime,
            "name": str,
            "description": str
        }
        for attr, typ in attrs_types.items():
            with self.subTest(attr=attr, typ=typ):
                self.assertIn(attr, self.base_model.__dict__)
                self.assertIs(type(self.base_model.__dict__[attr]), typ)
        self.assertEqual(self.base_model.name, "MedInfoPlus")
        self.assertEqual(self.base_model.description, "Test for Class")

    def test_datetime_attributes(self):
        """Test datetime objects"""
        self.base_model.created_at = self.base_model2.created_at = datetime.utcnow()
        current_time = datetime.utcnow()
        tolerance = timedelta(seconds=1)
        self.assertAlmostEqual(self.base_model.created_at, current_time, delta=tolerance)
        self.assertAlmostEqual(self.base_model.updated_at, current_time, delta=tolerance)
        self.assertEqual(self.base_model.created_at, self.base_model2.created_at)
        self.assertAlmostEqual(self.base_model.updated_at, self.base_model2.updated_at, delta=tolerance)

    def test_uuid(self):
        """Test that id is a valid uuid"""
        self.assertIsInstance(self.base_model.id, str)
        self.assertTrue(uuid.UUID(self.base_model.id, version=4))
        self.assertNotEqual(self.base_model.id, self.base_model2.id)

    def test_to_dict(self):
        """Test Object attributes conversion to dictionary"""
        time = "%Y-%m-%dT%H:%M:%S.%f"
        test_dict = self.base_model.to_dict()
        expected_attrs = ["id",
                          "created_at",
                          "updated_at",
                          "name",
                          "description",
                          "__class__"]
        self.assertCountEqual(test_dict.keys(), expected_attrs)
        self.assertEqual(test_dict['__class__'], 'BaseModel')
        self.assertEqual(test_dict['name'], "MedInfoPlus")
        self.assertEqual(test_dict['description'], "Test for Class")
        self.assertEqual(test_dict["created_at"], self.base_model.created_at.strftime(time))
        self.assertEqual(test_dict["updated_at"], self.base_model.updated_at.strftime(time))

    def test_str(self):
        """Test the __str__ method"""
        string = "[BaseModel] ({}) {}".format(self.base_model.id, self.base_model.__dict__)
        self.assertEqual(string, str(self.base_model))
