from django.shortcuts import render
from django.core.mail import send_mail, EmailMessage
from django.http import JsonResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt


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


@csrf_exempt
def home(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)
    if request.method == 'POST':
        return send_estimate(request)

    return render(request, 'main/home.html')


def about(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)
        if request.POST.get('form_id') == '2':
            return send_consultation(request.POST)

    return render(request, 'main/about.html')


def projects(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/projects.html')


def project(request, pk):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/project.html')


def portfolio(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/portfolio.html')


def finished(request, pk):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/finished.html')


def contacts(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/contacts.html')


def reviews(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)
        if request.POST.get('form_id') == '2':
            return send_consultation(request.POST)
        if request.POST.get('form_id') == '3':
            return send_review(request.POST)

    return render(request, 'main/reviews.html')


def services(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)
        if request.POST.get('form_id') == '2':
            return send_consultation(request.POST)

    return render(request, 'main/services.html')


def favorites(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/favorites.html')


def compare(request):
    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        if request.POST.get('form_id') == '1':
            return send_feedback(request.POST)

    return render(request, 'main/compare.html')
