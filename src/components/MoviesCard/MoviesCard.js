import "./MoviesCard.css"
import { moviesImageUrl } from "../../utils/config"

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
    <figure className="movies-card" >
      <figcaption className="movies-card__caption">
        <a className="movies-card__name" href={card.trailerLink} target="blank">{card.nameRU}</a>
        <p className="movies-card__time">{`${card.duration} минут`}</p>
      </figcaption>
      <img className="movies-card__image" src={moviesImageUrl + card.image.url} alt={card.nameRu} />
      <button className={cardButtonClass}>{cardButtonText}</button>
    </figure>
  );
}

export default MoviesCard
