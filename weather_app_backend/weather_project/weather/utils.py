import requests
from django.conf import settings

def fetch_weather(city_name):
    """
    Fetches weather data for a given city from OpenWeatherMap API.

    Args:
        city_name (str): The name of the city to fetch weather data for.

    Returns:
        dict: A dictionary containing the current weather data for the given city.
    """
    api_key = settings.OPENWEATHERMAP_API_KEY
    api_url = settings.OPENWEATHERMAP_API_URL
    url = f"{api_url}?q={city_name}&appid={api_key}&units=metric"
    
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None