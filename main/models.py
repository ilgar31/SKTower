from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime


class Projects(models.Model):
    name = models.CharField(verbose_name='Название объекта', max_length=100, blank=True)
    description = models.CharField(verbose_name='Описание объекта', max_length=1000, blank=True)
    total_area = models.IntegerField(verbose_name='Общая прощадь', blank=True)
    living_area = models.IntegerField(verbose_name='Жилая прощадь', blank=True)
    price = models.IntegerField(verbose_name="Цена базовой комплектации", blank=True)
    bedrooms = models.IntegerField(verbose_name="Количество спален", blank=True)
    bathroom = models.IntegerField(verbose_name="Количество санузлов", blank=True)
    floors = models.IntegerField(verbose_name="Количество этажей", blank=True)
    terrace = models.BooleanField(verbose_name="Наличие террасы", blank=True)

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
    deadlines = models.IntegerField(verbose_name='Срок выполнения', blank=True)
    object_name = models.CharField(verbose_name='Название объекта', max_length=100, blank=True)
    total_area = models.IntegerField(verbose_name='Общая прощадь', blank=True)
    living_area = models.IntegerField(verbose_name='Жилая прощадь', blank=True)
    address = models.CharField(verbose_name='Адрес', max_length=150, default='')
    wall_material = models.CharField(verbose_name='Материал стен', max_length=100, blank=True)
    equipment = models.CharField(verbose_name='Комплектация', max_length=100, blank=True)
    reviewer_name = models.CharField(verbose_name='Имя клиента', max_length=100, default='')
    review = models.CharField(verbose_name='Отзыв клиента', max_length=1000, default='')

    def __str__(self):
        return f'{self.object_name} ({self.address})'

    class Meta:
        verbose_name = "Готовый проект"
        verbose_name_plural = "Готовые проекты"


def finished_project_img_save(instance, filename):
    return f'main/png/finished_projects/{instance.project.object_name}/{filename}'


class FinishedProjectImages(models.Model):
    project = models.ForeignKey(FinishedProjects, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=finished_project_img_save)

    def __str__(self):
        return f'{self.image}'


class Reviews(models.Model):
    reviewer_name = models.CharField(verbose_name='Имя клиента', max_length=100, blank=True)
    review = models.CharField(verbose_name='Отзыв', max_length=2000, blank=True)
    review_date = models.DateTimeField(verbose_name='Дата отзыва', default=datetime.now, blank=True)

    def __str__(self):
        return f'Отзыв от {self.reviewer_name}'

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"