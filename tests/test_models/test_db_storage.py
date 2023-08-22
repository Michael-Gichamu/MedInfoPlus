#!/usr/bin/python3
"""Holds class TestDBStorage"""
from models.engine.db_storage import DBStorage

class TestDBStorage:
    """Initialazes DBstorage for testing"""
    def __init__(self):
        self.db = DBStorage()
        self.db.reload()

    def setup(self):
        """Create a session"""
        self.db.reload()

    def teardown(self):
        """Close the session to the database"""
        self.db.close()

if __name__ == "__main__":
    tester = TestDBStorage()
    tester.setup()
    tester.teardown()
