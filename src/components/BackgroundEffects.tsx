
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-60 h-60 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-40 animate-ping animation-delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-ping animation-delay-3000"></div>
    </div>
  );
};

export default BackgroundEffects;
