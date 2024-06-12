let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}


var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("block3");
var block4 = document.getElementById("block4");
var block5 = document.getElementById("block5");
var block6 = document.getElementById("block6");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const block3Top = block3.getBoundingClientRect().top;
    const block4Top = block4.getBoundingClientRect().top;
    const block5Top = block5.getBoundingClientRect().top;
    const block6Top = block6.getBoundingClientRect().top;
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

    if (block4Top < windowHeight) {
        block4.classList.add('visible_block');
    }

    if (block5Top < windowHeight) {
        block5.classList.add('visible_block');
    }

    if (block6Top < windowHeight) {
        block6.classList.add('visible_block');
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
    button.innerHTML = '<div class="loader"></div>'
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