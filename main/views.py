from django.shortcuts import render
from django.core.mail import send_mail, EmailMessage
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from .models import FinishedProjects, Projects, MakeSale, Reviews, OfferSale
import json


def send_feedback(data):
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')
    checked = data.get('checked')
    if checked == "true":
        if name and email and phone and message:
            email = EmailMessage("На сайте S.K.TOWER оставили данные для обратной связи",
                                 f"Имя: {name} \nНомер телефона: {phone} \nEmail: {email} \nСообщение: {message} \n",
                                 "sunclub.stor@gmail.com",
                                 ["s.k.tower@mail.ru"])
            email.send()
            return JsonResponse({"status": 'success'})
        else:
            return JsonResponse({"status": 'fail'})
    else:
        return JsonResponse({"status": 'not_checked'})


def send_estimate(data):
    name = data.POST.get('name')
    phone = data.POST.get('phone')
    file = data.FILES.get('file')
    checked = data.POST.get('checked')
    if checked == "true":
        if name and phone and file:
            email = EmailMessage("На сайте S.K.TOWER оставили данные для обратной связи",
                                 f"Имя: {name} \nНомер телефона: {phone} \n",
                                 "sunclub.stor@gmail.com",
                                 ["s.k.tower@mail.ru"])
            email.attach(file.name, file.read(), file.content_type)
            email.send()
            return JsonResponse({"status": 'success'})
        else:
            return JsonResponse({"status": 'fail'})
    else:
        return JsonResponse({"status": 'not_checked'})


def send_consultation(data):
    name = data.get('name')
    phone = data.get('phone')
    checked = data.get('checked')
    if checked == "true":
        if name and phone:
            email = EmailMessage("На сайте S.K.TOWER оставили данные для обратной связи",
                                 f"Имя: {name} \nНомер телефона: {phone} \n",
                                 "sunclub.stor@gmail.com",
                                 ["s.k.tower@mail.ru"])
            email.send()
            return JsonResponse({"status": 'success'})
        else:
            return JsonResponse({"status": 'fail'})
    else:
        return JsonResponse({"status": 'not_checked'})


def send_review(data):
    name = data.get('name')
    review = data.get('review')
    checked = data.get('checked')
    if checked == "true":
        if name and review:
            email = EmailMessage("На сайте S.K.TOWER оставили новый отзыв!",
                                 f"Имя: {name} \nОтзыв: {review} \n",
                                 "sunclub.stor@gmail.com",
                                 ["s.k.tower@mail.ru"])
            email.send()
            return JsonResponse({"status": 'success'})
        else:
            return JsonResponse({"status": 'fail'})
    else:
        return JsonResponse({"status": 'not_checked'})


def send_calculator(data):
    phone = data.get('phone')
    phone_type = data.get('phone_type')
    step1 = data.get('step1')
    step2 = data.get('step2')
    step3 = data.get('step3')
    step4 = data.get('step4')
    step5 = data.get('step5')
    step6 = data.get('step6')
    step7 = data.get('step7')
    step8 = data.get('step8')
    checked = data.get('checked')
    if checked == "true":
        email = EmailMessage("На сайте S.K.TOWER оставили заявку на подсчет дома!",
                             f'''Телефон: {phone}
Тип связи: {phone_type}

Этажей: {step1}

Размеры дома: {step2}

Фундамент: {step3}

Тип стен: {step4}

Покрытие кровли: {step5}

Отмостка: {step6}

Фасад: {step7}''',
                             "sunclub.stor@gmail.com",
                             ["s.k.tower@mail.ru"])
        email.send()
        return JsonResponse({"status": 'success'})
    else:
        return JsonResponse({"status": 'not_checked'})


def change_price(data):
    complect1 = data.get('complect1')
    complect2 = data.get('complect2')

    project = Projects.objects.get(id=int(data.get('project_id')))

    for price in project.prices.all():
        if price.equipment == complect1 and price.type_of_walls == complect2:
            return JsonResponse({"price": price.price})


def forms(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)
        if request.POST.get('form_id') == '2':
            return send_consultation(request.POST)
        if request.POST.get('form_id') == '3':
            return send_review(request.POST)
        if request.POST.get('form_id') == '4':
            return send_calculator(request.POST)
        if request.POST.get('form_id') == '5':
            return change_price(request.POST)
    

@csrf_exempt
def home(request):
    if request.method == 'POST':
        return send_estimate(request)
    
    sale = OfferSale.objects.all()
    sales = list(filter(lambda x: x.status, sale))

    try:
        home_projects = list(filter(lambda x: x.id in [7, 13, 5, 3], Projects.objects.all()))
    except:
        home_projects = Projects.objects.all()[:4]

    return render(request, 'main/home.html', {'projects': home_projects, "sales": sales})


def about(request):
    return render(request, 'main/about.html')


def sort_data(data):
    if data.get('sort_key') == 'area':
        if data.get('state') == "2":
            sorted_projects = Projects.objects.all().order_by('-total_area')
        else:
            sorted_projects = Projects.objects.all().order_by('total_area')
    else:
        if data.get('state') == "2":
            sorted_projects = Projects.objects.all().order_by('-min_price')
        else:
            sorted_projects = Projects.objects.all().order_by('min_price')


    return sorted_projects


