#!/usr/bin/python3
"""
Flask route that returns json medicalarticle response
"""
from flask import abort, jsonify, request, send_file
import os
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


@app_views.route('/medicalarticles/<medicalarticle_id>', methods=['GET'])
def get_medicalarticle(medicalarticle_id):
    """
    Retrieves a medical article.
    """
    medicalarticle = storage.get(MedicalArticle, id=medicalarticle_id)
    if medicalarticle is None:
        abort(404, 'Not found')
    try:
        html_file = medicalarticle.content
        medicalarticle.content = medicalarticle.content.strip('"')
        medicalarticle_page = f'/home/ubuntu/MedInfoPlus/MedicalArticle_pages/{medicalarticle.content}'
        with open(medicalarticle_page, 'r') as file:
            html_content = file.read()
            medicalarticle.content = html_content
    except FileNotFoundError:
        abort(404, 'HTML file not found')

    medicalarticle.query_count += 1
    medicalarticle_data = medicalarticle.to_dict()
    medicalarticle.content = html_file
    storage.save()

    return jsonify(medicalarticle_data)


@app_views.route('/medicalarticles/toparticles', methods=['GET'])
def get_top_medicalarticles():
    """Get and sort medicalarticles based on query count"""
    medicalarticles_list = []
    medicalarticles = storage.all(MedicalArticle)
    medicalarticles = sorted(medicalarticles.values(), key=lambda x: x.query_count, reverse=True)
    for medicalarticle in medicalarticles:
        medicalarticles_list.append(medicalarticle.to_dict())

    return jsonify(medicalarticles_list)

  
@app_views.route('/medicalarticles/<medicalarticle_id>/categories/medicalarticles', methods=['GET'])
def get_medicalarticles_of_category(medicalarticle_id):
    """
    Get medicalarticles of the same category.
    """
    medicalarticle = storage.get(MedicalArticle, id=medicalarticle_id)
    if medicalarticle is None:
        abort(404, 'Not found')
    medical_articles = storage.all(MedicalArticle)
    category_medical_articles = [medical_article.to_dict()
                                 for medical_article in medical_articles.values()
                                 if medical_article.category == medicalarticle.category]
    return jsonify(category_medical_articles)

@app_views.route('/medicalarticles/<medicalarticle_id>/resource/medicalarticles', methods=['GET'])
def get_medicalarticles_of_resource(medicalarticle_id):
    """
    Get medicalarticles of the same resource.
    """
    medicalarticle = storage.get(MedicalArticle, id=medicalarticle_id)
    if medicalarticle is None:
        abort(404, 'Not found')
    medical_articles = storage.all(MedicalArticle)
    resource_medical_articles = [medical_article.to_dict()
                                 for medical_article in medical_articles.values()
                                 if medical_article.resource_Id == medicalarticle.resource_Id]
    return jsonify(resource_medical_articles)
