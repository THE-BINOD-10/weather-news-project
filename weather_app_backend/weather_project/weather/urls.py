from django.urls import path
from . import views

urlpatterns = [
    path('current/', views.current_weather, name='current_weather'),
    path('search/', views.search_weather, name='search_weather'),
]