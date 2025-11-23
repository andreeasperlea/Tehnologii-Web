from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('loading')),  
    path('', include('myapp.urls')),
]
