#!/usr/bin/python3
"""
Flask route that returns json medicalarticle response
"""
from flask import request
from api.v1.views import app_views
from models import storage
from models.medical_article import MedicalArticle

@app_views.route('/medicalarticles', methods=['GET'])
def get_medicalarticles():
    """
    Retrieves all medicalarticles.
    """
    medicalarticles_list = []
    medicalarticles = storage.all(MedicalArticle)

    for medicalarticle in medicalarticles.values():
        medicalarticles_list.append(medicalarticle.to_dict())

    return jsonify(medicalarticles_list)


@app_views.route('/medicalarticles/<medicalarticle_name>', methods=['GET'])
def get_medicalarticle(medicalarticle_name):
    """
    Retrieves a medical article.
    """
    medicalarticle_name = medicalarticle_name.replace(' ', '')
    medicalarticle = storage.get(MedicalArticle, name=medicalarticle_name)
    if medicalarticle is None:
        abort(404, 'Not found')
    return jsonify(medical_article.to_dict())


@app_views.route('/medicalarticles/<article_name>/categories/medicalarticles', methods=['GET'])
    medicalarticle_name = medicalarticle_name.replace(' ', '')
    medicalarticle = storage.get(MedicalArticle, name=medicalarticle_name)
    if medicalarticle is None:
        abort(404, 'Not found')
@app_views.route('/medicalarticles/<article_name>/resource/medicalarticles', methods=['GET'))
