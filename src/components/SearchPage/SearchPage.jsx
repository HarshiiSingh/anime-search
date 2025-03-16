import "./SearchPage.css";
import { useEffect, useState } from "react";

import { animeBySearch } from "../../utils/jikanapi";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimeCard from "../AnimeCard/AnimeCard";
function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      animeBySearch(query).then(setResults);
    }
  }, [query]);

  const handleCardClick = (anime) => {
    navigate(`/details/${anime.mal_id}`, { state: { anime } });
  };
  return (
    <>
    
      <h2 className="searchpage__title">Search Results for "{query}"</h2>
      <div className="searchpage__grid">
        {results.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      
    </>
  );
}
export default SearchPage;
