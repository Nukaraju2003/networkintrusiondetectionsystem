
import { Shield, Menu, Home, Info, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NetworkHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-blue-600/95 to-indigo-700/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 animate-fade-in shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/30 animate-pulse-slow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Advanced Network Intrusion Detection</h1>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button 
                    variant="ghost" 
                    className={`text-white hover:bg-white/20 hover:text-white ${isActive('/') ? 'bg-white/20' : ''}`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/binary-classification">
                  <Button 
                    variant="ghost" 
                    className={`text-white hover:bg-white/20 hover:text-white ${isActive('/binary-classification') ? 'bg-white/20' : ''}`}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Binary Analysis
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/multi-classification">
                  <Button 
                    variant="ghost" 
                    className={`text-white hover:bg-white/20 hover:text-white ${isActive('/multi-classification') ? 'bg-white/20' : ''}`}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Multi Analysis
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about">
                  <Button 
                    variant="ghost" 
                    className={`text-white hover:bg-white/20 hover:text-white ${isActive('/about') ? 'bg-white/20' : ''}`}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="hidden lg:flex">
            <span className="text-sm flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <span className="status-dot status-dot-normal animate-pulse-slow mr-2"></span>
              System Active
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-lg mt-1 py-2 px-6 border-b border-white/10 animate-fade-in shadow-lg md:hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
            <Link to="/" className="p-3 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-sm font-medium text-white flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </p>
            </Link>
            <Link to="/binary-classification" className="p-3 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-sm font-medium text-white flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Binary Analysis
              </p>
            </Link>
            <Link to="/multi-classification" className="p-3 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-sm font-medium text-white flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Multi Analysis
              </p>
            </Link>
            <Link to="/about" className="p-3 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-sm font-medium text-white flex items-center">
                <Info className="h-4 w-4 mr-2" />
                About
              </p>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NetworkHeader;
