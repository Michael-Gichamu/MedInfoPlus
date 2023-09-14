#!/usr/bin/python3
"""
Flask route that returns json resource response
"""
from api.v1.views import app_views
from flask import abort, jsonify, request, g, send_from_directory
import os
from models import storage
from models.resource import Resource
from models.medical_article import MedicalArticle

@app_views.route('/resources', methods=['GET'])
def get_resources():
    """
    Retrieves all resources.
    """
    resources_list = []
    resources = storage.all(Resource)

    for resource in resources.values():
        resources_list.append(resource.to_dict())

    return jsonify(resources_list)


@app_views.route('/resources/<resource_id>', methods=['GET'])
def get_resource(resource_id):
    """
    Retrieves resource based on the name.
    """
    resource = storage.get(Resource, id=resource_id)
    if resource is None:
        abort(404, 'Not found')
    return jsonify(resource.to_dict())


@app_views.route('/resources/medicaltypes', methods=['GET'])
def get_resources_medicaltype():
    resources = storage.all(Resource)
    medical_type_resources = {}
    for resource in resources.values():
        medical_type = resource.medical_type
        if medical_type not in medical_type_resources:
            medical_type_resources[medical_type] = []
        medical_type_resources[medical_type].append(resource.to_dict())

    return jsonify(medical_type_resources)
    

@app_views.route('/resources/<resource_id>/medicalarticles', methods=['GET'])
def get_resource_medicalarticles(resource_id):
    """
    Retrieves medical articles of a Resource.
    """
    resource = storage.get(Resource, id=resource_id)
    if resource is None:
        abort(404, 'Not found')
    medical_articles = storage.all(MedicalArticle)

    def replace_newline_with_line_break(medical_article):
        medical_article_dict = medical_article.to_dict()
        medical_article_dict['content'] = medical_article_dict['content'].replace('\n', '<br>')
        return medical_article_dict
    resource_medical_articles = [
        replace_newline_with_line_break(medical_article)
        for medical_article in medical_articles.values()
        if medical_article.resource_Id == resource.id
    ]
    return jsonify(resource_medical_articles)


@app_views.route('/resources/<resource_id>/category/medicalarticles', methods=['GET'])
def get_category_medicalarticles(resource_id):
    """
    Retrieves medical articles of a resource based on category.
   """
    resource = storage.get(Resource, id=resource_id)
    if resource is None:
        abort(404, 'Not found')
    medical_articles = storage.all(MedicalArticle)
    category_medical_articles = []

    articles_by_category = {}
    for medical_article in medical_articles.values():
        if medical_article.resource_Id == resource.id:
            category = medical_article.category
            if category not in articles_by_category:
                articles_by_category[category] = []
            articles_by_category[category].append(medical_article.to_dict())

    for category, articles in articles_by_category.items():
        category_data = {category: articles}
        category_medical_articles.append(category_data)

    return jsonify(category_medical_articles)
