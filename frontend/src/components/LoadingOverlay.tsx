
import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = "Processing data..."
}) => {
  if (!isLoading) return null;
  
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
