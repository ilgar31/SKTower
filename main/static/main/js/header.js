document.getElementById('logo').style.marginTop = 0;

document.getElementById('menu').addEventListener('click', e=> {
    document.getElementById('exit').classList.remove('not-visible');
    document.getElementById('menu_block').style.left = "0";
})

document.getElementById('exit').addEventListener('click', e=> {
    document.getElementById('exit').classList.add('not-visible');
    document.getElementById('menu_block').style.left = "100%";
})

document.getElementById("block_buttons").style.opacity = 1;
document.getElementById("block_info").style.marginLeft = '50px';

document.getElementById("mobile_block_buttons").style.opacity = 1;
document.getElementById("mobile_block_info").style.marginLeft = '5%';


document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn1 = document.getElementById('openFormBtn1');
    const openFormBtn2 = document.getElementById('openFormBtn2');
    const openFormBtn3 = document.getElementById('openFormBtn3');
    const openFormBtn4 = document.getElementById('openFormBtn4');
    const popupForm = document.getElementById('popupForm');
    const closeFormBtn = document.getElementById('closeFormBtn');

    openFormBtn1.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    openFormBtn2.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    openFormBtn3.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    openFormBtn4.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });

    closeFormBtn.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });
});

url = window.location.href

csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

function send_feedback() {
    button = document.getElementById("send_feedback_button")
    button.innerHTML = '<div class="loader2"></div>'
    var name = document.getElementById("popup_name").value;
    var email = document.getElementById("popup_email").value;
    var phone = document.getElementById("popup_phone").value;
    var message = document.getElementById("popup_message").value;
    var checked = document.getElementById('popup_agreement').checked;
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 1,
            'name': name,
            'email': email,
            'phone': phone,
            'message': message,
            'checked': checked,
        },
        success: (res)=> {
            if (res.status == 'success') {
                alert('Форма успешно отправлена!');
                document.getElementById("popup_name").value = '';
                document.getElementById("popup_email").value = '';
                document.getElementById("popup_phone").value = '';
                document.getElementById("popup_message").value = '';
                document.getElementById('popupForm').style.display = 'none';
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