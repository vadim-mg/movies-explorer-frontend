import "./MoviesCard.css"

function MoviesCard({ card, saved }) {
  let cardButtonClass, cardButtonText
  if (saved) {
    cardButtonClass = 'movies-card__button movies-card__button_bg_delete'
    cardButtonText = ''
  } else {
    cardButtonClass = `movies-card__button ${card.saved ? 'movies-card__button_bg_pink' : ''}`
    cardButtonText = !card.saved ? 'Сохранить' : ''
  }
  return (
    <figure div className="movies-card" >
      <figcaption className="movies-card__caption">
        <h3 className="movies-card__name">{card.name}</h3>
        <p className="movies-card__time">{card.time}</p>
      </figcaption>
      <img className="movies-card__image" src={card.url} alt={card.name} />
      <button className={cardButtonClass}>{cardButtonText}</button>
    </figure>
  );
}

export default MoviesCard
