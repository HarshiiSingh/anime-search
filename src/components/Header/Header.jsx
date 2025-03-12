import { useState, useEffect } from 'react'
import "./Header.css";
import { animeBySearch, getGenres, getRandomAnime, getRandomAnimeByGenre } from "../../utils/jikanapi";
function Header() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres); // Fetch genres when component mounts
}, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      console.log("Search for: ", search);

      animeBySearch(search)
        .then((results) => {
          console.log("Search Results:", results);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGenreChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedGenre(selectedValues);
};

  const handleRandomAnime = () => {
    if (selectedGenre.length > 0) {
        console.log(`Fetching a random anime from genres: ${selectedGenre.join(", ")}`);
        getRandomAnimeByGenre(selectedGenre)
        .then(randomAnime => {
            if (randomAnime) {
                console.log("Random anime from Selected Genres: ", randomAnime);
            } else {
                console.log("No anime found for these genres.");
            }
        })
    } else {
        console.log("Fetching a random anime");
        getRandomAnime()
        .then(randomAnime => {
            if (randomAnime) {
                console.log("Random anime: ", randomAnime);
            } else {
                console.log("No anime found");
            }
        })
        .catch(error => console.error("Error fetching random anime:", error));
    }

  }
  return (
    <>
      {" "}
      <header className="header">
        <h1 className="header__title">MyAnimeList</h1>
        <div className="header__searchbar">
          <input
            className="header__search"
            type="search"
            placeholder="search your show"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <select multiple value={selectedGenre} onChange={handleGenreChange} className="header__genre" id="">
            {genres.map(genre => (
                <option key={genre.mal_id} value={genre.mal_id}>
                    {genre.name}
                </option>
            ))}
          </select>
          <button type="button" onClick={handleRandomAnime} className="header__randomAnimeBtn">Random Anime</button>
        </div>
      </header>
    </>
  );
}

export default Header;
