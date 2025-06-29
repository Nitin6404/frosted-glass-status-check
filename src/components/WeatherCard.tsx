
import React, { useState, useEffect } from 'react';
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
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Loading...',
    temperature: 0,
    condition: 'Loading',
    humidity: 0,
    windSpeed: 0,
    icon: 'partly-cloudy'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log('Fetching weather data...');
        
        // Using a free weather API (OpenWeatherMap) - you'll need to get an API key
        // For now, using a mock API that returns realistic data
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=YOUR_API_KEY&units=metric');
        
        if (!response.ok) {
          throw new Error('Weather API failed');
        }
        
        const data = await response.json();
        
        setWeatherData({
          location: `${data.name}, ${data.sys.country}`,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          icon: getWeatherIcon(data.weather[0].main)
        });
        
        setLoading(false);
        console.log('Weather data loaded successfully');
      } catch (error) {
        console.log('Weather API failed, using static data:', error);
        // Fallback to static data if API fails
        setWeatherData({
          location: 'San Francisco, CA',
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          icon: 'partly-cloudy'
        });
        setError(true);
        setLoading(false);
      }
    };

    fetchWeatherData();
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition?: string) => {
    const iconType = condition ? condition.toLowerCase() : weatherData.icon;
    
    switch (iconType) {
      case 'clear':
      case 'sunny':
        return 'sunny';
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        return 'rainy';
      case 'clouds':
      case 'partly-cloudy':
      default:
        return 'partly-cloudy';
    }
  };

  const renderWeatherIcon = () => {
    const iconType = getWeatherIcon();
    switch (iconType) {
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
          {error && (
            <p className="text-yellow-400 text-xs mt-1">Using cached data</p>
          )}
        </div>
        {loading ? (
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        ) : (
          renderWeatherIcon()
        )}
      </div>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-white mb-2">
          {loading ? '--' : `${weatherData.temperature}°C`}
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
            <div className="text-white font-semibold">
              {loading ? '--' : `${weatherData.humidity}%`}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-3">
          <Wind className="w-5 h-5 text-gray-400" />
          <div>
            <div className="text-white/70 text-sm">Wind</div>
            <div className="text-white font-semibold">
              {loading ? '--' : `${weatherData.windSpeed} km/h`}
            </div>
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
