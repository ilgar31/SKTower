var block1 = document.getElementById("block1");


function animation() {
    const block1Top = block1.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;
    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});



url = window.location.href

csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

function send_review() {
    button = document.getElementById("send_review_button")
    button.innerHTML = '<div class="loader2"></div>'
    var name = document.getElementById("review_name").value;
    var review = document.getElementById("review").value;
    var checked = document.getElementById('review_agreement').checked;
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 3,
            'name': name,
            'review': review,
            'checked': checked,
        },
        success: (res)=> {
            if (res.status == 'success') {
                alert('Форма успешно отправлена!');
                document.getElementById("review_name").value = '';
                document.getElementById("review").value = '';
            }
            else if (res.status == 'not_checked') {
                alert('Пожалуйства, подтвердите пользовательское соглашение!');
            }
            else if (res.status == 'fail') {
                alert('Пожалуйства, заполните все поля.');
            }
            button.innerHTML = 'Оставить отзыв';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуте немного позже.');
            button.innerHTML = 'Оставить отзыв';
        }
    })
}


function send_consultation() {
    button = document.getElementById("send_consultation_button")
    button.innerHTML = '<div class="loader2"></div>'
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var checked = document.getElementById('agreement').checked;
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 2,
            'name': name,
            'phone': phone,
            'checked': checked,
        },
        success: (res)=> {
            if (res.status == 'success') {
                alert('Форма успешно отправлена!');
                document.getElementById("name").value = '';
                document.getElementById("phone").value = '';
            }
            else if (res.status == 'not_checked') {
                alert('Пожалуйства, подтвердите пользовательское соглашение!');
            }
            else if (res.status == 'fail') {
                alert('Пожалуйства, заполните все поля.');
            }
            button.innerHTML = 'Отправить';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуте немного позже.');
            button.innerHTML = 'Отправить';
        }
    })
}