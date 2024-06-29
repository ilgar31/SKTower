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

document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn1 = document.getElementById('calculator_open1');
    const openFormBtn2 = document.getElementById('calculator_open2');
    const openFormBtn3 = document.getElementById('calculator_open3');
    const calculator = document.getElementById('calculator');
    const closeFormBtn = document.getElementById('calculator_close');

    openFormBtn1.addEventListener('click', () => {
        calculator.style.display = 'flex';
    });

    openFormBtn2.addEventListener('click', () => {
        calculator.style.display = 'flex';
    });

    try {
        openFormBtn3.addEventListener('click', () => {
            calculator.style.display = 'flex';
        });
    }
    catch {}

    closeFormBtn.addEventListener('click', () => {
        calculator.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === calculator) {
            calculator.style.display = 'none';
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
            alert('Извините, что-то пошло не так, попройбуте немного позже.');
            button.innerHTML = 'Отправить';
        }
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function next_step(step, button=false) {
    if (button) {
        if (!check(step - 1)) {
            step_error = document.getElementById(`step_error${step-1}`);
            if (typeof step_error.textContent !== "undefined") {
                step_error.textContent = 'Не выбран ни один пункт';
            } else {
                step_error.innerText = 'Не выбран ни один пункт';
            }
            step_error.style.paddingTop = '10px';
            step_error.style.paddingBottom = '10px';
            return;
        }
    }
    step_error = document.getElementById(`step_error${step-1}`);
    step_error.style.paddingTop = '0px';
    step_error.style.paddingBottom = '0px';
    if (typeof step_error.textContent !== "undefined") {
        step_error.textContent = '';
    } else {
        step_error.innerText = '';
    }
    await delay(500);
    document.getElementById(`step${step - 1}`).classList.remove('select');
    document.getElementById(`step${step}`).classList.add('select');
    if (step == 9) {
        document.getElementById(`step${step}`).style.display = "flex";
    }
}


async function old_step(step) {
    await delay(500);
    document.getElementById(`step${step + 1}`).classList.remove('select');
    document.getElementById(`step${step}`).classList.add('select');
}


function check(step) {
    if (step == 1) {
        step_1_1 = document.getElementById('step_1_1');
        step_1_2 = document.getElementById('step_1_2');
        step_1_3 = document.getElementById('step_1_3');
        step_1_4 = document.getElementById('step_1_4');
        return step_1_1.checked || step_1_2.checked || step_1_3.checked || step_1_4.checked;
    }
    if (step == 2) {
        step_2_1 = document.getElementById('step_2_1');
        step_2_2 = document.getElementById('step_2_2');
        step_2_3 = document.getElementById('step_2_3');
        step_2_4 = document.getElementById('step_2_4');
        return step_2_1.checked || step_2_2.checked || step_2_3.checked || step_2_4.checked;
    }
    if (step == 3) {
        step_3_1 = document.getElementById('step_3_1');
        step_3_2 = document.getElementById('step_3_2');
        step_3_3 = document.getElementById('step_3_3');
        step_3_4 = document.getElementById('step_3_4');
        step_3_5 = document.getElementById('step_3_5');
        return step_3_1.checked || step_3_2.checked || step_3_3.checked || step_3_4.checked || step_3_5.checked;
    }
    if (step == 4) {
        step_4_1 = document.getElementById('step_4_1');
        step_4_2 = document.getElementById('step_4_2');
        step_4_3 = document.getElementById('step_4_3');
        step_4_4 = document.getElementById('step_4_4');
        return step_4_1.checked || step_4_2.checked || step_4_3.checked || step_4_4.checked;
    }
    if (step == 5) {
        step_5_1 = document.getElementById('step_5_1');
        step_5_2 = document.getElementById('step_5_2');
        return step_5_1.checked || step_5_2.checked;
    }
    if (step == 6) {
        step_6_1 = document.getElementById('step_6_1');
        step_6_2 = document.getElementById('step_6_2');
        step_6_3 = document.getElementById('step_6_3');
        step_6_4 = document.getElementById('step_6_4');
        step_6_5 = document.getElementById('step_6_5');
        return step_6_1.checked || step_6_2.checked || step_6_3.checked || step_6_4.checked || step_6_5.checked;
    }
    if (step == 7) {
        step_7_1 = document.getElementById('step_7_1');
        step_7_2 = document.getElementById('step_7_2');
        step_7_3 = document.getElementById('step_7_3');
        return step_7_1.checked || step_7_2.checked || step_7_3.checked;
    }
    if (step == 8) {
        step_8_1 = document.getElementById('step_8_1');
        step_8_2 = document.getElementById('step_8_2');
        step_8_3 = document.getElementById('step_8_3');
        step_8_4 = document.getElementById('step_8_4');
        step_8_5 = document.getElementById('step_8_5');
        return step_8_1.checked || step_8_2.checked || step_8_3.checked || step_8_4.checked || step_8_5.checked;
    }
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        let contactMethod = this.getAttribute('data-contact');
        let inputPlaceholder = '';

        switch(contactMethod) {
            case 'WhatsApp':
                inputPlaceholder = 'Ваш телефон в WhatsApp';
                break;
            case 'Viber':
                inputPlaceholder = 'Ваш телефон в Viber';
                break;
            case 'Telegram':
                inputPlaceholder = 'Ваш телефон в Telegram';
                break;
            case 'Телефон':
                inputPlaceholder = 'Ваш телефон для звонка';
                break;
        }

        document.getElementById('contact-input').placeholder = inputPlaceholder;
    });
});


