import "./RandomButton.css";
import {
  getRandomAnime,
  getRandomAnimeByGenre,
  getGenres,
} from "../../utils/jikanapi";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BurgerMenu from "../../assets/burger-menu.svg";
function RandomButton() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genres, setGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    getGenres().then(setGenres); // Fetch genres when component mounts
  }, []);

  useEffect(() => {
    const handleClick = (evt) => {
      if (dropdownRef.current && !dropdownRef.current.contains(evt.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [dropdownOpen]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    <div className="random__container">
      <button type="button" onClick={handleRandomAnime} className="random__btn">
        Random Anime
      </button>
      <div
        ref={dropdownRef}
        className={`genre-dropdown__container ${
          location.pathname === "/"
            ? "genre-dropdown__container_centered"
            : "genre-dropdown__container_top"
        }`}
      >
        <button onClick={toggleDropdown} className="genre-dropdown__btn">
          <img src={BurgerMenu} alt="genre" className="genre-dropdown__img" />
        </button>
        {dropdownOpen && (
          <div className="genre-dropdown">
            {genres.map((genre) => (
              <label
                className="genre-dropdown-option__label"
                key={genre.mal_id}
              >
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
  );
}

export default RandomButton;
