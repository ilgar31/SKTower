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

function updateFavoritesUI() {
    const favorites = getFavorites();
    var count = document.querySelectorAll('.project').length
    let mas = [];
    for (let i = 1; i < count+1; i++) {
        mas.push(i);
    }
    mas.forEach(projectId => {
        var img = document.getElementById(`project_like_${projectId}`);
        var activeSrc = img.getAttribute('data-active-src');
        var inactiveSrc = img.getAttribute('data-inactive-src');

        if (favorites.includes(projectId)) {
            img.src = activeSrc;
        }
    });
}

document.addEventListener('DOMContentLoaded', updateFavoritesUI);






url = window.location.href

csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

var currentCount = 12;

var projects = document.getElementById('projects')

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function show_more() {
    button = document.getElementById("more_button")
    button.innerHTML = '<div class="loader2"></div>'
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'type': 'load_more',
            'count': currentCount,
        },
        success: (res)=> {
            res.projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" class="project_action_button" draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="toggleFavorite(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
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
    area_sort_state = change_state(area_sort_state)
    sort('area', area_sort_state)
}



function sort(type, state) {
    button = document.getElementById("more_button");
    currentCount = 12;
    if (type == 'area') {
        method = document.getElementById("area_sort")
    }
    else {
        method = document.getElementById("price_sort")
    }
    if (state == 1) {
        method.innerHTML = 'Площадь &uarr;'
    }
    else {
        method.innerHTML = 'Площадь &darr;'
    }

    $.ajax({
        type: "POST",
        url: url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'type': 'sort',
            'key': type,
            'state': state,
        },
        success: (res)=> {
            projects.innerHTML = ''
            res.main_projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" class="project_action_button" draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="toggleFavorite(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
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
                        <button class="special_button">Рассчитать</button>
                    </div>
                `;

            res.projects.forEach(project => {
                projects.innerHTML += `
                    <a class="project" href="/project/${project.id}">
                        <div class="project_block1" style="background-image: url('../static/${project.image}');">
                            <div class="project_compare_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_compare.png" class="project_action_button" draggable="false">
                            </div>
                            <div class="favourite_block" onclick="event.preventDefault();">
                                <img src="/static/main/png/home/project_favourite.png" id="project_like_${project.id}" class="project_action_button" onclick="toggleFavorite(${project.id})" data-active-src="/static/main/png/home/project_favourite_active.png" data-inactive-src="/static/main/png/home/project_favourite.png" draggable="false">
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
            updateFavoritesUI()
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
        }
    })
}

