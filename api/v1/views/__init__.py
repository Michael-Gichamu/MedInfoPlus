#!/usr/bin/python3
"""Blueprint for API"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.resource import *
from api.v1.views.medical_article import *
from api.v1.views.account import *
from api.v1.views.saved_medical_article import *
