from django.contrib import admin
from .models import FinishedProjects, FinishedProjectImages, Reviews, Projects, ProjectPrices, ProjectLayouts, \
    ProjectImages, MakeSale, ConactInfo, OfferSale, Articles


admin.site.register(Reviews)
admin.site.register(MakeSale)
admin.site.register(ConactInfo)
admin.site.register(OfferSale)
admin.site.register(Articles)


class FinishedProjectsImagesInline(admin.TabularInline):
    fk_name = 'project'
    model = FinishedProjectImages


class ProjectImagesInline(admin.TabularInline):
    fk_name = 'project'
    model = ProjectImages


class ProjectLayoutsInline(admin.TabularInline):
    fk_name = 'project'
    model = ProjectLayouts


class ProjectPricesInline(admin.TabularInline):
    fk_name = 'project'
    model = ProjectPrices


@admin.register(FinishedProjects)
class FinishedProjectsAdmin(admin.ModelAdmin):
    inlines = [FinishedProjectsImagesInline, ]


@admin.register(Projects)
class FinishedProjectsAdmin(admin.ModelAdmin):
    inlines = [ProjectImagesInline, ProjectLayoutsInline, ProjectPricesInline]
