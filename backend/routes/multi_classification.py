
from flask import Blueprint, request, jsonify
from models.multi_model import MultiClassificationModel

multi_blueprint = Blueprint('multi', __name__)
multi_model = MultiClassificationModel()

@multi_blueprint.route('/predict', methods=['POST'])
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
        result, error = multi_model.predict(input_data)
        
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
