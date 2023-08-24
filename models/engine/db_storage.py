#!/usr/bin/python3
"""
Contains the class DBStorage
"""
import models
from models.base_model import BaseModel, Base
from models.medical_article import MedicalArticle
from models.resource import Resource
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"MedicalArticle": MedicalArticle, "Resource": Resource}


class DBStorage:
    """
    Interacts and performs CRUD with the MySQL Database.
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Instatiate a DBStorage Object,
        Create a database engine.
        """
        MedInfoPlus_MYSQL_USER = getenv('MedInfoPlus_MYSQL_USER')
        MedInfoPlus_MYSQL_PWD = getenv('MedInfoPlus_MYSQL_PWD')
        MedInfoPlus_MYSQL_HOST = getenv('MedInfoPlus_MYSQL_HOST')
        MedInfoPlus_MYSQL_DB = getenv('MedInfoPlus_MYSQL_DB')
        MedInfoPlus_ENV = getenv('MedInfoPlus_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(MedInfoPlus_MYSQL_USER,
                                             MedInfoPlus_MYSQL_PWD,
                                             MedInfoPlus_MYSQL_HOST,
                                             MedInfoPlus_MYSQL_DB))
        if MedInfoPlus_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """Query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """A method to retrieve one object"""
        try:
            """
            Kwargs Case:
            if cls == classes['Resource']:
                name = kwargs.get('name')
                obj = self.__session.query(cls).filter(cls.name == name).first()
            elif cls == classes['MedicalArticle']:
                title = kwargs.get('title')
                obj = self.__session.query(cls).filter(cls.title == title).first()
            """
            obj = self.__session.query(cls).filter(cls.id == id).first()
            return obj
        except Exception as e:
            return None

    def count(self, cls=None):
        """A method to count the number of objects in storage"""

        if cls:
            count = self.__session.query(cls).count()
        else:
            count = 0;
            for clss in classes.values():
                count += self.__session.query(clss).count()
        return count
