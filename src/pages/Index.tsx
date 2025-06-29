
import React from 'react';
import ServerStatusCard from '@/components/ServerStatusCard';
import WeatherCard from '@/components/WeatherCard';
import BackgroundEffects from '@/components/BackgroundEffects';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <BackgroundEffects />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Server Status Monitor
          </h1>
          <p className="text-xl text-white/80 drop-shadow-sm">
            Real-time server monitoring with glassmorphism design
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-4xl">
          <ServerStatusCard />
          <WeatherCard />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-white font-semibold text-lg mb-2">Response Time</h3>
            <p className="text-3xl font-bold text-green-300">47ms</p>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-white font-semibold text-lg mb-2">Uptime</h3>
            <p className="text-3xl font-bold text-blue-300">99.9%</p>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-white font-semibold text-lg mb-2">Load</h3>
            <p className="text-3xl font-bold text-yellow-300">Low</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
