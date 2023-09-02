#!/usr/bin/python3
"""Class SavedMedicalArticle"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class SavedMedicalArticle(BaseModel, Base):
    """Representation of saved_medicalarticle"""
    __tablename__ = 'saved_medicalarticle'
    saved_medicalarticle_id = Column(String(60), nullable=False)
    user_Id = Column(String(60), ForeignKey('user.id', ondelete="CASCADE"), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)
