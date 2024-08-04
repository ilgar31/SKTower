var block1 = document.getElementById("block1");
var block2 = document.getElementById("block2");
var block3 = document.getElementById("consultation");

function animation() {
    const block1Top = block1.getBoundingClientRect().top;
    const block2Top = block2.getBoundingClientRect().top;
    const block3Top = block3.getBoundingClientRect().top;
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
}

animation();

window.addEventListener('scroll', () => {
    animation();
});



document.getElementById("layout_1").classList.add('layout_active_count_block');
document.getElementById("layout_image_1").classList.add('layout_active');


function new_layout(id) {
    var i = 1;

    while (i < 7) {
        try {
            document.getElementById(`layout_${i}`).classList.remove('layout_active_count_block');
            document.getElementById(`layout_image_${i}`).classList.remove('layout_active');
        }
        catch {break;}
        i +=1;
    }

    document.getElementById(`layout_${id}`).classList.add('layout_active_count_block');
    document.getElementById(`layout_image_${id}`).classList.add('layout_active');
}


project_id = new URL(window.location.href).pathname.split('/').pop();

select1 = document.getElementById('complect1')
select2 = document.getElementById('complect2')

complect1 = select1.value
complect2 = select2.value

select1.addEventListener('change', function (e) {
    complect1 = e.target.value;
    change_price();
})

select2.addEventListener('change', function (e) {
    complect2 = e.target.value;
    change_price();
})


function change_price() {
    price = document.getElementById("project_value")

    $.ajax({
        type: "POST",
        url: ajax_url,
        data: {
            "csrfmiddlewaretoken": csrf,
            'form_id': 5,
            'complect1': complect1,
            'complect2': complect2,
            'project_id': project_id,
        },
        success: (res)=> {

            price.innerHTML = res.price.toLocaleString('ru-RU') + ' РУБ';
        },
        error: (err)=> {
            alert('Извините, что-то пошло не так, попробуйте немного позже.');
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












function getFavorites() {
    const favorites = document.cookie.split('; ').find(row => row.startsWith('favorites='));
    return favorites ? JSON.parse(decodeURIComponent(favorites.split('=')[1])) : [];
}

function setFavorites(favorites) {
    document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favorites))}; path=/; max-age=${60 * 60 * 24 * 30}`; // Сохранение на 30 дней
}

function addFavorites(projectId) {
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
    updateUI();
}

function removeFromFavorites(projectId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== projectId);
    setFavorites(favorites);
}


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
    updateUI();
}

function removeFromCompares(projectId) {
    let compares = getCompares();
    compares = compares.filter(id => id !== projectId);
    setCompares(compares);
}

function updateUI() {
    project_id = Number(new URL(window.location.href).pathname.split('/').pop());

    const favorites = getFavorites();
    const compares = getCompares();
    var img = document.getElementById(`project_like_${project_id}`);

    try {
        var activeSrc = img.getAttribute('data-active-src');
        var inactiveSrc = img.getAttribute('data-inactive-src');


        if (favorites.includes(project_id)) {
            img.src = activeSrc;
            document.getElementById('project_like_text').innerHTML = 'В избранном';
        }
        else {
            img.src = inactiveSrc;
            document.getElementById('project_like_text').innerHTML = 'Добавить в избранное';
        }

    }
    catch {}

    var img = document.getElementById(`project_compare_${project_id}`);
    try {
        var activeSrc = img.getAttribute('data-active-src');
        var inactiveSrc = img.getAttribute('data-inactive-src');

        if (compares.includes(project_id)) {
            img.src = activeSrc;
            document.getElementById('project_compare_text').innerHTML = 'В сравнении';
        }
        else {
            img.src = inactiveSrc;
            document.getElementById('project_compare_text').innerHTML = 'Добавить для сравнения';
        }
    }
    catch {}
}

document.addEventListener('DOMContentLoaded', updateUI);











var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");

function zoom_img(identifier) {
    modal.style.display = "flex";
    modalImg.src = identifier.src;
}


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        img01.className += " out";
        setTimeout(function() {
           modal.style.display = "none";
           img01.className = "modal-content";
         }, 400);
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn1 = document.getElementById('make_sale_open');

    const make_sale = document.getElementById('make_sale');
    const closeFormBtn = document.getElementById('make_sale_close');

    openFormBtn1.addEventListener('click', () => {
        make_sale.style.display = 'flex';
    });

    closeFormBtn.addEventListener('click', () => {
        make_sale.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === make_sale) {
            make_sale.style.display = 'none';
        }
    });
});





var sale = 0;



document.querySelectorAll('.container2').forEach(sale_input => {
    sale_input.addEventListener('change', function() {
        input = document.getElementById(`sale_${sale_input.id}`)
        if (input.checked) {
            sale += Number(input.value)
        } else {
            sale -= Number(input.value)
        }

        document.getElementById(`total_sale`).innerHTML = `ИТОГО: ${sale.toLocaleString('ru-RU')} руб`;
    });
});

