#!/usr/bin/python3
"""
Flask route that returns json resource response
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
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


@app_views.route('/resources/<resource_name>', methods=['GET'])
def get_resource(resource_name):
    """
    Retrieves resource based on the name.
    """
    resource_name = resource_name.replace(' ', '')
    resource = storage.get(Resource, name=resource_name)
    if resource is None:
        abort(404, 'Not found')
    return jsonify(resource.to_dict())


@app_views.route('/resources/<resource_name>/medicalarticles', methods=['GET'])
def get_resource_medicalarticles(resource_name):
    resource_name = resource_name.replace(' ', '')
    resource = storage.get(Resource, name=resource_name)

    if resource is None:
        abort(404, 'Not found')
    medical_articles = storage.all(MedicalArticle)
    resource_medical_articles = [medical_article.to_dict()
                                 for medical_article in medical_articles.values()
                                 if medical_article.resource_Id == resource.id]
    return jsonify(resource_medical_articles)

#@app_views.route('/resources/<resource_name>/<category_name>/articles', methods=['GET'])
