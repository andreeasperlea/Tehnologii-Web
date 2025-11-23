from django.shortcuts import render

def loading(request):
    return render(request, "loading.html")

def register_view(request):
    return render(request, "register.html")

def login_view(request):
    return render(request, "login.html")

def home_view(request):
    return render(request, "home.html")

def ideas_view(request):
    return render(request, "ideas.html")

def chatbot_view(request):
    return render(request, "chatbot.html")

def universities_view(request):
    return render(request, "universities.html")