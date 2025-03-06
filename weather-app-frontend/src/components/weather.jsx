import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const backgroundImage =
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3";

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.log(err);
          setError("Unable to retrieve your location.");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch weather data.");
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError("City not found.");
      setIsLoading(false);
    }
  };

  const getGradientOverlay = () => {
    if (!weather) return "bg-gradient-to-b from-gray-900/20 to-gray-900/20";
    const currentTime = Date.now() / 1000; // Convert to seconds
    return currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset
      ? "bg-gradient-to-b from-orange-500/20 to-yellow-500/20" // Day
      : "bg-gradient-to-b from-blue-900/20 to-gray-900/20"; // Night
  };

  return (
    <div
      className={`w-screen h-screen bg-cover bg-center flex items-center justify-center px-6 ${getGradientOverlay()}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white/40 backdrop-blur-lg rounded-xl p-10 w-full max-w-3xl shadow-2xl mx-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-white font-poppins">
          Weather App
        </h1>
        <form
          onSubmit={fetchWeatherByCity}
          className="mb-6 flex justify-center"
        >
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-3/4 p-3 rounded-lg text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={` text-white px-5 ml-5 rounded-r-lg text-lg transition-colors duration-300`}
          >
            🔍
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-center animate-pulse">{error}</p>
        )}
        {isLoading ? (
          <div className="text-center text-white">
            <i className="fas fa-spinner fa-spin text-8xl my-6"></i>
            <p className="text-xl">Loading weather...</p>
          </div>
        ) : weather ? (
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold font-poppins">{weather.city}</h2>
            <p className="text-xl capitalize mt-2">{weather.description}</p>
            {/* <div className="my-6 animate-fade-in">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-24 h-24 mx-auto"
              />
            </div> */}
            <p className="text-5xl font-semibold">{weather.temperature}°C</p>
            <div className="mt-6 flex justify-center gap-8">
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">Humidity</p>
                <p className="text-xl">{weather.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">Wind Speed</p>
                <p className="text-xl">{weather.wind_speed} m/s</p>
              </div>
            </div>
          </div>
        ) : null}
        <footer className="text-center mt-8 text-white text-sm">
          Powered by{" "}
          <a href="https://openweathermap.org" className="underline">
            OpenWeatherMap
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Weather;
