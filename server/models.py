from datetime import datetime, timezone
from config import db

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