def filter_data(data, projects):
    filters = json.loads(data.get('filter_data'))

    total_area_from = filters['total_area_from']
    total_area_to = filters['total_area_to']
    living_area_from = filters['living_area_from']
    living_area_to = filters['living_area_to']
    floors_from = filters['floors_from']
    floors_to = filters['floors_to']
    bedrooms_from = filters['bedrooms_from']
    bedrooms_to = filters['bedrooms_to']
    bathroom_from = filters['bathroom_from']
    bathroom_to = filters['bathroom_to']
    terrace = filters['terrace']

    if total_area_from:
        projects = projects.filter(total_area__gte=total_area_from)
    if total_area_to:
        projects = projects.filter(total_area__lte=total_area_to)
    if living_area_from:
        projects = projects.filter(living_area__gte=living_area_from)
    if living_area_to:
        projects = projects.filter(living_area__lte=living_area_to)
    if floors_from:
        projects = projects.filter(floors__gte=floors_from)
    if floors_to:
        projects = projects.filter(floors__lte=floors_to)
    if bedrooms_from:
        projects = projects.filter(bedrooms__gte=bedrooms_from)
    if bedrooms_to:
        projects = projects.filter(bedrooms__lte=bedrooms_to)
    if bathroom_from:
        projects = projects.filter(bathroom__gte=bathroom_from)
    if bathroom_to:
        projects = projects.filter(bathroom__lte=bathroom_to)
    if terrace != "":
        terrace_value = True if terrace == 'true' else False
        projects = projects.filter(terrace=terrace_value)

    return projects


def show_more_projects(data):
    count = int(data.get('count'))

    if data.get('sort_key'):
        projects = sort_data(data)
    else:
        projects = Projects.objects.all()

    if data.get('filter'):
        projects = filter_data(data, projects)

    new_projects = []
    for item in projects[count:count+12]:
        new_projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price, 'area': item.total_area})
    if len(projects) > count+12:
        more = True
    else:
        more = False
    return JsonResponse({"projects": new_projects, 'more': more})


def sort_projects(data):
    sorted_projects = sort_data(data)

    if data.get('filter'):
        sorted_projects = filter_data(data, sorted_projects)

    main_projects = []
    projects = []
    for item in sorted_projects[:6]:
        main_projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price, 'area': item.total_area})
    for item in sorted_projects[6:12]:
        projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price,
                    'area': item.total_area})
    return JsonResponse({"main_projects": main_projects, 'projects': projects, 'more': len(sorted_projects) > 12, 'fail': len(main_projects) == 0})


def filter_projects(data):
    if data.get('sort_key'):
        projects = sort_data(data)
    else:
        projects = Projects.objects.all()

    filter_projects_mas = filter_data(data, projects)
    main_projects = []
    projects = []
    for item in filter_projects_mas[:6]:
        main_projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price, 'area': item.total_area})
    for item in filter_projects_mas[6:12]:
        projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price,
                    'area': item.total_area})
    return JsonResponse({"main_projects": main_projects, 'projects': projects, 'more': len(filter_projects_mas) > 12, 'fail': len(main_projects) == 0})


def projects(request):
    all_projects = Projects.objects.all()
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('type') == 'load_more':
            return show_more_projects(request.POST)
        if request.POST.get('type') == 'sort':
            return sort_projects(request.POST)
        if request.POST.get('type') == 'filter':
            return filter_projects(request.POST)

    data = {}
    data['main_projects'] = all_projects[:6]
    data['projects'] = all_projects[6:12]
    return render(request, 'main/projects.html', data)


def project(request, pk):
    project = Projects.objects.get(id=pk)
    layouts_images = map(lambda x: (x[0] + 1, x[1]), enumerate(project.layouts.all()))

    equipments = []
    types_walls = []
    for price in project.prices.all():
        if price.equipment not in equipments:
            equipments.append(price.equipment)
        if price.type_of_walls not in types_walls:
            types_walls.append(price.type_of_walls)

    sales = MakeSale.objects.all()
    return render(request, 'main/project.html', {'project': project, 'images_count': range(len(project.images.all())), 'layouts_count': map(lambda x: x + 1, range(len(project.layouts.all()))), 'layouts_len': len(project.layouts.all()),
                                                 'layouts': layouts_images, 'equipments': equipments, 'types_walls': types_walls, 'sales': sales})


def portfolio(request):
    finished_projects = FinishedProjects.objects.all()
    return render(request, 'main/portfolio.html', {'projects': finished_projects})


def finished(request, pk):
    finished_project = FinishedProjects.objects.get(id=pk)
    return render(request, 'main/finished.html', {'project': finished_project, 'images_count': range(len(finished_project.images.all()))})


def contacts(request):
    return render(request, 'main/contacts.html')


def reviews(request):
    reviews = Reviews.objects.all()
    return render(request, 'main/reviews.html', {'reviews': reviews})


def services(request):
    return render(request, 'main/services.html')


def favorites(request):
    all_projects = Projects.objects.all()
    return render(request, 'main/favorites.html', {'projects': all_projects})


def compare(request):
    all_projects = Projects.objects.all()
    return render(request, 'main/compare.html', {'projects': all_projects})


def agreement(request):
    return render(request, 'main/agreement.html')





