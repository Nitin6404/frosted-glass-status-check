
import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Brutalist geometric shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-red-500 border-8 border-black transform rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-400 border-8 border-black"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-500 border-4 border-white transform rotate-12"></div>
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-green-500 border-6 border-black transform -rotate-12"></div>
      
      {/* Bold stripes */}
      <div className="absolute top-0 left-1/4 w-2 h-full bg-red-500 opacity-30"></div>
      <div className="absolute top-0 right-1/3 w-4 h-full bg-yellow-400 opacity-20"></div>
      
      {/* Industrial grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffects;
