from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime


class Projects(models.Model):
    name = models.CharField(name='Название объекта', max_length=100, blank=True)
    description = models.CharField(name='Описание объекта', max_length=1000, blank=True)
    living_area = models.IntegerField(name='Жилая прощадь', blank=True)
    total_area = models.IntegerField(name='Общая прощадь', blank=True)
    # СПРОСИТЬ ПРО ЗАВИСИМОСТЬ ЦЕНЫ ОТ КОМПЛЕКТАЦИИ

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


def img_save(instance, filename):
    return f'main/png/projects/{instance.project.name}/{filename}'


class ProjectImages(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=img_save)

    def __str__(self):
        return f'{self.image}'


class ProjectLayouts(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="layouts")
    layout = models.ImageField(upload_to=img_save)

    def __str__(self):
        return f'{self.layout}'


class FinishedProjects(models.Model):
    name = models.CharField(name='Название объекта', max_length=100, blank=True)
    description = models.CharField(name='Описание объекта', max_length=1000, blank=True)
    # СПРОСИТЬ ПРО ОПИСАНИЕ ГОТОВОГО ОБЪЕКТА
    review = models.CharField(name='Отзыв заказчика', max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


def finished_project_img_save(instance, filename):
    return f'main/png/finished_projects/{instance.project.name}/{filename}'


class FinishedProjectImages(models.Model):
    project = models.ForeignKey(FinishedProjects, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=finished_project_img_save)

    def __str__(self):
        return f'{self.image}'
