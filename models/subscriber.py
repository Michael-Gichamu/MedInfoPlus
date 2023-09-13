#!/usr/bin/python3
"""
Contains class Subscriber.
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text

class Subscriber(BaseModel, Base):
    """Representation of Subscriber."""
    __tablename__ = 'subscriber'
    email = Column(String(120), unique=True, nullable=False)
