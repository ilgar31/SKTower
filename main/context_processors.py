from .models import ConactInfo


def get_main_info(request):
    info = ConactInfo.objects.all()
    data = {}
    extra_data = {
        'Основной номер телефона': 'number',
        'Дополнительный номер телефона': 'extra_number', 
        'Адрес': 'address',
        'Электронная почта': 'mail',
        'Сокращенное наименование': 'short_name',
        'Юридический адрес': 'ur_address',
        'Физический адрес': 'phis_address',
        'ОГРНИП': 'ogrnip',
        'ИНН': 'inn',
        'Дата присвоения ОГРНИП': 'data_ogrnip',
        'КПП': 'kpp',
        'Расчетный счет': 'chet',
        'Название банка': 'bank_name',
        'Корреспондентский счет': 'kor_chet',
        'БИК': 'bik',
    }
    
    for i in info:
        name = extra_data[i.name]
        data[name] = i.value
    return data