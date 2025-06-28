
import React from "react";
import { RefreshCw } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading }) => {
  return (
    <header className="w-full flex flex-col items-center justify-center py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-kexp-yellow rounded-full flex items-center justify-center">
          <span className="text-kexp-black font-mono font-bold text-xs">KEXP</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          KEXP
          <span className="text-kexp-yellow ml-2">Now Playing</span>
        </h1>
      </div>
      
      <p className="text-muted-foreground max-w-md text-center mb-6">
        Discover what's currently playing on KEXP 90.3FM Seattle, where the music matters.
      </p>
      
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-kexp-yellow text-kexp-black 
                  hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 
                  focus:ring-kexp-yellow focus:ring-opacity-50"
      >
        <RefreshCw 
          size={18} 
          className={`${isLoading ? "animate-spin-slow" : ""}`} 
        />
        <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
      </button>
    </header>
  );
};

export default Header;
