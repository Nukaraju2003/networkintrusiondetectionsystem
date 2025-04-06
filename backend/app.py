
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from routes.binary_classification import binary_blueprint
from routes.multi_classification import multi_blueprint

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints
app.register_blueprint(binary_blueprint, url_prefix='/api/binary')
app.register_blueprint(multi_blueprint, url_prefix='/api/multi')

# Home route
@app.route('/')
def home():
    return jsonify({
        'status': 'success',
        'message': 'Network Intrusion Detection API is running'
    })

# Error handling
@app.errorhandler(404)
def not_found(e):
    return jsonify({"status": "error", "message": "The requested resource was not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"status": "error", "message": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
