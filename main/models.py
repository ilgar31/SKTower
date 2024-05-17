from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime


class Projects(models.Model):
    name = models.CharField(name='Название объекта', max_length=100, blank=True)
    description = models.CharField(name='Описание объекта', max_length=1000, blank=True)
    total_area = models.IntegerField(name='Общая прощадь', blank=True)
    living_area = models.IntegerField(name='Жилая прощадь', blank=True)
    price = models.IntegerField(name="Цена базовой комплектации", blank=True)
    bedrooms = models.IntegerField(name="Количество спален", blank=True)
    bathroom = models.IntegerField(name="Количество санузлов", blank=True)
    floors = models.IntegerField(name="Количество этажей", blank=True)
    terrace = models.BooleanField(name="Наличие террасы", blank=True)

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
    living_area = models.IntegerField(name='Жилая прощадь', blank=True)
    address = models.CharField(name='Адрес', max_length=150, blank=True)
    wall_material = models.CharField(name='Материал стен', max_length=100, blank=True)
    equipment = models.CharField(name='Комплектация', max_length=100, blank=True)
    reviewer_name = models.CharField(name='Имя клиента', max_length=100, blank=True)
    review = models.CharField(name='Отзыв клиента', max_length=1000)

    def __str__(self):
        return f'{self.name}    {self.address}'

    class Meta:
        verbose_name = "Готовый проект"
        verbose_name_plural = "Готовые проекты"


def finished_project_img_save(instance, filename):
    return f'main/png/finished_projects/{instance.project.name}/{filename}'


class FinishedProjectImages(models.Model):
    project = models.ForeignKey(FinishedProjects, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=finished_project_img_save)

    def __str__(self):
        return f'{self.image}'


class Reviews(models.Model):
    reviewer_name = models.CharField(name='Имя клиента', max_length=100, blank=True)
    review = models.CharField(name='Отзыв', max_length=2000, blank=True)

    def __str__(self):
        return f'Отзыв от {self.reviewer_name}'

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"