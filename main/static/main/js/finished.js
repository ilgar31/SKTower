var block1 = document.getElementById("block1");
var block2 = document.getElementById("consultation");


function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;
    if (block1Top < windowHeight) {
        block1.classList.add('visible_block');
    }

    if (block2Top < windowHeight) {
        block2.classList.add('visible_block');
    }
}

animation();

window.addEventListener('scroll', () => {
    animation();
});


url = window.location.href

csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

function send_consultation() {
    button = document.getElementById("send_consultation_button")
    button.innerHTML = '<div class="loader2"></div>'
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var checked = document.getElementById('agreement').checked;
    $.ajax({
        type: "POST",
        url: ajax_url,
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
            button.innerHTML = 'Отправить заявку';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
            button.innerHTML = 'Отправить заявку';
        }
    })
}












var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");

function zoom_img(identifier) {
    modal.style.display = "flex";
    modalImg.src = identifier.src;
}

modal.onclick = function() {
    img01.className += " out";
    setTimeout(function() {
       modal.style.display = "none";
       img01.className = "modal-content";
     }, 400);

 }