from django.contrib import admin
from .models import FinishedProjects, FinishedProjectImages, Reviews


admin.site.register(Reviews)


class FinishedProjectsImagesInline(admin.TabularInline):
    fk_name = 'project'
    model = FinishedProjectImages


@admin.register(FinishedProjects)
class FinishedProjectsAdmin(admin.ModelAdmin):
    inlines = [FinishedProjectsImagesInline, ]