
import React from "react";
import NetworkHeader from "@/components/NetworkHeader";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NetworkHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6 animate-fade-up">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Network Intrusion Detection Dashboard</h2>
            <p className="text-muted-foreground">
              Analysis and detection tools for identifying potential network security threats
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-500" />
                  Binary Classification
                </CardTitle>
                <CardDescription>
                  Simple detection of normal vs attack traffic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyze network traffic with a binary classifier to determine if traffic is normal or potentially malicious.
                </p>
                <Button asChild className="w-full">
                  <Link to="/binary-classification">Analyze Traffic</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-indigo-500" />
                  Multi Classification
                </CardTitle>
                <CardDescription>
                  Detailed attack type classification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced analysis to identify specific attack types and categories with more detailed results.
                </p>
                <Button asChild className="w-full">
                  <Link to="/multi-classification">Detailed Analysis</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-emerald-500" />
                  About
                </CardTitle>
                <CardDescription>
                  Learn about this system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Information about the models, datasets, and detection techniques used in this network intrusion detection system.
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/about">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
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

export default Dashboard;
