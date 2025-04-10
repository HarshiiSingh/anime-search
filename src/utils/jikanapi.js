const BASE_URL = "https://api.jikan.moe/v4";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

export const animeBySearch = (query) => {
    return fetch(`${BASE_URL}/anime?q=${query}&limit=20`)
    .then(response => response.json())
    .then(data => data.data || [])
    .catch(error => {
        console.error("Error fetching search results: ", error);
        return [];
    });
}

export const getGenres = () => {
    return fetch(`${BASE_URL}/genres/anime`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
        console.error("Error fetching search genres: ", error);
    });
}


export const getRandomAnime = () => {
    return fetch(`${BASE_URL}/random/anime`)
    .then(response => response.json())
    .then(data => data.data)
    .catch(error => {
        console.error("Error fetching random anime: ", error);
    });
}

export const getRandomAnimeByGenre = (genreIds) => {
    if (genreIds.length === 0) return getRandomAnime();

    const genreString = genreIds.join(",");

    return fetch(`${BASE_URL}/anime?genres=${genreString}&limit=20`)
    .then(response => response.json())
    .then(data => {
        if (data.data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.data.length);
            return data.data[randomIndex];
        }
        return null;
    })
    .catch(error => {
        console.error("Error fetching anime by genre: ", error);
    })
}