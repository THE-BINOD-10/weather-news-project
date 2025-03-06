import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "e478c0ce41bc47c4914be780aab46872";

const categories = ["general", "sports", "entertainment", "business", "health", "science", "technology"];

const News = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNewsByLocation();
  }, []);

  const fetchNewsByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchNews(latitude, longitude);
        },
        () => setError("Unable to retrieve your location."),
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
      setError("");
    } catch (err) {
        console.log(err);
        
      setError("Failed to fetch news.");
    }
    setIsLoading(false);
  };

  const fetchNewsByCity = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${city}&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
      setError("");
    } catch (err) {
        console.log(err);
        
      setError("City not found.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="w-full max-w-7xl p-10">
        <header className="bg-blue-600 text-white p-6 text-center text-4xl font-bold rounded-lg mb-6">
          News App
        </header>
        <form onSubmit={fetchNewsByCity} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search city news"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 border rounded-lg text-lg"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">Search</button>
        </form>
        <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); fetchNews(); }}
              className={`px-5 py-3 rounded-lg text-white text-lg ${category === cat ? "bg-blue-600" : "bg-gray-500"}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        {isLoading ? <p className="text-center text-xl my-6">Loading...</p> : null}
        {error ? <p className="text-red-600 text-center text-xl my-6">{error}</p> : null}
        <div className="grid grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-56 object-cover rounded-md" />}
              <h2 className="text-xl font-bold my-3">{article.title}</h2>
              <p className="text-md text-gray-600">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-3 inline-block text-lg font-semibold">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
