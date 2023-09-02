#!/usr/bin/python3
"""
Contains class User.
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Text
from werkzeug.security import generate_password_hash, check_password_hash
from models.saved_medical_article import SavedMedicalArticle
from sqlalchemy.orm import relationship

class User(BaseModel, Base):
    """Representation of User."""
    __tablename__ = 'user'
    name = Column(String(60), nullable=False)
    email = Column(String(120), nullable=False)
    _password = Column(Text, nullable=False)
    saved_medicalarticles = relationship('SavedMedicalArticle', backref='resource', cascade='all, delete-orphan')

    def __init__(self, *args, **kwargs):
        """initializes resource"""
        super().__init__(*args, **kwargs)

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plain_password):
        self._password = generate_password_hash(plain_password, method='scrypt')

    def check_password(self, plain_password):
        return check_password_hash(self._password, plain_password)
