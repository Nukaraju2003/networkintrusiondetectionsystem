
import React from "react";
import NetworkHeader from "@/components/NetworkHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Database, Lock, AlertTriangle, Network, Activity } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NetworkHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 animate-fade-up">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">About Advanced Intrusion Detection System</h2>
            <p className="text-muted-foreground">
              Advanced network intrusion detection system powered by machine learning
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-card overflow-hidden border-primary/20">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-600/10 to-indigo-700/10">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced Instrution Detection System that uses 
                  machine learning algorithms to analyze network traffic patterns and identify 
                  potential security threats in real-time.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our system employs both binary classification (normal vs. attack) and 
                  multi-classification approaches to provide detailed insights into the nature 
                  of potential security threats, helping administrators respond quickly and effectively.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card overflow-hidden border-primary/20">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-600/10 to-indigo-700/10">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Built on a robust technology stack featuring React for the frontend and 
                  Python with scikit-learn for the backend machine learning models.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our models are trained on the KDD Cup 1999 dataset, a benchmark for 
                  evaluating intrusion detection systems, and have been optimized for 
                  high accuracy and low false-positive rates.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-xl font-semibold tracking-tight mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card border-primary/10 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Real-time Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze network traffic patterns in real-time to identify potential security threats
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/10 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <Activity className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-medium">Multi-Class Classification</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed attack classification into DoS, Probe, R2L, and U2R categories
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-primary/10 hover:border-primary/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Network className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium">Advanced Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive network traffic analysis with confidence scores and severity ratings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card overflow-hidden border-primary/20 mb-6">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-600/10 to-indigo-700/10">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Security Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Advanced Intrusion Detection System employs a dual-classification approach to network security:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-600">Binary Classification</h4>
                    <p className="text-sm text-muted-foreground">
                      First-level analysis that quickly distinguishes between normal traffic and potential attacks,
                      providing an immediate alert system for security teams.
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-indigo-600">Multi Classification</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed second-level analysis that categorizes attacks into specific types,
                      enabling targeted response strategies based on the nature of the threat.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default About;
