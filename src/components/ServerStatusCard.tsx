
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

  // Real server status check
  useEffect(() => {
    const checkServer = async () => {
      setServerStatus(prev => ({ ...prev, status: 'checking' }));
      
      const startTime = Date.now();
      
      try {
        console.log('Checking server status at:', `http://${serverStatus.url}`);
        
        // Make actual HTTP request to the server
        const response = await fetch(`http://${serverStatus.url}`, {
          method: 'GET',
          mode: 'cors', // Enable CORS
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const responseTime = Date.now() - startTime;
        
        if (response.ok) {
          console.log('Server is online, response time:', responseTime + 'ms');
          setServerStatus({
            url: 'localhost:3000',
            status: 'online',
            lastChecked: new Date().toLocaleTimeString(),
            responseTime: responseTime
          });
        } else {
          console.log('Server responded with error:', response.status);
          setServerStatus({
            url: 'localhost:3000',
            status: 'offline',
            lastChecked: new Date().toLocaleTimeString(),
            responseTime: 0
          });
        }
      } catch (error) {
        console.log('Server check failed:', error);
        setServerStatus({
          url: 'localhost:3000',
          status: 'offline',
          lastChecked: new Date().toLocaleTimeString(),
          responseTime: 0
        });
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case 'online':
        return <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={4} />;
      case 'offline':
        return <XCircle className="w-12 h-12 text-red-500" strokeWidth={4} />;
      case 'checking':
        return <Clock className="w-12 h-12 text-yellow-500 animate-spin" strokeWidth={4} />;
    }
  };

  const getStatusColor = () => {
    switch (serverStatus.status) {
      case 'online':
        return 'text-green-500';
      case 'offline':
        return 'text-red-500';
      case 'checking':
        return 'text-yellow-500';
    }
  };

  const getCardBorder = () => {
    switch (serverStatus.status) {
      case 'online':
        return 'border-green-500 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]';
      case 'offline':
        return 'border-red-500 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]';
      case 'checking':
        return 'border-yellow-500 shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]';
    }
  };

  return (
    <div className={`bg-white text-black p-8 border-8 ${getCardBorder()} hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px] transition-all duration-200`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Server className="w-8 h-8 text-black" strokeWidth={3} />
          <h2 className="text-3xl font-black uppercase tracking-tighter">SERVER</h2>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="space-y-6">
        <div className="bg-black text-white p-4 font-mono text-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold uppercase">ENDPOINT:</span>
            <span className="text-yellow-400 font-bold">
              {serverStatus.url}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b-4 border-black pb-2">
          <span className="font-black uppercase text-xl">STATUS:</span>
          <span className={`font-black uppercase text-2xl ${getStatusColor()}`}>
            {serverStatus.status}
          </span>
        </div>
        
        {serverStatus.status === 'online' && (
          <div className="flex justify-between items-center border-b-4 border-black pb-2">
            <span className="font-black uppercase text-xl">RESPONSE:</span>
            <span className="text-green-500 font-black text-2xl">
              {serverStatus.responseTime}MS
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="font-black uppercase text-xl">CHECKED:</span>
          <span className="font-bold text-lg">
            {serverStatus.lastChecked}
          </span>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t-4 border-black">
        <div className="flex items-center space-x-4">
          <div className={`w-6 h-6 border-4 border-black ${
            serverStatus.status === 'online' ? 'bg-green-500' : 
            serverStatus.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <span className="font-bold uppercase text-lg">
            {serverStatus.status === 'online' ? 'SYSTEM OPERATIONAL' :
             serverStatus.status === 'offline' ? 'SYSTEM DOWN' :
             'SYSTEM CHECKING...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusCard;
