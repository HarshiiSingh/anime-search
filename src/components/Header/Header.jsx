import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import RandomButton from "../RandomButton/RandomButton";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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
        <SearchBar />
        <RandomButton />
      </header>
    </>
  );
}

export default Header;
