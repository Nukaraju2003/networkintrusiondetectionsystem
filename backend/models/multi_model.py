
import numpy as np
import pandas as pd
import pickle
import os
from pathlib import Path

class MultiClassificationModel:
    def __init__(self):
        models_dir = Path(__file__).parent.parent / 'ml_models'
        
        # Load trained Random Forest model
        with open(models_dir / 'random_forest_model_multi.pkl', 'rb') as model_file:
            self.rf = pickle.load(model_file)

        # Load saved train columns for feature alignment
        with open(models_dir / 'train_columns_multi.pkl', 'rb') as file:
            self.train_columns = pickle.load(file)

        # Load saved Label Encoder
        with open(models_dir / 'label_encoder_multi.pkl', 'rb') as le_file:
            self.le = pickle.load(le_file)

        # Load saved StandardScaler
        with open(models_dir / 'scaler_multi.pkl', 'rb') as scaler_file:
            self.scaler = pickle.load(scaler_file)
        
        # Define feature names (excluding label column)
        self.features = [
            "duration", "protocol_type", "service", "flag", "src_bytes", "dst_bytes", "land", "wrong_fragment", "urgent", "hot",
            "num_failed_logins", "logged_in", "num_compromised", "root_shell", "su_attempted", "num_root", "num_file_creations", "num_shells",
            "num_access_files", "num_outbound_cmds", "is_host_login", "is_guest_login", "count", "srv_count", "serror_rate", "srv_serror_rate",
            "rerror_rate", "srv_rerror_rate", "same_srv_rate", "diff_srv_rate", "srv_diff_host_rate", "dst_host_count", "dst_host_srv_count", 
            "dst_host_same_srv_rate", "dst_host_diff_srv_rate", "dst_host_same_src_port_rate", "dst_host_srv_diff_host_rate", "dst_host_serror_rate",
            "dst_host_srv_serror_rate", "dst_host_rerror_rate", "dst_host_srv_rerror_rate", "label", "difficulty"
        ]
        
        # Define attack categories mapping
        self.attack_categories = {
            'normal': {'category': 'Normal', 'severity': 'low', 'impact': 'No impact - normal traffic'},
            'neptune': {'category': 'DoS', 'severity': 'high', 'impact': 'Denial of Service through SYN flooding'},
            'ipsweep': {'category': 'Probe', 'severity': 'medium', 'impact': 'Information gathering and vulnerability scanning'},
            'portsweep': {'category': 'Probe', 'severity': 'medium', 'impact': 'Port scanning to find active services'},
            'satan': {'category': 'Probe', 'severity': 'medium', 'impact': 'Looks for known vulnerabilities'},
            'smurf': {'category': 'DoS', 'severity': 'high', 'impact': 'ICMP flooding attack'},
            'teardrop': {'category': 'DoS', 'severity': 'high', 'impact': 'Sending fragmented packets that cannot be reassembled'},
            'buffer_overflow': {'category': 'U2R', 'severity': 'high', 'impact': 'Privilege escalation by overflowing memory buffers'},
            'loadmodule': {'category': 'U2R', 'severity': 'high', 'impact': 'Gaining root privileges'},
            'perl': {'category': 'U2R', 'severity': 'high', 'impact': 'Executing commands through Perl'},
            'rootkit': {'category': 'U2R', 'severity': 'high', 'impact': 'Installing a rootkit to gain continued access'},
            'ftp_write': {'category': 'R2L', 'severity': 'high', 'impact': 'Unauthorized write access to FTP server'},
            'guess_passwd': {'category': 'R2L', 'severity': 'high', 'impact': 'Password guessing attack'},
            'imap': {'category': 'R2L', 'severity': 'high', 'impact': 'Exploiting vulnerabilities in IMAP protocol'},
            'multihop': {'category': 'R2L', 'severity': 'high', 'impact': 'Relay attack through multiple systems'},
            'phf': {'category': 'R2L', 'severity': 'high', 'impact': 'Executing commands through web server CGI'},
            'spy': {'category': 'R2L', 'severity': 'high', 'impact': 'Information theft through network sniffing'},
            'warezclient': {'category': 'R2L', 'severity': 'medium', 'impact': 'Using illegal software'},
            'warezmaster': {'category': 'R2L', 'severity': 'high', 'impact': 'Setting up illegal software repository'},
            'pod': {'category': 'DoS', 'severity': 'high', 'impact': 'Ping of death attack'},
            'back': {'category': 'DoS', 'severity': 'high', 'impact': 'Web server attack causing service disruption'},
            'land': {'category': 'DoS', 'severity': 'high', 'impact': 'Same source and destination address/port attack'},
            'nmap': {'category': 'Probe', 'severity': 'medium', 'impact': 'Network scanning using Nmap tool'}
        }
    
    def preprocess(self, input_data):
        """Preprocess input data for multi-class classification"""
        # Convert input into a DataFrame
        single_df = pd.DataFrame([input_data], columns=self.features[:-2])  # Exclude 'label' and 'difficulty'
        
        # One-hot encode categorical features
        single_df = pd.get_dummies(single_df, columns=['protocol_type', 'service', 'flag'], prefix="", prefix_sep="")
        
        # Ensure the single input has the same features as training data
        for col in self.train_columns:
            if col not in single_df:
                single_df[col] = 0  # Add missing features with default value 0
        
        # Ensure correct column order
        single_df = single_df[self.train_columns]
        
        # Normalize numerical features using the saved StandardScaler
        single_df.iloc[:, :41] = self.scaler.transform(single_df.iloc[:, :41]).astype(float)
        
        return single_df
    
    def predict(self, input_data):
        """Make a multi-class classification prediction"""
        try:
            # Preprocess the data
            single_df = self.preprocess(input_data)
            
            # Predict attack type using the trained model
            y_pred = self.rf.predict(single_df)
            
            # Get prediction probabilities
            y_prob = self.rf.predict_proba(single_df)
            confidence = round(max(y_prob[0]) * 100)
            
            # Convert numeric prediction back to attack label
            y_pred_label = self.le.inverse_transform(y_pred)
            attack_type = y_pred_label[0].lower()
            
            # Get attack details
            details = self.attack_categories.get(attack_type, {
                'category': 'Unknown',
                'severity': 'medium',
                'impact': 'Unknown impact'
            })
            
            # Format result
            result = {
                "prediction": y_pred_label[0],
                "confidence": confidence,
                "details": details
            }
            
            return result, None
            
        except Exception as e:
            return None, str(e)
