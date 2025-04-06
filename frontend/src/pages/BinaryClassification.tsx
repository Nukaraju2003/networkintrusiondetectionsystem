
import React, { useState } from "react";
import NetworkHeader from "@/components/NetworkHeader";
import NetworkInputForm from "@/components/NetworkInputForm";
import BinaryClassificationResult from "@/components/BinaryClassificationResult";
import LoadingOverlay from "@/components/LoadingOverlay";
import { toast } from "sonner";
import { predictBinaryClassification } from "@/services/api";

const BinaryClassification = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [binaryResult, setBinaryResult] = useState<'normal' | 'attack' | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  const handleSubmit = async (data: any, classification: 'binary' | 'multi') => {
    if (classification !== 'binary') {
      toast.info('Switched to binary classification for this page');
    }
    
    setIsProcessing(true);
    
    try {
      // Call binary classification API
      const result = await predictBinaryClassification(data);
      setBinaryResult(result.prediction);
      setConfidence(result.confidence);
      
      toast.success('Binary classification completed');
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
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Binary Classification</h2>
            <p className="text-muted-foreground">
              Analyze network traffic to determine if it's normal or potentially malicious
            </p>
          </section>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <LoadingOverlay isLoading={isProcessing} />
              <NetworkInputForm onSubmit={handleSubmit} isProcessing={isProcessing} forcedClassification="binary" />
            </div>
            
            <div className="animate-fade-in">
              <BinaryClassificationResult result={binaryResult} confidence={confidence} />
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

export default BinaryClassification;
