from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('projects', views.projects, name='projects'),
    path("project/<int:pk>", views.project, name="project"),
    path('portfolio', views.portfolio, name='portfolio'),
    path('finished/<int:pk>', views.finished, name='finished'),
    path('contacts', views.contacts, name='contacts'),
    path('reviews', views.reviews, name='reviews'),
    path('services', views.services, name='services'),
    path('favorites', views.favorites, name='favorites'),
    path('compare', views.compare, name='compare'),
    path('agreement', views.agreement, name='agreement')
]
