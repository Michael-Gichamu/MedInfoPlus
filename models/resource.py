#!/usr/bin/python3
"""Holds class Resource"""
import models
from models.base_model import BaseModel, Base
from models.medical_article import MedicalArticle
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Resource(BaseModel, Base):
    """Representation of resource"""
    __tablename__ = 'resource'
    name = Column(String(60), nullable=False)
    medical_type = Column(String(60), nullable=False)
    image = Column(String(60), nullable=False)
    medical_articles = relationship('MedicalArticle', backref='resource', cascade='all, delete-orphan')

    def __init__(self, *args, **kwargs):
        """initializes resource"""
        super().__init__(*args, **kwargs)
