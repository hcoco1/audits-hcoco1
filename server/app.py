#!/usr/bin/env python3

# Standard library imports
from flask import request, jsonify, session
# Remote library imports
from flask_restful import Resource, reqparse, fields, marshal_with
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

# Local imports
from config import app, db, api
# Add your model imports
from flask_login import LoginManager
import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()




# Views go here!
load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # The login view of your app
    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define the API fields for marshaling
audit_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'afe': fields.String,
    'process_path': fields.String,
    'error_message': fields.String,
    'is_durable': fields.Boolean,
    'date': fields.DateTime,
    'user_id': fields.Integer
}

class AuditResource(Resource):
    @marshal_with(audit_fields)
    def get(self, audit_id=None):
        if audit_id:
            audit = Audit.query.get_or_404(audit_id)
            return audit
        else:
            audits = Audit.query.all()
            return audits

    @login_required
    @marshal_with(audit_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, help="Username cannot be blank!")
        parser.add_argument('afe', required=True)
        parser.add_argument('process_path', required=True)
        parser.add_argument('error_message', required=True)
        parser.add_argument('is_durable')
        args = parser.parse_args()

        new_audit = Audit(**args, user=current_user)
        db.session.add(new_audit)
        db.session.commit()
        return new_audit, 201

    @login_required
    @marshal_with(audit_fields)
    def put(self, audit_id):
        audit = Audit.query.get_or_404(audit_id)
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('afe')
        parser.add_argument('process_path')
        parser.add_argument('error_message')
        parser.add_argument('is_durable')
        args = parser.parse_args()

        for key, value in args.items():
            if value:
                setattr(audit, key, value)

        db.session.commit()
        return audit, 200

    @login_required
    def delete(self, audit_id):
        audit = Audit.query.get_or_404(audit_id)
        db.session.delete(audit)
        db.session.commit()
        return {'message': 'Audit deleted'}, 200

# Registering the AuditResource with the API
api.add_resource(AuditResource, '/audits', '/audits/<int:audit_id>')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        login_user(user)
        return jsonify({'message': 'Logged in successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201









from models import Audit, User

if __name__ == '__main__':
    app.run(port=5555, debug=True)



