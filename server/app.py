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



# Views go here!
load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # The login view of your app
    
@login_manager.user_loader
def load_user(user_id):
        return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



audit_fields = {
    'id': fields.Integer,
    'username': fields.String,
    'afe': fields.String,
    'processPath': fields.String,
    'error': fields.String,
    'durable': fields.String,
    'date': fields.DateTime(dt_format='rfc822') 
}

class AuditResource(Resource):
    @marshal_with(audit_fields)
    def get(self):
        audits = Audit.query.all()
        return audits

    @marshal_with(audit_fields)
    def post(self):
        print(request.json)
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, help="Username cannot be blank!")
        parser.add_argument('afe', required=True)
        parser.add_argument('processPath', required=True)
        parser.add_argument('error', required=True)
        parser.add_argument('durable')
        args = parser.parse_args()
        print(args)  # Debugging line to see what's received

        new_audit = Audit(username=args['username'], afe=args['afe'], processPath=args['processPath'], error=args['error'], durable=args['durable'])
        db.session.add(new_audit)
        db.session.commit()
        return new_audit, 201

    @marshal_with(audit_fields)
    def put(self, audit_id):
        audit = Audit.query.get(audit_id)
        if not audit:
            return {'message': 'Audit not found'}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('afe')
        parser.add_argument('processPath')
        parser.add_argument('error')
        parser.add_argument('durable')
        args = parser.parse_args()

        for key, value in args.items():
            if value is not None:
                setattr(audit, key, value)

        db.session.commit()
        return audit, 200

    def delete(self, audit_id):
        audit = Audit.query.get(audit_id)
        if not audit:
            return {'message': 'Audit not found'}, 404

        db.session.delete(audit)
        db.session.commit()
        return {'message': 'Audit deleted'}, 200

# Add the AuditResource to your Api instance
# Assuming `api` is your Flask-RESTful Api instance

api.add_resource(AuditResource, '/audits', '/audits/<int:audit_id>')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
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
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists. Please choose a different one'}), 400
    new_user = User(username=username)
    new_user.password = password  # Password will be automatically hashed
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Account created successfully. Please log in'}), 201









from models import Audit, User

if __name__ == '__main__':
    app.run(port=5555, debug=True)



