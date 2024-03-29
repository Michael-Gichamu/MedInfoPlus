#!/usr/bin/python3
"""Flask Application that serves as the RESTAPI."""
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from models import storage
from models.medical_article import MedicalArticle
from models.subscriber import Subscriber
from models.resource import Resource
from api.v1.views import app_views
import time
import os
#import base64
import schedule
import multiprocessing

app = Flask(__name__)
app.register_blueprint(app_views)
app.config['SECRET_KEY'] = 'MedInfoPlus_secret_key'
cors = CORS(app, resources={r"/*": {"origins": "*"}})
default_host = os.environ.get('MedInfoPlus_HOST', '0.0.0.0')
default_port = os.environ.get('MedInfoPlus_PORT', '5000')
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'medinfoplus001@gmail.com'
app.config['MAIL_PASSWORD'] = os.environ.get('MedInfoPlus_GMAIL_PWD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

@app.teardown_appcontext
def db_teardown(exception):
    """Close Storage"""
    storage.close()

@app.errorhandler(404)
def not_found(error):
    """Handles 404 error"""
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == "__main__":
    """Main function"""
    app.run(host=default_host, port=default_port, threaded=True)
