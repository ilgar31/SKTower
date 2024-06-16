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
    const calculator = document.getElementById('calculator');
    const closeFormBtn = document.getElementById('calculator_close');

    openFormBtn1.addEventListener('click', () => {
        calculator.style.display = 'flex';
    });

    openFormBtn2.addEventListener('click', () => {
        calculator.style.display = 'flex';
    });

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
            alert('Извините, что-то пошло не так, попробуте немного позже.');
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
            console.log(step_error)
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
    console.log(step);
    if (typeof step_error.textContent !== "undefined") {
        step_error.textContent = '';
    } else {
        step_error.innerText = '';
    }
    await delay(1000);
    document.getElementById(`step${step - 1}`).classList.remove('select');
    document.getElementById(`step${step}`).classList.add('select');
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
}