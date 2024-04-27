from django.shortcuts import render


def home(requests):
    return render(requests, 'main/home.html')
