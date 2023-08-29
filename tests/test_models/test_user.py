#!/usr/bin/python3
"""
Contains test for User Class.
"""
import unittest
import models
from models.base_model import BaseModel
from models.user import User
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

    def test_email_attr(self):
        """Test that User has attribute email and its none"""
        self.assertTrue(hasattr(self.user, "email"))
        self.assertEqual(self.user.email, None)

    def test_password_attr(self):
        """Test that User has attribute _password and its none"""
        self.assertTrue(hasattr(self.user, "_password"))
        self.assertEqual(self.user._password, None)

    def test_account_type_attr(self):
        """Test that User has attribute account_type and its none"""
        self.assertTrue(hasattr(self.user, "account_type"))
        self.assertEqual(self.user.account_type, None)

    
    def test_create_user(self):
        """Test the mapping of instance data to database"""
        self.tester = TestDBStorage()
        self.tester.setup()

        test_user = User()
        test_user.email = "test@example.com"
        test_user.password = "testpwd"
        self.tester.db.new(test_user)
        self.tester.db.save()
        self.tester.db.reload()

        fetched_test_user = self.tester.db._DBStorage__session.query(User).filter_by(email="test@example.com").first()
        self.assertIsNotNone(fetched_test_user)
        self.assertTrue(fetched_test_user.check_password("testpwd"))
        self.assertEqual(fetched_test_user.account_type, "patient")

if __name__ == '__main__':
    unittest.main()
