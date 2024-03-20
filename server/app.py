#!/usr/bin/env python3

# Standard library imports
from flask import request, redirect, url_for, render_template, flash, jsonify, session
# Remote library imports
from flask_restful import Resource, reqparse, fields, marshal_with
from flask_login import login_user, logout_user, current_user, login_required

# Local imports
from config import app, db, api
# Add your model imports



# Views go here!

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


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get data sent from the frontend
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists.'}), 409
    
    user = User(username=username)
    user.set_password(password)  # Hash the password and store it
    
    db.session.add(user)
    db.session.commit()
    
    login_user(user)  # Optionally log the user in immediately after signing up
    
    return jsonify({'message': 'User successfully registered.'}), 201



@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Login successful.'}), 200
    
    return jsonify({'error': 'Invalid username or password.'}), 401



@app.route('/logout', methods=['POST'])
def logout():
    logout_user()  # Logout user using Flask-Login
    session.clear()  # Clear session data
    return jsonify({'message': 'User successfully logged out.'}), 200




from models import Audit, User

if __name__ == '__main__':
    app.run(port=5555, debug=True)