function send_calculator() {
    phone_number = document.getElementById('contact-input').value;
    if (phone_number == '') {
        alert('Введите свой номер телефона!')
        return
    }

    options = document.querySelectorAll('.option');
    option_value = '';
    for (i = 0; i < options.length; i++) {
        if (options[i].classList.length == 2) {
            option_value = options[i].getAttribute('data-contact');
        }
    }

    step1 = document.getElementsByName('step_1');
    step1_value = '';
    for (i = 0; i < step1.length; i++) {
        if (step1[i].checked) {
            step1_value = step1[i].value;
        }
    }

    step2 = document.getElementsByName('step_2');
    step2_value = '';
    for (i = 0; i < step2.length; i++) {
        if (step2[i].checked) {
            step2_value = step2[i].value;
        }
    }

    step3 = document.getElementsByName('step_3');
    step3_value = '';
    for (i = 0; i < step3.length; i++) {
        if (step3[i].checked) {
            step3_value = step3[i].value;
        }
    }

    step4 = document.getElementsByName('step_4');
    step4_value = '';
    for (i = 0; i < step4.length; i++) {
        if (step4[i].checked) {
            step4_value = step4[i].value;
        }
    }

    step5 = document.getElementsByName('step_5');
    step5_value = '';
    for (i = 0; i < step5.length; i++) {
        if (step5[i].checked) {
            step5_value = step5[i].value;
        }
    }

    step6 = document.getElementsByName('step_6');
    step6_value = '';
    for (i = 0; i < step6.length; i++) {
        if (step6[i].checked) {
            step6_value = step6[i].value;
        }
    }

    step7 = document.getElementsByName('step_7');
    step7_value = '';
    for (i = 0; i < step7.length; i++) {
        if (step7[i].checked) {
            step7_value = step7[i].value;
        }
    }

    step8 = document.getElementsByName('step_8');
    step8_value = '';
    for (i = 0; i < step8.length; i++) {
        if (step8[i].checked) {
            step8_value = step8[i].value;
        }
    }

    button = document.getElementById("calculator_button")
    button.innerHTML = '<div class="loader2"></div>'

    var checked = document.getElementById('calculator_agreement').checked;

    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 4,
            'phone': phone_number,
            'phone_type': option_value,
            'step1': step1_value,
            'step2': step2_value,
            'step3': step3_value,
            'step4': step4_value,
            'step5': step5_value,
            'step6': step6_value,
            'step7': step7_value,
            'step8': step8_value,
            'checked': checked,
        },
        success: (res)=> {
            if (res.status == 'success') {
                alert('Форма успешно отправлена!');
                document.getElementById("step9").style.display = 'none';
                document.getElementById("step1").style.display = 'block';
                document.getElementById('calculator').style.display = 'none';
            }
            else if (res.status == 'not_checked') {
                alert('Пожалуйства, подтвердите пользовательское соглашение!');
            }
            else if (res.status == 'fail') {
                alert('Извините, что-то пошло не так, попробуйте немного позже.');
            }
            button.innerHTML = 'Отправить';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
            button.innerHTML = 'Отправить';
        }
    })
}








document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn1 = document.getElementById('soglasie_open1');
    const openFormBtn2 = document.getElementById('soglasie_open2');
    const openFormBtn3 = document.getElementById('soglasie_open3');
    const openFormBtn4 = document.getElementById('soglasie_open4');
    const openFormBtn5 = document.getElementById('soglasie_open5');
    const openFormBtn6 = document.getElementById('soglasie_open6');
    const openFormBtn7 = document.getElementById('soglasie_open7');
    const openFormBtn8 = document.getElementById('soglasie_open8');
    const openFormBtn9 = document.getElementById('soglasie_open9');

    const soglasie = document.getElementById('soglasie1');
    const closeFormBtn = document.getElementById('soglasie_close');

    openFormBtn1.addEventListener('click', () => {
        soglasie.style.display = 'flex';
    });

    openFormBtn2.addEventListener('click', () => {
        soglasie.style.display = 'flex';
    });

    openFormBtn3.addEventListener('click', () => {
        soglasie.style.display = 'flex';
    });

    try {
        openFormBtn4.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    try {
        openFormBtn5.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    try {
        openFormBtn6.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    try {
        openFormBtn7.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    try {
        openFormBtn8.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    try {
        openFormBtn9.addEventListener('click', () => {
            soglasie.style.display = 'flex';
        });
    }
    catch {}

    closeFormBtn.addEventListener('click', () => {
        soglasie.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === soglasie) {
            soglasie.style.display = 'none';
        }
    });
});
