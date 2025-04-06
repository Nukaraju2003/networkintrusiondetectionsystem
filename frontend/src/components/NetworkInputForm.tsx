
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface NetworkInputFormProps {
  onSubmit: (data: any, classification: 'binary' | 'multi') => void;
  isProcessing: boolean;
  forcedClassification?: 'binary' | 'multi';
}

// Protocol types for dropdown
const protocolTypes = ["tcp", "udp", "icmp"];

// Service types for dropdown
const serviceTypes = [
  "http", "private", "ftp_data", "smtp", "telnet", "domain_u", 
  "ftp", "eco_i", "finger", "domain", "ssh", "auth", 
  "bgp", "courier", "daytime", "discard", "echo", "efs", 
  "exec", "gopher", "hostnames", "http_443", "imap4", "IRC", 
  "iso_tsap", "klogin", "kshell", "ldap", "link", "login", 
  "mtp", "name", "netbios_dgm", "netbios_ns", "netbios_ssn", "netstat", 
  "nnsp", "nntp", "ntp_u", "other", "pop_2", "pop_3", 
  "printer", "red_i", "remote_job", "rje", "shell", "sql_net", 
  "sunrpc", "supdup", "systat", "tim_i", "time", "urh_i", 
  "urp_i", "uucp", "uucp_path", "vmnet", "whois", "X11", 
  "Z39_50"
];

// Flag types for dropdown
const flagTypes = [
  "SF", "REJ", "S0", "S1", "S2", "S3", "RSTR", "RSTO", 
  "SH", "OTH", "RSTOS0"
];

// Feature metadata with ranges and input types
const featureMetadata = [
  { name: "duration", label: "Duration", min: 0, max: 5000, type: "number", tooltip: "Connection duration in seconds (0-5000)" },
  { name: "protocol_type", label: "Protocol Type", type: "select", options: protocolTypes, tooltip: "Network protocol (tcp, udp, icmp)" },
  { name: "service", label: "Service", type: "select", options: serviceTypes, tooltip: "Network service on destination" },
  { name: "flag", label: "Flag", type: "select", options: flagTypes, tooltip: "Connection status flag" },
  { name: "src_bytes", label: "Source Bytes", min: 0, max: 10000000, type: "number", tooltip: "Bytes sent from source to destination (0-10,000,000+)" },
  { name: "dst_bytes", label: "Dest. Bytes", min: 0, max: 10000000, type: "number", tooltip: "Bytes sent from destination to source (0-10,000,000+)" },
  { name: "land", label: "Land", min: 0, max: 1, type: "number", tooltip: "1 if source/destination IPs & ports are same, 0 otherwise" },
  { name: "wrong_fragment", label: "Wrong Fragment", min: 0, max: 3, type: "number", tooltip: "Number of wrong fragments (0-3)" },
  { name: "urgent", label: "Urgent", min: 0, max: 3, type: "number", tooltip: "Number of urgent packets (0-3)" },
  { name: "hot", label: "Hot", min: 0, max: 10, type: "number", tooltip: "Number of 'hot' indicators (0-10)" },
  { name: "num_failed_logins", label: "Failed Logins", min: 0, max: 5, type: "number", tooltip: "Number of failed login attempts (0-5)" },
  { name: "logged_in", label: "Logged In", min: 0, max: 1, type: "number", tooltip: "1 if successfully logged in, 0 otherwise" },
  { name: "num_compromised", label: "Compromised", min: 0, max: 20, type: "number", tooltip: "Number of compromised conditions (0-10+)" },
  { name: "root_shell", label: "Root Shell", min: 0, max: 1, type: "number", tooltip: "1 if root shell obtained, 0 otherwise" },
  { name: "su_attempted", label: "Su Attempted", min: 0, max: 1, type: "number", tooltip: "1 if 'su root' attempted, 0 otherwise" },
  { name: "num_root", label: "Root Access", min: 0, max: 20, type: "number", tooltip: "Number of root accesses (0-10+)" },
  { name: "num_file_creations", label: "File Creations", min: 0, max: 20, type: "number", tooltip: "Number of file creation operations (0-5+)" },
  { name: "num_shells", label: "Shells", min: 0, max: 20, type: "number", tooltip: "Number of shell prompts (0-5+)" },
  { name: "num_access_files", label: "Access Files", min: 0, max: 20, type: "number", tooltip: "Number of operations on access control files (0-5+)" },
  { name: "num_outbound_cmds", label: "Outbound Cmds", min: 0, max: 0, type: "number", tooltip: "Number of outbound commands in an FTP session (always 0)" },
  { name: "is_host_login", label: "Host Login", min: 0, max: 1, type: "number", tooltip: "1 if login belongs to 'hot' list, 0 otherwise" },
  { name: "is_guest_login", label: "Guest Login", min: 0, max: 1, type: "number", tooltip: "1 if guest login, 0 otherwise" },
  { name: "count", label: "Count", min: 0, max: 1000, type: "number", tooltip: "Connections to same host in past 2 seconds (0-1000+)" },
  { name: "srv_count", label: "Service Count", min: 0, max: 1000, type: "number", tooltip: "Connections to same service in past 2 seconds (0-1000+)" },
  { name: "serror_rate", label: "SError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections with SYN errors (0.0-1.0)" },
  { name: "srv_serror_rate", label: "Srv SError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of same service connections with SYN errors (0.0-1.0)" },
  { name: "rerror_rate", label: "RError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections with REJ errors (0.0-1.0)" },
  { name: "srv_rerror_rate", label: "Srv RError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of same service connections with REJ errors (0.0-1.0)" },
  { name: "same_srv_rate", label: "Same Srv Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections to same service (0.0-1.0)" },
  { name: "diff_srv_rate", label: "Diff Srv Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections to different services (0.0-1.0)" },
  { name: "srv_diff_host_rate", label: "Srv Diff Host Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections to different hosts (0.0-1.0)" },
  { name: "dst_host_count", label: "Dst Host Count", min: 0, max: 255, type: "number", tooltip: "Count of connections to same destination (0-255)" },
  { name: "dst_host_srv_count", label: "Dst Host Srv Count", min: 0, max: 255, type: "number", tooltip: "Count of connections to same service at destination (0-255)" },
  { name: "dst_host_same_srv_rate", label: "Dst Host Same Srv Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections to same service at destination (0.0-1.0)" },
  { name: "dst_host_diff_srv_rate", label: "Dst Host Diff Srv Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of different service connections at destination (0.0-1.0)" },
  { name: "dst_host_same_src_port_rate", label: "Dst Host Same Src Port Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections with same source port at destination (0.0-1.0)" },
  { name: "dst_host_srv_diff_host_rate", label: "Dst Host Srv Diff Host Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections to different hosts with same service at destination (0.0-1.0)" },
  { name: "dst_host_serror_rate", label: "Dst Host SError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections with SYN errors at destination (0.0-1.0)" },
  { name: "dst_host_srv_serror_rate", label: "Dst Host Srv SError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of same service connections with SYN errors at destination (0.0-1.0)" },
  { name: "dst_host_rerror_rate", label: "Dst Host RError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of connections with REJ errors at destination (0.0-1.0)" },
  { name: "dst_host_srv_rerror_rate", label: "Dst Host Srv RError Rate", min: 0, max: 1, step: 0.01, type: "number", tooltip: "% of same service connections with REJ errors at destination (0.0-1.0)" }
];

