
import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherCard = () => {
  // Static weather data
  const weatherData: WeatherData = {
    location: 'San Francisco, CA',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-cloudy'
  };

  const getWeatherIcon = () => {
    switch (weatherData.icon) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case 'rainy':
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      case 'partly-cloudy':
      default:
        return <Cloud className="w-12 h-12 text-gray-300" />;
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Current Weather</h2>
          <p className="text-white/70">{weatherData.location}</p>
        </div>
        {getWeatherIcon()}
      </div>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-white mb-2">
          {weatherData.temperature}°C
        </div>
        <div className="text-white/80 text-lg">
          {weatherData.condition}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
          <Droplets className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-white/70 text-sm">Humidity</div>
            <div className="text-white font-semibold">{weatherData.humidity}%</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
          <Wind className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-white/70 text-sm">Wind</div>
            <div className="text-white font-semibold">{weatherData.windSpeed} km/h</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Last updated:</span>
          <span className="text-white/80">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
