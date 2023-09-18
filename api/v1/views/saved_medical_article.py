#!/usr/bin/python3
"""
Flask route that returns json saved_medicalarticle response
"""
from flask import abort, jsonify, request, make_response
import os
from api.v1.views import app_views
from models import storage
from models.saved_medical_article import SavedMedicalArticle
from models.medical_article import MedicalArticle
from models.user import User

def get_user_saved_medicalarticles(user_Id):
    """Retrieves all saved medical articles of a user."""
    saved_medicalarticles = storage.all(SavedMedicalArticle)
    user_saved_medicalarticles = [saved_medicalarticle.to_dict()
                                  for saved_medicalarticle in saved_medicalarticles.values()
                                  if saved_medicalarticle.user_Id == user_Id]
    return user_saved_medicalarticles


@app_views.route('/saved_medicalarticles/<user_Id>', methods=['GET'])
def get_saved_medicalarticles(user_Id):
    """Retrieves all saved medicalarticles of a user."""
    user = storage.get(User, id=user_Id)
    if user_Id is None:
        abort(404, 'Not found')
    user_saved_medicalarticles = get_user_saved_medicalarticles(user_Id)

    medicalarticles_list = []
    medicalarticles = storage.all(MedicalArticle)

    for medicalarticle in medicalarticles.values():
        for user_saved_medicalarticle in user_saved_medicalarticles:
            if user_saved_medicalarticle['saved_medicalarticle_id'] == medicalarticle.id:
                medicalarticles_list.append(medicalarticle.to_dict())

    return jsonify(medicalarticles_list)

@app_views.route('/saved_medicalarticles/<user_Id>/<medical_article_id>', methods=['POST'])
def get_post_saved_medicalarticle(user_Id, medical_article_id):
    """Saves or deletes a medical_article id"""
    user = storage.get(User, id=user_Id)
    if user_Id is None:
        abort(404, 'Not found')

    medicalarticle = storage.get(MedicalArticle, id=medical_article_id)
    if medicalarticle is None:
        abort(404, 'Not found')

    user_saved_medicalarticles = get_user_saved_medicalarticles(user_Id)

    is_already_saved = any(saved_medicalarticle['saved_medicalarticle_id'] == medical_article_id
                           for saved_medicalarticle in user_saved_medicalarticles)

    if is_already_saved:
        return jsonify({'message': 'Medical article already saved'}), 400
   
    new_saved_medicalarticle = SavedMedicalArticle(user_Id=user_Id, saved_medicalarticle_id=medical_article_id)
    print(new_saved_medicalarticle.saved_medicalarticle_id)
    storage.new(new_saved_medicalarticle)
    storage.save()
    storage.reload()
    return jsonify({'message': 'Medical article saved successfully'}), 201


@app_views.route('/saved_medicalarticles/<user_Id>/<saved_medicalarticle_id>', methods=['DELETE'])
def get_delete_saved_medicalarticle(user_Id, saved_medicalarticle_id):
    """Deletes a saved medical_article id"""
    exists = False
    saved_medicalarticles = storage.all(SavedMedicalArticle)

    for saved_medicalarticle in saved_medicalarticles.values():
        if (saved_medicalarticle.user_Id == user_Id and
            saved_medicalarticle.saved_medicalarticle_id == saved_medicalarticle_id):

            storage.delete(saved_medicalarticle)
            storage.save()
            storage.reload()
            exists = True
    
    if exists:
        return make_response(jsonify({'message': 'Successfully deleted a saved medical article'}), 200)
    else:
        return make_response(jsonify({'message': 'Saved medical article doesnt exists!'}), 401)
