
import React, { useState } from "react";
import NetworkHeader from "@/components/NetworkHeader";
import NetworkInputForm from "@/components/NetworkInputForm";
import MultiClassificationResult from "@/components/MultiClassificationResult";
import LoadingOverlay from "@/components/LoadingOverlay";
import { toast } from "sonner";
import { predictMultiClassification } from "@/services/api";

const MultiClassification = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [multiResult, setMultiResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [resultDetails, setResultDetails] = useState<{
    category?: string;
    severity?: 'low' | 'medium' | 'high';
    impact?: string;
  } | undefined>(undefined);

  const handleSubmit = async (data: any, classification: 'binary' | 'multi') => {
    if (classification !== 'multi') {
      toast.info('Switched to multi classification for this page');
    }
    
    setIsProcessing(true);
    
    try {
      // Call multi-classification API
      const result = await predictMultiClassification(data);
      setMultiResult(result.prediction);
      setConfidence(result.confidence);
      setResultDetails(result.details);
      
      toast.success('Multi-classification completed');
    } catch (error) {
      console.error("Error processing data:", error);
      toast.error('Error processing network data');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NetworkHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 animate-fade-up">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Multi Classification</h2>
            <p className="text-muted-foreground">
              Detailed analysis of network traffic to classify potential attack types
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <LoadingOverlay isLoading={isProcessing} />
              <NetworkInputForm onSubmit={handleSubmit} isProcessing={isProcessing} forcedClassification="multi" />
            </div>
            
            <div className="animate-fade-in">
              <MultiClassificationResult 
                result={multiResult} 
                confidence={confidence}
                details={resultDetails}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Network Intrusion Detection System Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default MultiClassification;
