
"""
This script is for testing that the model files are loaded correctly.
You can run this to verify your models are working before starting the server.
"""
import os
from pathlib import Path
from models.binary_model import BinaryClassificationModel
from models.multi_model import MultiClassificationModel

def test_binary_model():
    print("\n=== Testing Binary Classification Model ===")
    try:
        model = BinaryClassificationModel()
        
        # Test with normal traffic
        normal_input = [
            "0", "udp", "private", "SF", "45", "44", "0", "0", "0", "0", 
            "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
            "0", "0", "505", "505", "0.00", "0.00", "0.00", "0.00", 
            "1.00", "0.00", "0.00", "255", "255", "1.00", "0.00", 
            "1.00", "0.00", "0.00", "0.00", "0.00", "0.00"
        ]
        
        result, error = model.predict(normal_input)
        if error:
            print(f"Error: {error}")
        else:
            print(f"Normal traffic prediction: {result}")
        
        # Test with attack traffic
        attack_input = [
            "0", "tcp", "private", "REJ", "0", "0", "0", "0", "0", "0", 
            "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
            "0", "0", "111", "2", "0.00", "0.00", "1.00", "1.00", 
            "0.02", "0.07", "0.00", "255", "2", "0.01", "0.07", 
            "0.00", "0.00", "0.00", "0.00", "1.00", "1.00"
        ]
        
        result, error = model.predict(attack_input)
        if error:
            print(f"Error: {error}")
        else:
            print(f"Attack traffic prediction: {result}")
            
        print("Binary model test completed successfully!")
        
    except Exception as e:
        print(f"Error testing binary model: {str(e)}")

def test_multi_model():
    print("\n=== Testing Multi-Classification Model ===")
    try:
        model = MultiClassificationModel()
        
        # Test with normal traffic
        probe_input = [
            "0", "icmp", "eco_i", "SF", "20", "0", "0", "0", "0", "0", 
            "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
            "0", "0", "1", "65", "0.00", "0.00", "0.00", "0.00", 
            "1.00", "0.00", "1.00", "3", "57", "1.00", "0.00", 
            "1.00", "0.28", "0.00", "0.00", "0.00", "0.00"
        ]
        
        result, error = model.predict(probe_input)
        if error:
            print(f"Error: {error}")
        else:
            print(f"Probe traffic prediction: {result}")
            
        print("Multi model test completed successfully!")
        
    except Exception as e:
        print(f"Error testing multi model: {str(e)}")

if __name__ == "__main__":
    # Check if model files exist
    models_dir = Path(__file__).parent / 'ml_models'
    required_files = [
        'random_forest_binary.pkl',
        'scaler_binary.pkl',
        'train_columns_binary.pkl',
        'random_forest_model_multi.pkl',
        'label_encoder_multi.pkl',
        'scaler_multi.pkl',
        'train_columns_multi.pkl'
    ]
    
    missing_files = []
    for file in required_files:
        if not (models_dir / file).exists():
            missing_files.append(file)
    
    if missing_files:
        print("WARNING: The following model files are missing:")
        for file in missing_files:
            print(f"  - {file}")
        print("\nPlease place these files in the 'ml_models' directory before running the tests.")
    else:
        print("All model files found! Running tests...")
        test_binary_model()
        test_multi_model()
