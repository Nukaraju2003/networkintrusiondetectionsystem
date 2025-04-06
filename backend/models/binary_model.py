
import numpy as np
import pandas as pd
import pickle
import os
from pathlib import Path

class BinaryClassificationModel:
    def __init__(self):
        models_dir = Path(__file__).parent.parent / 'ml_models'
        
        # Load saved Random Forest model
        with open(models_dir / 'random_forest_binary.pkl', 'rb') as model_file:
            self.rf_binary = pickle.load(model_file)

        # Load saved StandardScaler
        with open(models_dir / 'scaler_binary.pkl', 'rb') as scaler_file:
            self.scaler = pickle.load(scaler_file)

        # Load saved train columns for feature alignment
        with open(models_dir / 'train_columns_binary.pkl', 'rb') as columns_file:
            self.train_columns = pickle.load(columns_file)

        # Define feature names (excluding label and difficulty columns)
        self.features = [
            "duration", "protocol_type", "service", "flag", "src_bytes", 
            "dst_bytes", "land", "wrong_fragment", "urgent", "hot",
            "num_failed_logins", "logged_in", "num_compromised", "root_shell", "su_attempted", 
            "num_root", "num_file_creations", "num_shells", "num_access_files", "num_outbound_cmds", 
            "is_host_login", "is_guest_login", "count", "srv_count", "serror_rate", 
            "srv_serror_rate", "rerror_rate", "srv_rerror_rate", "same_srv_rate", "diff_srv_rate", 
            "srv_diff_host_rate", "dst_host_count", "dst_host_srv_count", "dst_host_same_srv_rate", "dst_host_diff_srv_rate", 
            "dst_host_same_src_port_rate", "dst_host_srv_diff_host_rate", "dst_host_serror_rate", "dst_host_srv_serror_rate", "dst_host_rerror_rate", 
            "dst_host_srv_rerror_rate"
        ]
    
    def preprocess(self, input_data):
        """Preprocess input data for binary classification"""
        # Convert inputs into a DataFrame
        test_df = pd.DataFrame([input_data], columns=self.features)
        
        # Convert data types to match training data
        for col in test_df.columns:
            try:
                test_df[col] = test_df[col].astype(float)
            except:
                pass  # Ignore categorical columns
        
        # One-hot encode categorical features
        test_df = pd.get_dummies(test_df, columns=['protocol_type', 'service', 'flag'], prefix="", prefix_sep="")
        
        # Ensure the test data has the same features as training data
        for col in self.train_columns:
            if col not in test_df:
                test_df[col] = 0  # Add missing features with default value 0
        
        # Ensure correct column order
        test_df = test_df[self.train_columns]
        
        # Normalize numerical features using the saved StandardScaler
        test_df.iloc[:, :41] = self.scaler.transform(test_df.iloc[:, :41])
        
        return test_df
    
    def predict(self, input_data):
        """Make a binary classification prediction"""
        try:
            # Preprocess the data
            test_df = self.preprocess(input_data)
            
            # Predict attack type using the trained model
            y_pred = self.rf_binary.predict(test_df)
            
            # Get prediction probabilities
            y_prob = self.rf_binary.predict_proba(test_df)
            confidence = round(max(y_prob[0]) * 100)
            
            # Format result
            if y_pred[0] == 1:
                result = {
                    "prediction": "attack",
                    "confidence": confidence
                }
            else:
                result = {
                    "prediction": "normal",
                    "confidence": confidence
                }
            
            return result, None
            
        except Exception as e:
            return None, str(e)
