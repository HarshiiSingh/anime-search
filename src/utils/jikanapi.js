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
    .then(data => data.data)
    .catch(error => {
        console.error("Error fetching search results: ", error);
    });
}