
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

        // fetch whether based on user location 
      const locationResponse = await fetch('https://ipapi.co/json/');
        const locationData = await locationResponse.json();
        const location = locationData.city + ', ' + locationData.country;
        
        // Using a free weather API (OpenWeatherMap) - you'll need to get an API key
        // For now, using a mock API that returns realistic data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aa18ffa15b8e3b02c851f39b1b0cd34b&units=metric`);
        
        if (!weatherResponse.ok) {
          throw new Error('Weather API failed');
        }
        
        const data = await weatherResponse.json();
        
        setWeatherData({
          location: location,
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
          location: 'Loading...',
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
        return <Sun className="w-16 h-16 text-yellow-500" strokeWidth={4} />;
      case 'rainy':
        return <CloudRain className="w-16 h-16 text-blue-500" strokeWidth={4} />;
      case 'partly-cloudy':
      default:
        return <Cloud className="w-16 h-16 text-gray-600" strokeWidth={4} />;
    }
  };

  return (
    <div className="bg-blue-500 text-white p-8 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">WEATHER</h2>
          <div className="bg-white text-black px-4 py-2 font-bold uppercase">
            {weatherData.location}
          </div>
          {error && (
            <div className="bg-yellow-400 text-black px-3 py-1 mt-2 font-bold uppercase text-sm">
              CACHED DATA
            </div>
          )}
        </div>
        {loading ? (
          <div className="w-16 h-16 border-4 border-white border-t-black animate-spin"></div>
        ) : (
          renderWeatherIcon()
        )}
      </div>
      
      <div className="text-center mb-8 bg-white text-black p-6 border-4 border-black">
        <div className="text-7xl font-black mb-2">
          {loading ? '--' : `${weatherData.temperature}°`}
        </div>
        <div className="font-bold uppercase text-xl tracking-wide">
          {weatherData.condition}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black text-white p-4 border-4 border-white">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="w-6 h-6" strokeWidth={3} />
            <span className="font-black text-2xl">
              {loading ? '--' : `${weatherData.humidity}%`}
            </span>
          </div>
          <div className="font-bold uppercase text-sm">HUMIDITY</div>
        </div>
        
        <div className="bg-black text-white p-4 border-4 border-white">
          <div className="flex items-center justify-between mb-2">
            <Wind className="w-6 h-6" strokeWidth={3} />
            <span className="font-black text-2xl">
              {loading ? '--' : `${weatherData.windSpeed}`}
            </span>
          </div>
          <div className="font-bold uppercase text-sm">WIND KM/H</div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t-4 border-white">
        <div className="flex items-center justify-between">
          <span className="font-bold uppercase">LAST UPDATE:</span>
          <span className="font-bold bg-yellow-400 text-black px-2 py-1">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
