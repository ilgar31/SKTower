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
}
, 100);


let currentIndex = 0;

function move_compare(direction) {
    const slides = document.querySelector('.projects_compare');
    const totalSlides = document.querySelectorAll('.project_compare').length;
    const slidesPerView = 3;
    const maxIndex = totalSlides - 3;

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

    const offset = currentIndex * -265;
    slides.style.transform = `translateX(${offset}px)`;
}
