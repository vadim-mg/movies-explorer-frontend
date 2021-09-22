import "./MoviesCard.css"

const getBeautifulTime = (timeInMinutes) => {
  const h = Math.floor(timeInMinutes / 60)
  const m = timeInMinutes % 60
  return `${h ? h + 'ч' : ''} ${m}${h ? 'м' : 'минут'}`
}

function MoviesCard({ card, isMyMovies, isLiked, onMovieCardBtnClick }) {

  let cardButtonClass, cardButtonText
  if (isMyMovies) {
    cardButtonClass = 'movies-card__button movies-card__button_bg_delete'
    cardButtonText = ''
  } else {
    cardButtonClass = `movies-card__button ${isLiked ? 'movies-card__button_bg_pink' : ''}`
    cardButtonText = !isLiked ? 'Сохранить' : ''
  }

  const handleCardClick = (event) => {
    if (event.target.className === cardButtonClass) {
      return
    }
    window.open(card.trailer);
  }

  const handleButtonClick = () => onMovieCardBtnClick(card)

  return (
    <figure className="movies-card" onClick={handleCardClick} >
      <figcaption className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        <p className="movies-card__time">{getBeautifulTime(card.duration)}</p>
      </figcaption>
      <img className="movies-card__image" src={card.image} alt={card.nameRu} />
      <button className={cardButtonClass} onClick={handleButtonClick}>{cardButtonText}</button>
    </figure>
  );
}

export default MoviesCard
