var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("consultation");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const block3Top = block3.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }

    if (block2Top < windowHeight) {
        block2.classList.add('visible_block');
    }

    if (block3Top < windowHeight) {
        block3.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});



document.getElementById("layout_1").classList.add('layout_active_count_block');
document.getElementById("layout_image_1").classList.add('layout_active');


function new_layout(id) {
    var i = 1;

    while (i < 7) {
        try {
            document.getElementById(`layout_${i}`).classList.remove('layout_active_count_block');
            document.getElementById(`layout_image_${i}`).classList.remove('layout_active');
        }
        catch {break;}
        i +=1;
    }

    document.getElementById(`layout_${id}`).classList.add('layout_active_count_block');
    document.getElementById(`layout_image_${id}`).classList.add('layout_active');
}


project_id = new URL(window.location.href).pathname.split('/').pop();

select1 = document.getElementById('complect1')
select2 = document.getElementById('complect2')

complect1 = select1.value
complect2 = select2.value

select1.addEventListener('change', function (e) {
    complect1 = e.target.value;
    change_price();
})

select2.addEventListener('change', function (e) {
    complect2 = e.target.value;
    change_price();
})


function change_price() {
    price = document.getElementById("project_value")

    $.ajax({
        type: "POST",
        url: ajax_url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 5,
            'complect1': complect1,
            'complect2': complect2,
            'project_id': project_id,
        },
        success: (res)=> {

            price.innerHTML = res.price.toLocaleString('ru-RU') + ' РУБ';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
        }
    })
}





function send_estimate() {
    button = document.getElementById("send_estimate_button")
    button.innerHTML = '<div class="loader2"></div>'
    var formData = new FormData();
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var file = document.getElementById("file").files[0];
    var checked = document.getElementById('popup_agreement').checked;
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('checked', checked);
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        if (response.status == 'success') {
            alert('Форма успешно отправлена!');
            document.getElementById("name").value = '';
            document.getElementById("phone").value = '';
            document.getElementById("file").value = '';
            document.getElementById("file_name").value = '';
        }
        else if (response.status == 'not_checked') {
            alert('Пожалуйства, подтвердите пользовательское соглашение!');
        }
        else if (response.status == 'fail') {
            alert('Пожалуйства, заполните все поля и прикрепите смету.');
        }
        button.innerHTML = 'Отправить заявку';
    },
    xhr.send(formData);
}