from datetime import datetime, timezone
from config import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

# Models go here!


class Audit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    afe = db.Column(db.String(50), nullable=False)
    processPath = db.Column(db.String(100), nullable=False)
    error = db.Column(db.String(100), nullable=False)
    durable = db.Column(db.String(255), nullable=True)
    date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Audit {self.username}>"
    
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Adjust the model according to your current setup
