
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleX, Shield } from "lucide-react";

interface BinaryClassificationResultProps {
  result: 'normal' | 'attack' | null;
  confidence?: number;
}

const BinaryClassificationResult: React.FC<BinaryClassificationResultProps> = ({ 
  result, 
  confidence = 97
}) => {
  if (result === null) {
    return (
      <Card className="glass-card h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Binary Classification</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-center p-8">
          <div className="text-muted-foreground space-y-2">
            <Shield className="h-12 w-12 mx-auto opacity-20" />
            <p>No analysis performed yet</p>
            <p className="text-sm">Submit traffic data to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card h-full flex flex-col animate-fade-in ${result === 'attack' ? 'border-security-alert/20' : 'border-security-normal/20'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Binary Classification</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-4">
          {result === 'normal' ? (
            <>
              <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center animate-fade-in">
                <CircleCheck className="h-14 w-14 text-security-normal" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-security-normal">Normal Traffic</h3>
                <p className="text-sm text-muted-foreground">No threats detected in this traffic sample</p>
              </div>
              <div className="bg-green-50 rounded-full px-4 py-1 text-sm font-medium text-security-normal">
                {confidence}% confidence
              </div>
            </>
          ) : (
            <>
              <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center animate-pulse-slow">
                <CircleX className="h-14 w-14 text-security-alert" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-security-alert">Attack Detected</h3>
                <p className="text-sm text-muted-foreground">Potential security threat identified</p>
              </div>
              <div className="bg-red-50 rounded-full px-4 py-1 text-sm font-medium text-security-alert">
                {confidence}% confidence
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BinaryClassificationResult;
