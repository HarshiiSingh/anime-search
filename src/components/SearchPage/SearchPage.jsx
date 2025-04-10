import "./SearchPage.css";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { animeBySearch } from "../../utils/jikanapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimeCard from "../AnimeCard/AnimeCard";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const cachedResults = localStorage.getItem(`search-${query}`);

      if (cachedResults) {
        setResults(JSON.parse(cachedResults));
      } else {
        setLoading(true);
        animeBySearch(query)
        .then((data) => {
          if (data) {
            setResults(data);
            localStorage.setItem(`search-${query}`, JSON.stringify(data));
          } else {
            setError("Failed to load results");
          }
        })
        .catch(() => setError("Something went wrong"))
        .finally(() => setLoading(false));
      }
    }
  }, [query]);

  const handleCardClick = (anime) => {
    navigate(`/details/${anime.mal_id}`, { state: { anime } });
  };
  return (
    <>
    <Header />
    <div className="searchpage__container">
      <h2 className="searchpage__title">Search Results for "{query}"</h2>
      {loading && <p className="searchpage__loading"> Loading...</p>}
      {error && <p className="searchpage__error">{error}</p> }
      <div className="searchpage__grid">
        {results.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      </div>
    </>
  );
}
export default SearchPage;