const exampleBinaryInput = [
  "0", "udp", "private", "SF", "45", "44", "0", "0", "0", "0", 
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
  "0", "0", "505", "505", "0.00", "0.00", "0.00", "0.00", 
  "1.00", "0.00", "0.00", "255", "255", "1.00", "0.00", 
  "1.00", "0.00", "0.00", "0.00", "0.00", "0.00"
];

const exampleMultiInput = [
  "0", "icmp", "eco_i", "SF", "20", "0", "0", "0", "0", "0", 
  "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", 
  "0", "0", "1", "65", "0.00", "0.00", "0.00", "0.00", 
  "1.00", "0.00", "1.00", "3", "57", "1.00", "0.00", 
  "1.00", "0.28", "0.00", "0.00", "0.00", "0.00"
];

const NetworkInputForm: React.FC<NetworkInputFormProps> = ({ 
  onSubmit, 
  isProcessing,
  forcedClassification 
}) => {
  const [tab, setTab] = useState<'binary' | 'multi'>(forcedClassification || 'binary');
  const [manualInputValues, setManualInputValues] = useState<string[]>(
    tab === 'binary' ? exampleBinaryInput : exampleMultiInput
  );
  
  // Validation error state
  const [validationErrors, setValidationErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    if (forcedClassification) {
      setTab(forcedClassification);
      setManualInputValues(
        forcedClassification === 'binary' ? exampleBinaryInput : exampleMultiInput
      );
    }
  }, [forcedClassification]);

  const validateInput = (index: number, value: string): string => {
    const metadata = featureMetadata[index];
    
    if (!metadata) return "";

    if (metadata.type === "number") {
      const numValue = parseFloat(value);
      
      // Check if empty
      if (value.trim() === "") {
        return "Required";
      }
      
      // Check if it's a valid number
      if (isNaN(numValue)) {
        return "Must be a number";
      }
      
      // Check min value
      if (metadata.min !== undefined && numValue < metadata.min) {
        return `Min: ${metadata.min}`;
      }
      
      // Check max value
      if (metadata.max !== undefined && numValue > metadata.max) {
        return `Max: ${metadata.max}`;
      }
    } else if (metadata.type === "select" && metadata.options) {
      if (!metadata.options.includes(value)) {
        return "Invalid option";
      }
    }
    
    return "";
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...manualInputValues];
    newValues[index] = value;
    setManualInputValues(newValues);
    
    // Validate the input
    const error = validateInput(index, value);
    setValidationErrors(prev => {
      if (error) {
        return { ...prev, [index]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      }
    });
  };

  const handleTabChange = (value: string) => {
    if (forcedClassification) {
      toast.info(`This page is restricted to ${forcedClassification} classification`);
      return;
    }
    
    const newTab = value as 'binary' | 'multi';
    setTab(newTab);
    
    if (newTab === 'binary') {
      setManualInputValues(exampleBinaryInput);
    } else {
      setManualInputValues(exampleMultiInput);
    }
    
    // Clear validation errors when changing tabs
    setValidationErrors({});
  };

  const handleSubmit = () => {
    // Validate all fields
    const errors: Record<number, string> = {};
    let hasErrors = false;
    
    manualInputValues.forEach((value, index) => {
      const error = validateInput(index, value);
      if (error) {
        errors[index] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setValidationErrors(errors);
      toast.error("Please fix the highlighted errors before submitting");
      return;
    }
    
    onSubmit(manualInputValues, tab);
  };

  const handleQuickTest = () => {
    setValidationErrors({});
    onSubmit(manualInputValues, tab);
  };

  const renderFieldInput = (metadata: any, index: number) => {
    const value = manualInputValues[index] || '';
    const hasError = !!validationErrors[index];
    
    if (metadata.type === "select" && metadata.options) {
      return (
        <div key={`${tab}-${index}`} className="space-y-1">
          <div className="flex items-center space-x-1">
            <label className="text-xs font-medium text-muted-foreground">
              {metadata.label}
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{metadata.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={value} 
            onValueChange={(newValue) => handleInputChange(index, newValue)}
          >
            <SelectTrigger className={`input-field ${hasError ? 'border-red-500' : ''}`}>
              <SelectValue placeholder={`Select ${metadata.label}`} />
            </SelectTrigger>
            <SelectContent>
              {metadata.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasError && <p className="text-xs text-red-500">{validationErrors[index]}</p>}
        </div>
      );
    } else {
      // Numeric input
      return (
        <div key={`${tab}-${index}`} className="space-y-1">
          <div className="flex items-center space-x-1">
            <label className="text-xs font-medium text-muted-foreground">
              {metadata.label}
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{metadata.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            min={metadata.min}
            max={metadata.max}
            step={metadata.step || 1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`${metadata.min}-${metadata.max}`}
            className={`input-field ${hasError ? 'border-red-500' : ''}`}
          />
          {hasError && <p className="text-xs text-red-500">{validationErrors[index]}</p>}
        </div>
      );
    }
  };

  return (
    <Card className="overflow-hidden glass-card">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-1">Network Traffic Data</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Enter traffic data for analysis
        </p>
        
        <Tabs 
          defaultValue={forcedClassification || "binary"} 
          value={tab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger 
              value="binary" 
              className="w-1/2" 
              disabled={forcedClassification === 'multi'}
            >
              Binary Classification
            </TabsTrigger>
            <TabsTrigger 
              value="multi" 
              className="w-1/2"
              disabled={forcedClassification === 'binary'}
            >
              Multi Classification
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="binary" className="mt-0">
            <ScrollArea className="h-[320px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureMetadata.map((metadata, index) => (
                  renderFieldInput(metadata, index)
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="multi" className="mt-0">
            <ScrollArea className="h-[320px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureMetadata.map((metadata, index) => (
                  renderFieldInput(metadata, index)
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      
      <Separator />
      
      <div className="bg-muted/30 p-4 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handleQuickTest}
          disabled={isProcessing}
        >
          Quick Test with Example Data
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isProcessing || Object.keys(validationErrors).length > 0}
        >
          {isProcessing ? 'Processing...' : 'Analyze Traffic'}
        </Button>
      </div>
    </Card>
  );
};

export default NetworkInputForm;
