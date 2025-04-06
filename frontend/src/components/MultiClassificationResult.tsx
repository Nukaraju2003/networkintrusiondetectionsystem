
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Flag, Triangle } from "lucide-react";

interface MultiClassificationResultProps {
  result: string | null;
  confidence?: number;
  details?: {
    category?: string;
    severity?: 'low' | 'medium' | 'high';
    impact?: string;
  };
}

const MultiClassificationResult: React.FC<MultiClassificationResultProps> = ({ 
  result, 
  confidence = 94,
  details = {
    category: 'Probe',
    severity: 'medium',
    impact: 'Information gathering and vulnerability scanning'
  }
}) => {
  if (result === null) {
    return (
      <Card className="glass-card h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Multi Classification</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-center p-8">
          <div className="text-muted-foreground space-y-2">
            <Shield className="h-12 w-12 mx-auto opacity-20" />
            <p>No analysis performed yet</p>
            <p className="text-sm">Submit traffic data to see detailed attack classification</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isNormal = result.toLowerCase() === 'normal';
  const getIconForAttackType = () => {
    if (isNormal) return <Shield className="h-14 w-14 text-security-normal" />;
    
    const category = details?.category?.toLowerCase() || '';
    
    if (category.includes('dos')) {
      return <Flag className="h-14 w-14 text-security-alert" />;
    } else if (category.includes('probe')) {
      return <Triangle className="h-14 w-14 text-security-info" />;
    } else {
      return <Shield className="h-14 w-14 text-security-warning" />;
    }
  };

  const getSeverityColor = () => {
    const severity = details?.severity || 'medium';
    
    if (severity === 'high') return 'text-security-alert';
    if (severity === 'medium') return 'text-security-warning';
    return 'text-security-info';
  };

  return (
    <Card className={`glass-card h-full flex flex-col animate-fade-in ${isNormal ? 'border-security-normal/20' : 'border-security-alert/20'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Multi Classification</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-4">
          <div className={`h-24 w-24 rounded-full ${isNormal ? 'bg-green-50' : 'bg-blue-50'} flex items-center justify-center`}>
            {getIconForAttackType()}
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold">{result}</h3>
          </div>
          <div className={`bg-${isNormal ? 'green' : 'blue'}-50 rounded-full px-4 py-1 text-sm font-medium ${isNormal ? 'text-security-normal' : getSeverityColor()}`}>
            {confidence}% confidence
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiClassificationResult;
