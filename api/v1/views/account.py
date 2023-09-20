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
from models.medical_article import MedicalArticle
from models.resource import Resource
from flask_mail import Mail, Message
from flask import current_app
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


def send_newsletter():
    """Fetch articles published today from the database and send newsletters."""
    with current_app.app_context():
        mail = Mail(current_app)
        medicalarticles_list = []
        medicalarticles = storage.all(MedicalArticle)

        for medicalarticle in medicalarticles.values():
            medicalarticles_list.append(medicalarticle.to_dict())

        sorted_medicalarticles = sorted(medicalarticles_list, key=lambda x: x['query_count'], reverse=True)
        top_5_articles = sorted_medicalarticles[:5]

        top_5_articles_list = []
        for medicalarticle in top_5_articles:
            top_5_articles_list.append(medicalarticle)

        medical_articles = top_5_articles_list
        if medical_articles:
            newsletter_content = "<h1>Today's Top Medical Stories<h1>"

        subscribers = storage.all(Subscriber)
        for subscriber in subscribers.values():
            subscriber = subscriber.to_dict()
            msg = Message("Today's Top Stories", sender='medinfoplus001@gmail.com')
            msg.add_recipient(subscriber['email'])
            msg.html = newsletter_content
            for article in medical_articles:
                newsletter_content += f"<h2>{article['title']}<h2>"
                newsletter_content += f"<p>{article['summary']}<p>"
                resource_Id = article['resource_Id']
                resource = storage.get(Resource, id=resource_Id)
                resource_path = resource.image.split(".")[0]
                image_dir = f'/root/Alx-Projects/Foundations_project/MedInfoPlus/MedicalArticle_images/{resource_path}'
                with current_app.open_resource(f"{image_dir}/{article['image']}") as img:
                    msg.attach("image.jpg", "image/jpeg", img.read())
            mail.send(msg)

@app_views.route('/send_newsletter', methods=['POST'])
def send_newsletter_route():
    """Endpoint to send newsletters."""
    send_newsletter()
    return jsonify({"message": "Newsletter sent successfully"}), 200

