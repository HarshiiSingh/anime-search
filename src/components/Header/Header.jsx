import { useState} from 'react'
import "./Header.css";
import { animeBySearch } from "../../utils/jikanapi";
function Header() {
  const [search, setSearch] = useState("");
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
        </div>
      </header>
    </>
  );
}

export default Header;
