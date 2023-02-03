from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .forms import ContactForm
from landing_page.settings import RECIPIENTS_EMAIL, DEFAULT_FROM_EMAIL
from django.contrib import messages


#def index(request):
    # если метод GET, вернем форму
#    if request.method == 'GET':
#        form = ContactForm()
#    elif request.method == 'POST':
        # если метод POST, проверим форму и отправим письмо
#        form = ContactForm(request.POST)
#        if form.is_valid():
#            from_email = form.cleaned_data['from_email']
#            message = form.cleaned_data['message']
#            try:
#                send_mail(f'Письмо от {from_email}', message,
#                            DEFAULT_FROM_EMAIL, RECIPIENTS_EMAIL)
#            except BadHeaderError:
#                return HttpResponse('Ошибка.')
#            messages.success(request, 'Спасибо за Ваш запрос! Постараемся ответить Вам как можно скорее!')
#            return HttpResponseRedirect(request.path)
#        else:
#            messages.error(request, 'К сожалению Ваше сообщение не отправлено. Пожалуйста проверьте правильность вводимой информации или попробуйте связаться с нами другим способом. Спасибо!')
#            return HttpResponse('Неверный запрос.')
#    else:
#        messages.error(request, 'К сожалению Ваше сообщение не отправлено. Пожалуйста попробуйте связаться с нами другим способом. Спасибо!')
#        return HttpResponse('Неверный запрос.')
#    return render(request, "index.html", {'form': form})


def index(request):
    # если метод GET, вернем форму
    if request.method == 'GET':
        form = ContactForm()
    elif request.method == 'POST':
        # если метод POST, проверим форму и отправим письмо
        form = ContactForm(request.POST)
        if form.is_valid():
            from_email = form.cleaned_data['from_email']
            message = form.cleaned_data['message']
            REPLY_EMAIL = [from_email]
            try:
                send_mail(f'Письмо от {from_email}', message, DEFAULT_FROM_EMAIL, RECIPIENTS_EMAIL)
                send_mail('Спасибо за запрос', f'Ваш запрос успешно получен.\n\n"{message}"\n\nМы ответим на него в самое ближайшее время.\n\n\n\nС уважением ООО "Амалуна.', DEFAULT_FROM_EMAIL, REPLY_EMAIL)
            except BadHeaderError:
                return HttpResponse('Ошибка.')
            messages.success(
                request, 'Спасибо за Ваш запрос! Постараемся ответить Вам как можно скорее!')
            return HttpResponseRedirect(request.path)
        else:
            messages.error(
                request, 'К сожалению Ваше сообщение не отправлено. Пожалуйста проверьте правильность вводимой информации или попробуйте связаться с нами другим способом. Спасибо!')
            return HttpResponse('Неверный запрос.')
    else:
        messages.error(
            request, 'К сожалению Ваше сообщение не отправлено. Пожалуйста попробуйте связаться с нами другим способом. Спасибо!')
        return HttpResponse('Неверный запрос.')
    return render(request, "index.html", {'form': form})
