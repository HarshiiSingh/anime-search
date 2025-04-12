import "./AnimeCard.css";
function AnimeCard({ anime, handleCardClick }) {
  return (
    <>
      <div
        key={anime.mal_id}
        className="card__anime"
        onClick={() => handleCardClick(anime)}
      >
        <div className="card__container">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="card__img"
          />
          <div className="card__episode">{anime.episodes || "N/A"} EP</div>
        </div>
        <h3 className="card__title">{anime.title}</h3>
      </div>
    </>
  );
}

export default AnimeCard;
