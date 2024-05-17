from django.shortcuts import render


def home(requests):
    return render(requests, 'main/home.html')


def about(requests):
    return render(requests, 'main/about.html')


def projects(requests):
    return render(requests, 'main/projects.html')


def project(requests, pk):
    return render(requests, 'main/project.html')


def portfolio(requests):
    return render(requests, 'main/portfolio.html')


def finished(requests, pk):
    return render(requests, 'main/finished.html')


def contacts(requests):
    return render(requests, 'main/contacts.html')


def reviews(requests):
    return render(requests, 'main/reviews.html')


def services(requests):
    return render(requests, 'main/services.html')


def favorites(requests):
    return render(requests, 'main/favorites.html')


def compare(requests):
    return render(requests, 'main/compare.html')
