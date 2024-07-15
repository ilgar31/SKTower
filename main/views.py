from django.shortcuts import render
from django.core.mail import send_mail, EmailMessage
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from .models import FinishedProjects, Projects


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
                                 ["ilgar.bagishev@gmail.com"])
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
                                 ["ilgar.bagishev@gmail.com"])
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
                                 ["ilgar.bagishev@gmail.com"])
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
                                 ["ilgar.bagishev@gmail.com"])
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
        email = EmailMessage("На сайте S.K.TOWER оставили новый отзыв!",
                             f'''Телефон: {phone}
Тип связи: {phone_type}

Вопрос: Сколько этажей вы хотите в доме?   Ответ: {step1}

Вопрос: Какие размеры дома вы бы хотели?   Ответ: {step2}

Вопрос: Выберете фундамент, который вы бы хотели для своего будущего дома.   Ответ: {step3}

Вопрос: Какой дом вам нужен?   Ответ: {step4}

Вопрос: Выберете тип стен, который вы бы хотели для своего будущего дома.   Ответ: {step5}

Вопрос: Выберете покрытие кровли, которое вы бы хотели для своего будущего дома.   Ответ: {step6}

Вопрос: Выберете отмостку, которую вы бы хотели для своего будущего дома.   Ответ: {step7}

Вопрос: Выберете фасад, который вы бы хотели для своего будущего дома.   Ответ: {step8}''',
                             "sunclub.stor@gmail.com",
                             ["ilgar.bagishev@gmail.com"])
        email.send()
        return JsonResponse({"status": 'success'})
    else:
        return JsonResponse({"status": 'not_checked'})


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


@csrf_exempt
def home(request):
    if request.method == 'POST':
        return send_estimate(request)

    return render(request, 'main/home.html')


def about(request):
    return render(request, 'main/about.html')


def show_more_projects(data):
    count = int(data.get('count'))
    all_projects = Projects.objects.all()
    new_projects = []
    for item in all_projects[count:count+12]:
        new_projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price, 'area': item.total_area})
    if len(all_projects) > count+12:
        more = True
    else:
        more = False
    return JsonResponse({"projects": new_projects, 'more': more})


def sort_projects(data):
    sorted_projects = Projects.objects.all().order_by('total_area')
    print(sorted_projects)
    if data.get('state') == "2":
        sorted_projects = sorted_projects[::-1]

    main_projects = []
    projects = []
    for item in sorted_projects[:6]:
        main_projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price, 'area': item.total_area})
    for item in sorted_projects[6:12]:
        projects.append({'id': item.id, 'image': str(item.images.all()[0]), 'name': item.name, 'price': item.min_price,
                    'area': item.total_area})
    return JsonResponse({"main_projects": main_projects, 'projects': projects})


def projects(request):
    all_projects = Projects.objects.all()
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('type') == 'load_more':
            return show_more_projects(request.POST)
        if request.POST.get('type') == 'sort':
            return sort_projects(request.POST)

    data = {}
    data['main_projects'] = all_projects[:6]
    data['projects'] = all_projects[6:12]
    return render(request, 'main/projects.html', data)


def project(request, pk):
    return render(request, 'main/project.html')


def portfolio(request):
    finished_projects = FinishedProjects.objects.all()
    return render(request, 'main/portfolio.html', {'projects': finished_projects})


def finished(request, pk):
    finished_project = FinishedProjects.objects.get(id=pk)
    return render(request, 'main/finished.html', {'project': finished_project, 'images_count': range(len(finished_project.images.all()))})


def contacts(request):
    return render(request, 'main/contacts.html')


def reviews(request):
    return render(request, 'main/reviews.html')


def services(request):
    return render(request, 'main/services.html')


def favorites(request):
    return render(request, 'main/favorites.html')


def compare(request):
    return render(request, 'main/compare.html')


def agreement(request):
    return render(request, 'main/agreement.html')





