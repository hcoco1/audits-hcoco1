from datetime import datetime
from config import db
from flask_login import UserMixin
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class Audit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    afe = db.Column(db.String(50))
    process_path = db.Column(db.String(255))  # Adjusted length
    error_message = db.Column(db.String(255))  # Adjusted length
    is_durable = db.Column(db.String(255)) 
    date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index=True)  # Added index

    user = db.relationship('User', backref=db.backref('audits', lazy=True))

    def __repr__(self):
        return f"<Audit {self.id}: {self.username}>"

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    _password = db.Column(db.String(200))

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext_password):
        self._password = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')

    def check_password(self, plaintext_password):
        return bcrypt.check_password_hash(self._password, plaintext_password)
    
    def __repr__(self):
        return f"<User {self.username}>"

