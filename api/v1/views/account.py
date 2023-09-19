#!/usr/bin/python3
"""
Flask route that serves sign up.
"""
from api.v1.views import app_views
from flask import current_app, request, jsonify
from datetime import datetime, timedelta
from functools import wraps
from models.user import User
from models.subscriber import Subscriber
from models import storage
import schedule
import time
from flask_mail import Message
import jwt
import os


def generate_token(user_email):
    payload = {
        'sub': user_email,
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
            user_email = data['sub']

            user = storage.get(User, email=user_email)

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
    """Sign Up user and check if doesn't exist"""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if storage.get(User, email=email):
        return jsonify({'message': 'User already exists'}), 301
    if name and email and password:
        new_user = User(**data)
        storage.new(new_user)
        storage.save()
        storage.reload()
        return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'message': 'Missing required fields'}), 400


@app_views.route('/account/login', methods=['POST'])
def login():
    """User Login and return user token, email and name"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
 
    if not email or not password:
        return jsonify({'message': 'Missing credentials'}), 400

    user = storage.get(User, email=email)

    if not user:
        return jsonify({'message': 'Invalid email'}), 401

    if not user.check_password(password):
        return jsonify({'message': 'Invalid password'}), 401

    token = generate_token(user.email)
    user_data = {
        'name': user.name,
        'id': user.id
    }
    return jsonify({'token': token, 'user_data': user_data})


@app_views.route('/account/update', methods=['PUT'])
def account_update(user):
    data = request.get_json()
    new_name = data.get('new_name')
    email = data.get('email')
    password = data.get('password')
    new_password = data.get('new_password')

    if not new_name and not new_password:
        return ({'message': 'Missing update credentials <new_name> <new_password'}), 400
    if email and password:
        user = storage.get(User, email=email)

    if not user:
        return jsonify({'message': 'Invalid email'}), 401

    if not user.check_password(password):
        return jsonify({'message': 'Invalid password'}), 401

    if new_name:
        user.name = new_name
    if new_password:
        user.password = new_password
    storage.save()
    storage.reload()
    updated_user_data = {
        'user': user.name,
    }
    return jsonify({'message': 'Account updated successfully', 'user_data': updated_user_data})


@app_views.route('/account/protected', methods=['GET'])
@token_required
def protected(user):
    return jsonify({'message': f'Hello, {user.email}! This is a protected resource'})

@app_views.route('/account/users', methods=['GET'])
@token_required
def access_users(user):
    if user.email != "MedInfoPlusAdmin@gmail.com":
        return jsonify({'message': 'Unauthorized Email'}), 401
    user_admin = storage.get(User, email=user.email)
    if user_admin.check_password(user._password):
        return jsonify ({'message': 'Invalid Password'}), 401
    users_list = []
    users = storage.all(User)

    for user in users.values():
        users_list.append(user.to_dict())
    return jsonify(users_list)

@app_views.route('/account/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if storage.get(Subscriber, email=email):
        return jsonify({'message': 'Subscriber Already exists'})
    if email:
        subscriber = Subscriber(**data)
        storage.new(subscriber)
        storage.save()
        storage.reload()
        return jsonify({'message': 'Subscriber created successfully'}), 201
    else:
        return jsonify({'message': 'Missing required fields'}), 400
