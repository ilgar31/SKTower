function getCompares() {
    const compares = document.cookie.split('; ').find(row => row.startsWith('compares='));
    return compares ? JSON.parse(decodeURIComponent(compares.split('=')[1])) : [];
}

function setCompares(compares) {
    document.cookie = `compares=${encodeURIComponent(JSON.stringify(compares))}; path=/; max-age=${60 * 60 * 24 * 30}`; // Сохранение на 30 дней
}

function addCompares(projectId) {
    let compares = getCompares();
    var img = document.getElementById(`project_compare_${projectId}`);
    if (!compares.includes(projectId)) {
        compares.push(projectId);
        setCompares(compares);
    }
    else {
        removeFromCompares(projectId);
    }
    updateFavorites();
    updateUI();
}

function removeFromCompares(projectId) {
    let compares = getCompares();
    compares = compares.filter(id => id !== projectId);
    setCompares(compares);
    move_compare(0);
}

function updateUI() {
    const compares = getCompares();
    projectId = 1;
    while (true) {
        try {
            var project = document.getElementById(`project_${projectId}`);
            if (!compares.includes(projectId)) {
                project.remove();
            }
        }
        catch {}

        projectId += 1;
        if (projectId > 1000) {
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', updateUI);




setTimeout(function() {
    const slides = document.querySelector('.projects_compare');
    const totalSlides = document.querySelectorAll('.project_compare').length;

    if (window.innerWidth > 1175) {
        if (totalSlides > 3) {
            next_compare = document.getElementById('compare_next');
            next_compare.src = next_compare.getAttribute('data-active-src');
        }
    }

    if (window.innerWidth < 1175) {
        if (totalSlides > 2) {
            next_compare = document.getElementById('compare_next');
            next_compare.src = next_compare.getAttribute('data-active-src');
        }
    }

    if (window.innerWidth < 850) {
        if (totalSlides > 1) {
            next_compare = document.getElementById('compare_next');
            next_compare.src = next_compare.getAttribute('data-active-src');
        }
    }
}
, 100);


let currentIndex = 0;

function move_compare(direction) {
    const slides = document.querySelector('.projects_compare');
    const totalSlides = document.querySelectorAll('.project_compare').length;
    maxIndex = totalSlides - 3;

    if (window.innerWidth < 1175) {
        maxIndex = totalSlides - 2;
    }

    if (window.innerWidth < 850) {
        maxIndex = totalSlides - 1;
    }

    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex >= maxIndex) {
        currentIndex = maxIndex;
        next_compare = document.getElementById('compare_next');
        next_compare.src = next_compare.getAttribute('data-inactive-src');
    }

    if (currentIndex > 0) {
        prev_compare = document.getElementById('compare_prev');
        prev_compare.src = prev_compare.getAttribute('data-active-src');
    } else {
        prev_compare = document.getElementById('compare_prev');
        prev_compare.src = prev_compare.getAttribute('data-inactive-src');
    }

    if (currentIndex < maxIndex) {
        next_compare = document.getElementById('compare_next');
        next_compare.src = next_compare.getAttribute('data-active-src');
    } else {
        next_compare = document.getElementById('compare_next');
        next_compare.src = next_compare.getAttribute('data-inactive-src');
    }

    offset = currentIndex * -265;

    if (window.innerWidth > 580) {
        offset = currentIndex * -265;
    } else {
        offset = currentIndex * -240;
    }

    slides.style.transform = `translateX(${offset}px)`;
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