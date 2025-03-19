import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import {
  animeBySearch,
  getGenres,
  getRandomAnime,
  getRandomAnimeByGenre,
} from "../../utils/jikanapi";
import BurgerMenu from "../../assets/burger-menu.svg";

function Header() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getGenres().then(setGenres); // Fetch genres when component mounts
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      console.log("Search for: ", search);
      navigate(`/search?query=${encodeURIComponent(search)}`);

      animeBySearch(search)
        .then((results) => {
          console.log("Search Results:", results);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGenreChange = (genreId) => {
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
      console.log(
        `Fetching a random anime from genres: ${selectedGenre.join(", ")}`
      );
      getRandomAnimeByGenre(selectedGenre).then((randomAnime) => {
        if (randomAnime) {
          navigate(`/details/${randomAnime.mal_id}`, {
            state: { anime: randomAnime },
          });
          console.log("Random anime from Selected Genres: ", randomAnime);
        } else {
          console.log("No anime found for these genres.");
        }
      });
    } else {
      console.log("Fetching a random anime");
      getRandomAnime()
        .then((randomAnime) => {
          if (randomAnime) {
            navigate(`/details/${randomAnime.mal_id}`, {
              state: { anime: randomAnime },
            });
            console.log("Random anime: ", randomAnime);
          } else {
            console.log("No anime found");
          }
        })
        .catch((error) => console.error("Error fetching random anime:", error));
    }
  };
  return (
    <>
      {" "}
      <header
        className={`header ${
          location.pathname === "/" ? "header_centered" : "header_top"
        }`}
      >
        <h1 onClick={() => navigate("/")} className="header__title">
          MyAnimeList
        </h1>
        <div
          className={`header__searchbar ${
            location.pathname === "/"
              ? "header__searchbar_centered"
              : "header__searchbar_top"
          }`}
        >
          <input
            className={`header__search ${
              location.pathname === "/"
                ? "header__search_centered"
                : "header__search_top"
            }`}
            type="search"
            placeholder="search your show"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="header__btn-container">
            <button
              type="button"
              onClick={handleRandomAnime}
              className="header__randomAnimeBtn"
            >
              Random Anime
            </button>
            <div className={`header__dropdown-container ${location.pathname === "/" ? "header__dropdown-container_centered" : "header__dropdown-container_top" }`}>
              <button onClick={toggleDropdown} className="header__dropdown-btn">
                <img src={BurgerMenu} alt="genre" className="dropdown_img" />
              </button>
              {dropdownOpen && (
                <div className="header__dropdown">
                  {genres.map((genre) => (
                    <label className="dropdown-option" key={genre.mal_id}>
                      <input
                        type="checkbox"
                        value={genre.mal_id}
                        checked={selectedGenre.includes(genre.mal_id)}
                        onChange={() => handleGenreChange(genre.mal_id)}
                      />
                      {genre.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
