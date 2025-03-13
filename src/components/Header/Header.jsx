import { useState, useEffect } from 'react'
import "./Header.css";
import { animeBySearch, getGenres, getRandomAnime, getRandomAnimeByGenre } from "../../utils/jikanapi";
function Header() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres); // Fetch genres when component mounts
}, []);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleGenreChange = (genreId) => {
    // const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    // setSelectedGenre(selectedValues);
    setSelectedGenre((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
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
          <div className="header__dropdown-container">
          <button onClick={toggleDropdown} class="header__dropdown-btn">SelectDropdown</button>
          {dropdownOpen && (
            <div className="header__dropdown">
              {genres.map((genre) => (
                <label className="dropdown-option" key={genre.mal_id}>
                  <input type="checkbox" 
                  value={genre.mal_id}
                  checked={selectedGenre.includes(genre.mal_id)}
                  onChange={() => handleGenreChange(genre.mal_id)}/>
                  {genre.name}
                </label>
              ))}
            </div>
          )}
          </div>
          <button type="button" onClick={handleRandomAnime} className="header__randomAnimeBtn">Random Anime</button>
        </div>
      </header>
    </>
  );
}

export default Header;
