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






url = window.location.href

csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

var currentCount = 12;

var projects = document.getElementById('projects')

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


var filter = '';


function getFilterValues() {
    return {
            total_area_from: document.querySelector('input[name="total_area_from"]').value,
            total_area_to: document.querySelector('input[name="total_area_to"]').value,
            living_area_from: document.querySelector('input[name="living_area_from"]').value,
            living_area_to: document.querySelector('input[name="living_area_to"]').value,
            floors_from: document.querySelector('input[name="floors_from"]').value,
            floors_to: document.querySelector('input[name="floors_to"]').value,
            bedrooms_from: document.querySelector('input[name="bedrooms_from"]').value,
            bedrooms_to: document.querySelector('input[name="bedrooms_to"]').value,
            bathroom_from: document.querySelector('input[name="bathroom_from"]').value,
            bathroom_to: document.querySelector('input[name="bathroom_to"]').value,
            terrace: document.querySelector('select[name="terrace"]').value
        };
}



function show_more() {
    button = document.getElementById("more_button")
    button.innerHTML = '<div class="loader2"></div>'
    var sort_key = ''
    var state = ''
    if (area_sort_state) {
        sort_key = 'area'
        state = area_sort_state
    }
    if (price_sort_state) {
        sort_key = 'price'
        state = price_sort_state
    }

    let filterData = {};
    if (filter) {
        filterData = getFilterValues();
    }

    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'type': 'load_more',
            'count': currentCount,
            'sort_key': sort_key,
            'state': state,
            'filter': filter,
            'filter_data': JSON.stringify(filterData),
        },
        success: (res)=> {
            res.projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" id='project_compare_${project.id}' class="project_action_button" onclick="addToCompares(${project.id})" data-active-src="/static/main/png/home/project_compare_active.png" data-inactive-src="/static/main/png/home/project_compare.png"draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="addToFavorites(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
                            </div>
                        </div>
                        <div class="project_block2">
                        <div class="project_stat">
                            <p class="project_name">${project.name }</p>
                            <p class="project_area">${project.area } м²</p>
                        </div>
                            <p class="project_price">от ${formatPrice(project.price)} руб</p>
                            <div class="consultation_button" onclick="event.preventDefault();">Получить консультацию</div>
                        </div>
                    </a>
                `;
            });


            if (!res.more) {
                button.style.display = 'none';
            }
            currentCount += 12;
            button.innerHTML = 'Показать ещё';
            updateFavoritesUI();
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
            button.innerHTML = 'Показать ещё';
        }
    })
}




var area_sort_state = ''
var price_sort_state = ''

function change_state(state) {
    if (state == '') {
        state = 1
    }
    else if (state == 1) {
        state = 2
    }
    else {
        state = 1
    }
    return state
}


function area_sort() {
    price_sort_state = ''
    document.getElementById("price_sort").innerHTML = 'Цена'
    area_sort_state = change_state(area_sort_state)
    sort('area', area_sort_state)
}


function price_sort() {
    area_sort_state = ''
    document.getElementById("area_sort").innerHTML = 'Площадь'
    price_sort_state = change_state(price_sort_state)
    sort('price', price_sort_state)
}


function sort(type, state) {
    button = document.getElementById("more_button");
    currentCount = 12;
    if (type == 'area') {
        method = document.getElementById("area_sort")
        method.innerHTML = 'Площадь'
    }
    else {
        method = document.getElementById("price_sort")
        method.innerHTML = 'Цена'
    }
    if (state == 1) {
        method.innerHTML += ' &uarr;'
    }
    else {
        method.innerHTML += ' &darr;'
    }

    let filterData = {};
    if (filter) {
        filterData = getFilterValues();
    }

    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'type': 'sort',
            'sort_key': type,
            'state': state,
            'filter': filter,
            'filter_data': JSON.stringify(filterData),
        },
        success: (res)=> {
            projects.innerHTML = ''

            if (res.fail) {

                projects.innerHTML += `
                    <p class='fail_project'>Проекты не найдены</p>
                `
            }

            res.main_projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" id='project_compare_${project.id}' class="project_action_button" onclick="addToCompares(${project.id})" data-active-src="/static/main/png/home/project_compare_active.png" data-inactive-src="/static/main/png/home/project_compare.png"draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="addToFavorites(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
                            </div>
                        </div>
                        <div class="project_block2">
                        <div class="project_stat">
                            <p class="project_name">${project.name }</p>
                            <p class="project_area">${project.area } м²</p>
                        </div>
                            <p class="project_price">от ${formatPrice(project.price)} руб</p>
                            <div class="consultation_button" onclick="event.preventDefault();">Получить консультацию</div>
                        </div>
                    </a>
                `;
            });

            projects.innerHTML += `
                    <div class="special_block">
                        <p class="special_title">Оцените стоимость вашего жилья</p>
                        <button class="special_button" id="calculator_open4">Рассчитать</button>
                    </div>
                `;

            res.projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" id='project_compare_${project.id}' class="project_action_button" onclick="addToCompares(${project.id})" data-active-src="/static/main/png/home/project_compare_active.png" data-inactive-src="/static/main/png/home/project_compare.png"draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="addToFavorites(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
                            </div>
                        </div>
                        <div class="project_block2">
                        <div class="project_stat">
                            <p class="project_name">${project.name }</p>
                            <p class="project_area">${project.area } м²</p>
                        </div>
                            <p class="project_price">от ${formatPrice(project.price)} руб</p>
                            <div class="consultation_button" onclick="event.preventDefault();">Получить консультацию</div>
                        </div>
                    </a>
                `;
            });

            if (res.fail) {
                projects.innerHTML += `
                    <p>Проекты не найдены</p>
                `
            }
            document.getElementById('more_button').style.display = 'flex';
            if (!res.more) {
                document.getElementById('more_button').style.display = 'none';
            }

            updateFavoritesUI();
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
        }
    })
}



function filter_func() {
    button = document.getElementById("filter_button");
    button.innerHTML = '<div class="loader2"></div>'
    currentCount = 12;
    filter = true

    var sort_key = ''
    var state = ''
    if (area_sort_state) {
        sort_key = 'area'
        state = area_sort_state
    }
    if (price_sort_state) {
        sort_key = 'price'
        state = price_sort_state
    }

    let filterData = getFilterValues();

    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'type': 'filter',
            'sort_key': sort_key,
            'state': state,
            'filter_data': JSON.stringify(filterData),
        },
        success: (res)=> {
            projects.innerHTML = ''

            if (res.fail) {
                projects.innerHTML += `
                    <p class='fail_project'>Проекты не найдены</p>
                `
            }

            res.main_projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" id='project_compare_${project.id}' class="project_action_button" onclick="addToCompares(${project.id})" data-active-src="/static/main/png/home/project_compare_active.png" data-inactive-src="/static/main/png/home/project_compare.png"draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="addToFavorites(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
                            </div>
                        </div>
                        <div class="project_block2">
                        <div class="project_stat">
                            <p class="project_name">${project.name }</p>
                            <p class="project_area">${project.area } м²</p>
                        </div>
                            <p class="project_price">от ${formatPrice(project.price)} руб</p>
                            <div class="consultation_button" onclick="event.preventDefault();">Получить консультацию</div>
                        </div>
                    </a>
                `;
            });

            projects.innerHTML += `
                    <div class="special_block">
                        <p class="special_title">Оцените стоимость вашего жилья</p>
                        <button class="special_button" id="calculator_open4">Рассчитать</button>
                    </div>
                `;

            res.projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" id='project_compare_${project.id}' class="project_action_button" onclick="addToCompares(${project.id})" data-active-src="/static/main/png/home/project_compare_active.png" data-inactive-src="/static/main/png/home/project_compare.png"draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="addToFavorites(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
                            </div>
                        </div>
                        <div class="project_block2">
                        <div class="project_stat">
                            <p class="project_name">${project.name }</p>
                            <p class="project_area">${project.area } м²</p>
                        </div>
                            <p class="project_price">от ${formatPrice(project.price)} руб</p>
                            <div class="consultation_button" onclick="event.preventDefault();">Получить консультацию</div>
                        </div>
                    </a>
                `;
            });

            document.getElementById('more_button').style.display = 'flex';
            if (!res.more) {
                document.getElementById('more_button').style.display = 'none';
            }

            updateFavoritesUI();
            button.innerHTML = 'Найти';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
            button.innerHTML = 'Найти';
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