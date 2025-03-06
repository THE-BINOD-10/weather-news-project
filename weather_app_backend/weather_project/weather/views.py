from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import fetch_weather

@api_view(['GET'])
def current_weather(request):
    """
    Fetches the current weather for a given city.

    Args:
        request (Request): A django rest framework request object.

    Returns:
        Response: A django rest framework response object containing the current weather data in JSON format.

    Raises:
        HTTPError: If the required city name is not provided or if the weather data fetch fails.
    """
    city_name = request.GET.get('city', None)
    if not city_name:
        return Response({'error': 'City name is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    weather_data = fetch_weather(city_name)
    if weather_data:
        return Response({
            'city': city_name,
            'temperature': weather_data['main']['temp'],
            'description': weather_data['weather'][0]['description'],
            'humidity': weather_data['main']['humidity'],
            'wind_speed': weather_data['wind']['speed'],
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Failed to fetch weather data. Please check the city name or API key.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def search_weather(request):
    """
    Searches for the current weather of a given city.

    Args:
        request (Request): A django rest framework request object.

    Returns:
        Response: A django rest framework response object containing the current weather data in JSON format.

    Raises:
        HTTPError: If the required city name is not provided or if the weather data fetch fails.
    """  
    city_name = request.GET.get('city', None)
    if not city_name:
        return Response({'error': 'City name is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    weather_data = fetch_weather(city_name)
    if weather_data:
        return Response({
            'city': city_name,
            'temperature': weather_data['main']['temp'],
            'description': weather_data['weather'][0]['description'],
            'humidity': weather_data['main']['humidity'],
            'wind_speed': weather_data['wind']['speed'],
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Failed to fetch weather data. Please check the city name or API key.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


