import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { BREAK_POINTS } from "../../utils/config"
import useCurrentWidth from '../../utils/useCurrentWidth'
import { useState, useEffect } from 'react'

function MoviesCardList({ moviesList, goodError='', badError='', isMyMovies = false, onMovieCardBtnClick, savedMovies, showAll = false }) {

  //Возвращает подходящие настройки из массива BREAK_POINTS
  const getBreakPointSettings = () => Object.values(BREAK_POINTS).find(i => currentWidth < i.size)

  const currentWidth = useCurrentWidth()
  const [moviesCount, setMoviesCount] = useState(0)

  const setRightMoviesCount = () => {
    if (showAll) {
      setMoviesCount(moviesList.length)
    } else {
      const breakPointSettigs = getBreakPointSettings()
      setMoviesCount(moviesCount < breakPointSettigs.initMovieCount
        ? breakPointSettigs.initMovieCount
        : moviesCount - moviesCount % breakPointSettigs.cardsInRow)
    }
  }

  useEffect(() => setRightMoviesCount(), [moviesList, currentWidth])

  //добавляем нужное кол-во карточек
  const handleMoreButtonClick = () => setMoviesCount(moviesCount + getBreakPointSettings().increment)

  const likedIds = savedMovies ? savedMovies.map(i => i.movieId) : []

  return (
    <div className="movies-card-list">
      {moviesList.length > 0
        ? <div className="movies-card-list__list">
          {moviesList.slice(0, moviesCount)
            .map(element => (<MoviesCard key={element.movieId} card={element} isMyMovies={isMyMovies} isLiked={likedIds.includes(element.movieId)} onMovieCardBtnClick={onMovieCardBtnClick} />))}
        </div>
        : ''
      }
      {goodError !== '' ? <p className="movies-card-list__error movies-card-list__error_good"> {goodError}</p> : ''}
      {badError !== '' ? <p className="movies-card-list__error"> {badError}</p> : ''}
      {moviesCount < moviesList.length
        ? <button className="movies-card-list__more-btn" onClick={handleMoreButtonClick}>Ещё</button>
        : ''
      }
    </div >
  );
}

export default MoviesCardList
