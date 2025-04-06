
from flask import Blueprint, request, jsonify
from models.binary_model import BinaryClassificationModel

binary_blueprint = Blueprint('binary', __name__)
binary_model = BinaryClassificationModel()

@binary_blueprint.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.json
        input_data = data.get('input_data')
        
        if not input_data:
            return jsonify({
                'status': 'error',
                'message': 'Input data is required'
            }), 400
        
        # Make prediction
        result, error = binary_model.predict(input_data)
        
        if error:
            return jsonify({
                'status': 'error',
                'message': f'Error making prediction: {error}'
            }), 500
        
        # Return prediction result
        return jsonify({
            'status': 'success',
            'data': result
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error processing request: {str(e)}'
        }), 500
