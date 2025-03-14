import "./SearchPage.css";
import {useEffect, useState} from "react";

import { animeBySearch } from "../../utils/jikanapi";
import { useSearchParams } from "react-router-dom";
function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            animeBySearch(query).then(setResults);
        }
    }, [query]);
    return (
        <>
            <h2 className="searchpage__title">Search Results for "{query}"</h2>
            <div className="searchpage__grid">
                {results.map((anime) => (
                    <div className="anime__card">
                        <img src={anime.images.jpg.image_url} alt={anime.title} className="anime__img"/>
                        <h3>{anime.title}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}
export default SearchPage;