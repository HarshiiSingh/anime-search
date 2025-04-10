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
        <h2 className="detailspage__header">{anime.title}</h2>
        <div className="detailspage__content">
          <div className="detailspage__img-content">
            <img
              src={anime.images.jpg.image_url}
              alt=""
              className="detailspage__img"
            />
            <p className="detailspage__title"> Information</p>
            <div className="detailspage__info">
              <p className="detailspage__studios">
               <b> Studios:</b>{" "}
                {anime.studios.length > 0
                  ? anime.studios.map((s) => s.name).join(", ")
                  : "Unknown"}
              </p>
              <p className="detailspage__episodes">
                <b>Episodes:</b> {anime.episodes}{" "}
              </p>
              <p className="detailspage__score"><b>Score: </b>{anime.score}</p>
              
            </div>
          </div>

          <div className="detailspage__context">
            <div className="detailspage__synopsis">
              <p className="synopsis__title">Synopsis </p>
              <p className="synopsis__text">{anime.synopsis}</p>
            </div>

            <div className="detailspage__genres">
              <p className="genres__title">Genres</p>
              <p className="genres__text">
                {anime.genres.map((g) => g.name).join(", ")}
              </p>
            </div>

            <p className="detailspage__date"><b>Aired:</b> {anime.aired.string}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetailsPage;
