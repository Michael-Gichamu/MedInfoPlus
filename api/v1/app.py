#!/usr/bin/python3
"""Flask Application that serves as the RESTAPI."""
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_mail import Mail, Message
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
mail = Mail(app)

@app.teardown_appcontext
def db_teardown(exception):
    """Close Storage"""
    storage.close()

@app.errorhandler(404)
def not_found(error):
    """Handles 404 error"""
    return make_response(jsonify({"error": "Not found"}), 404)

def send_newsletter():
    """Fetch articles published today from the database and send newsletters."""
    with app.app_context():
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
            for article in medical_articles:
                """
                Send Image Login to be implemented.
                resource_Id = article['resource_Id']
                resource = storage.get(Resource, id=resource_Id)
                resource_path = resource.image.split(".")[0]
                image_dir = f'/root/Alx-Projects/Foundations_project/MedInfoPlus/MedicalArticle_images/{resource_path}'
                with open(f"{image_dir}/{article['image']}", 'rb') as image_file:
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                """

                newsletter_content += f"<h2>{article['title']}<h2>"
#               newsletter_content += f'<img src="data:image/jpeg;base64,{image_data}" width="100%">'
                newsletter_content += f"<p>{article['summary']}<p>"

        subscribers = storage.all(Subscriber)
        for subscriber in subscribers.values():
            subscriber = subscriber.to_dict()
            msg = Message("Today's Top Stories", sender='medinfoplus001@gmail.com')
            msg.add_recipient(subscriber['email'])
            msg.html = newsletter_content
            mail.send(msg)

def schedule_task():
    while True:
        send_newsletter()
        time.sleep(5)

if __name__ == "__main__":
    """Main function"""
    background_process = multiprocessing.Process(target=schedule_task)
    background_process.daemon = True
    background_process.start()
    app.run(host=default_host, port=default_port, threaded=True)
