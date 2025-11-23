from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home_view, name='home'),
    path('loading/', views.loading, name='loading'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('ideas/', views.ideas_view, name='ideas'),
    path('chatbot/', views.chatbot_view, name='chatbot'),
    path('universities/', views.universities_view, name='universities'),
]
