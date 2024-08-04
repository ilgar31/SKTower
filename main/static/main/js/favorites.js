var block1 = document.getElementById("projects");

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





function getFavorites() {
    const favorites = document.cookie.split('; ').find(row => row.startsWith('favorites='));
    return favorites ? JSON.parse(decodeURIComponent(favorites.split('=')[1])) : [];
}

function setFavorites(favorites) {
    document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favorites))}; path=/; max-age=${60 * 60 * 24 * 30}`; // Сохранение на 30 дней
}

function addToFavorites(projectId) {
    let favorites = getFavorites();
    var img = document.getElementById(`project_like_${projectId}`);
    var activeSrc = img.getAttribute('data-active-src');
    var inactiveSrc = img.getAttribute('data-inactive-src');
    if (!favorites.includes(projectId)) {
        favorites.push(projectId);
        setFavorites(favorites);
        img.src = activeSrc;
    }
    else {
        removeFromFavorites(projectId);
        img.src = inactiveSrc;
    }
    updateFavorites();
}

function removeFromFavorites(projectId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== projectId);
    setFavorites(favorites);
    updateFavoritesUI();
}


function getCompares() {
    const compares = document.cookie.split('; ').find(row => row.startsWith('compares='));
    return compares ? JSON.parse(decodeURIComponent(compares.split('=')[1])) : [];
}

function setCompares(compares) {
    document.cookie = `compares=${encodeURIComponent(JSON.stringify(compares))}; path=/; max-age=${60 * 60 * 24 * 30}`; // Сохранение на 30 дней
}

function addToCompares(projectId) {
    let compares = getCompares();
    var img = document.getElementById(`project_compare_${projectId}`);
    var activeSrc = img.getAttribute('data-active-src');
    var inactiveSrc = img.getAttribute('data-inactive-src');
    if (!compares.includes(projectId)) {
        compares.push(projectId);
        setCompares(compares);
        img.src = activeSrc;
    }
    else {
        removeFromCompares(projectId);
        img.src = inactiveSrc;
    }
    updateFavorites();
}

function removeFromCompares(projectId) {
    let compares = getCompares();
    compares = compares.filter(id => id !== projectId);
    setCompares(compares);
    updateFavoritesUI();
}

function updateFavoritesUI() {
    const favorites = getFavorites();
    const compares = getCompares();
    projectId = 1;
    while (true) {
        try {
            var project = document.getElementById(`project_${projectId}`);
            if (!favorites.includes(projectId)) {
                project.style.display = 'none';
            }
            else {
                document.getElementById('none_projects').style.display = 'none';
            }
        }
        catch {}

        var img = document.getElementById(`project_like_${projectId}`);
        try {
            var activeSrc = img.getAttribute('data-active-src');
            var inactiveSrc = img.getAttribute('data-inactive-src');

            if (favorites.includes(projectId)) {
                img.src = activeSrc;
            }
        }
        catch {}

        var img = document.getElementById(`project_compare_${projectId}`);
        try {
            var activeSrc = img.getAttribute('data-active-src');
            var inactiveSrc = img.getAttribute('data-inactive-src');

            if (compares.includes(projectId)) {
                img.src = activeSrc;
            }
        }
        catch {}
        projectId += 1;
        if (projectId > 1000) {
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', updateFavoritesUI);












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