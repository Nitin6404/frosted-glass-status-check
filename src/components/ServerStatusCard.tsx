
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Server } from 'lucide-react';

interface ServerStatus {
  url: string;
  status: 'online' | 'offline' | 'checking';
  lastChecked: string;
  responseTime: number;
}

const ServerStatusCard = () => {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    url: 'localhost:3000',
    status: 'checking',
    lastChecked: new Date().toLocaleTimeString(),
    responseTime: 0
  });

  // Simulate server status check
  useEffect(() => {
    const checkServer = () => {
      setServerStatus(prev => ({ ...prev, status: 'checking' }));
      
      // Simulate API call with random result
      setTimeout(() => {
        const isOnline = Math.random() > 0.3; // 70% chance of being online
        const responseTime = Math.floor(Math.random() * 100) + 20;
        
        setServerStatus({
          url: 'localhost:3000',
          status: isOnline ? 'online' : 'offline',
          lastChecked: new Date().toLocaleTimeString(),
          responseTime: isOnline ? responseTime : 0
        });
      }, 1500);
    };

    checkServer();
    const interval = setInterval(checkServer, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case 'online':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'offline':
        return <XCircle className="w-8 h-8 text-red-400" />;
      case 'checking':
        return <Clock className="w-8 h-8 text-yellow-400 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (serverStatus.status) {
      case 'online':
        return 'text-green-400';
      case 'offline':
        return 'text-red-400';
      case 'checking':
        return 'text-yellow-400';
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Server className="w-6 h-6 text-white/80" />
          <h2 className="text-2xl font-bold text-white">Server Status</h2>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Endpoint:</span>
          <span className="text-white font-mono text-sm bg-black/20 px-3 py-1 rounded-lg">
            {serverStatus.url}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Status:</span>
          <span className={`font-semibold capitalize ${getStatusColor()}`}>
            {serverStatus.status}
          </span>
        </div>
        
        {serverStatus.status === 'online' && (
          <div className="flex justify-between items-center">
            <span className="text-white/70">Response Time:</span>
            <span className="text-green-400 font-semibold">
              {serverStatus.responseTime}ms
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Last Checked:</span>
          <span className="text-white/90 text-sm">
            {serverStatus.lastChecked}
          </span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            serverStatus.status === 'online' ? 'bg-green-400 animate-pulse' : 
            serverStatus.status === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'
          }`}></div>
          <span className="text-white/60 text-sm">
            {serverStatus.status === 'online' ? 'Server is healthy' :
             serverStatus.status === 'offline' ? 'Server is unreachable' :
             'Checking server status...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusCard;
