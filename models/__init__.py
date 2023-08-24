#!/usr/bin/python3
"""
Initialize Models package
"""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
