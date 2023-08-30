#!/usr/bin/python3
"""
Flask route that serves sign up.
"""
from api.v1.views import app_views
from flask import current_app, request, jsonify
from datetime import datetime, timedelta
from functools import wraps
from models.user import User
from models import storage
import jwt
import os


def generate_token(user_id):
    payload = {
        'sub': user_id,
        'exp': datetime.utcnow() + timedelta(days=1)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token.decode('utf-8')

def token_required(f):
    @wraps(f)
    def decorated(*args, ** kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        if token.startswith('Bearer '):
            token = token.split(None, 1)[1]
        
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithm='HS256')
            user_id = data['sub']

            user = storage.get(User, id=user_id)

            if not user:
                return jsonify({'message': 'User not found'}), 404

            kwargs['user'] = user
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401

        return f(*args, **kwargs)

    return decorated


@app_views.route('/account/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email and password:
        new_user = User(**data)
        storage.new(new_user)
        storage.save()
        storage.reload()
        return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'message': 'Missing required fields'}), 400


@app_views.route('/account/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
 
    if email and password:
        user = storage.get(User, email=email)
    
    if user and user.check_password(password):
        token = generate_token(user.id)
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


@app_views.route('/account/protected', methods=['GET'])
@token_required
def protected(user):
    return jsonify({'message': f'Hello, {user.email}! This is a protected resource'})
