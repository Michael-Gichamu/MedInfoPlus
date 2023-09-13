#!/usr/bin/python3
"""Class MedicalArticle"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer, Text


class MedicalArticle(BaseModel, Base):
    """Representation of medicalarticle"""
    __tablename__ = 'medicalarticle'
    title = Column(String(60), nullable=False)
    category = Column(String(60), nullable=False)
    query_count = Column(Integer, nullable=False, default=0)
    summary = Column(String(400), nullable=True)
    image = Column(String(60), nullable=True)
    content = Column(Text, nullable=False)
    resource_Id = Column(String(60), ForeignKey('resource.id', ondelete="CASCADE"), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
