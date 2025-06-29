
import React from 'react';
import ServerStatusCard from '@/components/ServerStatusCard';
import WeatherCard from '@/components/WeatherCard';
import BackgroundEffects from '@/components/BackgroundEffects';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white border-b-8 border-red-500 pb-4">
              SERVER STATUS
            </h1>
            <div className="bg-yellow-400 text-black p-4 font-bold text-xl uppercase tracking-wide inline-block transform -skew-x-12">
              REAL-TIME MONITORING SYSTEM
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ServerStatusCard />
            <WeatherCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-black p-8 border-8 border-red-500 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
              <h3 className="font-black text-2xl uppercase mb-4 tracking-tight">RESPONSE</h3>
              <div className="text-6xl font-black text-red-500 mb-2">47</div>
              <div className="font-bold uppercase tracking-wide">MILLISECONDS</div>
            </div>
            
            <div className="bg-red-500 text-white p-8 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-2xl uppercase mb-4 tracking-tight">UPTIME</h3>
              <div className="text-6xl font-black mb-2">99.9</div>
              <div className="font-bold uppercase tracking-wide">PERCENT</div>
            </div>
            
            <div className="bg-yellow-400 text-black p-8 border-8 border-blue-600 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
              <h3 className="font-black text-2xl uppercase mb-4 tracking-tight">LOAD</h3>
              <div className="text-6xl font-black text-blue-600 mb-2">LOW</div>
              <div className="font-bold uppercase tracking-wide">SYSTEM STATUS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
