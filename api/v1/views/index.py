#!/usr/bin/python3
"""Index route"""
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.medical_article import MedicalArticle
from models.resource import Resource

classes = {"MedicalArticle": MedicalArticle, "Resource": Resource}

@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """Returns status of API"""
    return jsonify({"status": "OK"})

@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def stats():
    """retrieves the number of each objects by type"""

    count_objs = {}
    for obj, clss in classes.items():
        count_objs[obj] = storage.count(clss)

    return jsonify(count_objs)
