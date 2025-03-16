import "./DetailsPage.css";

import { useLocation } from "react-router-dom";

function DetailsPage() {
  const location = useLocation();
  const anime = location.state?.anime;

  if (!anime) {
    return <h2 className="idk">No anime details available</h2>;
  }

  /*
    episodes  s
    title s
    score s
    images 
    genres s
    synopsis s
    aired
    studios
    */
  return (
    <>
      <div className="detailspage__container">
        <h2>{anime.title}</h2>
        <p className="">Episodes: {anime.episodes}</p>
        <p className="">Score: {anime.score}</p>
        <p className="">Genres: {anime.genres.map((g) => g.name).join(", ")}</p>
        <p className="">Synopsis: {anime.synopsis}</p>
        <p className="">Start Date: {anime.aired.string}</p>
        <p className="">
          Studios:{" "}
          {anime.studios.length > 0
            ? anime.studios.map((s) => s.name).join(", ")
            : "Unknown"}
        </p>
        <img src={anime.images.jpg.image_url} alt="" className="" />
      </div>
    </>
  );
}
export default DetailsPage;
