import "./SearchBar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { animeBySearch } from "../../utils/jikanapi";
function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
  return (
    <>
      <div
        className={`searchbar__container ${
          location.pathname === "/"
            ? "searchbar__container_centered"
            : "searchbar__container_top"
        }`}
      >
        <input
          className={`searchbar__input ${
            location.pathname === "/"
              ? "searchbar__input_centered"
              : "searchbar__input_top"
          }`}
          type="search"
          placeholder="search your show"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </>
  );
}

export default SearchBar;
