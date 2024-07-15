    function getFavorites() {
        const favorites = document.cookie.split('; ').find(row => row.startsWith('favorites='));
        return favorites ? JSON.parse(decodeURIComponent(favorites.split('=')[1])) : [];
    }

    function setFavorites(favorites) {
        document.cookie = `favorites=${encodeURIComponent(JSON.stringify(favorites))}; path=/; max-age=${60 * 60 * 24 * 30}`; // Сохранение на 30 дней
    }

    function addToFavorites(projectId) {
        let favorites = getFavorites();
        if (!favorites.includes(projectId)) {
            favorites.push(projectId);
            setFavorites(favorites);
        }
        updateFavoritesUI();
    }

    function removeFromFavorites(projectId) {
        let favorites = getFavorites();
        favorites = favorites.filter(id => id !== projectId);
        setFavorites(favorites);
        updateFavoritesUI();
    }

    function updateFavoritesUI() {
        const favorites = getFavorites();
        document.querySelectorAll('.project').forEach(project => {
            const projectId = parseInt(project.dataset.projectId, 10);
            if (favorites.includes(projectId)) {
                project.classList.add('favorite');
            } else {
                project.classList.remove('favorite');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', updateFavoritesUI);