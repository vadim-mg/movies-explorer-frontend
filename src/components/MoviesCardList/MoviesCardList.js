import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { breakPoints } from "../../utils/config"
import useCurrentWidth from '../../utils/useCurrentWidth'
import { useState, useEffect } from 'react'

function MoviesCardList({ moviesList, error, saved = false }) {

  //Возвращает подходящие настройки из массива breakPoints
  const getBreakPointSettings = () =>
    Object.values(breakPoints).find(i => currentWidth < i.size)

  const currentWidth = useCurrentWidth()
  const [moviesCount, setMoviesCount] = useState(getBreakPointSettings().initMovieCount)


  //управляем кол-вом отображаемых карточек в зависимости от ширины экрана
  useEffect(() => {
    const breakPointSettigs = getBreakPointSettings()
    setMoviesCount(moviesCount < breakPointSettigs.initMovieCount
      ? breakPointSettigs.initMovieCount
      : moviesCount - moviesCount % breakPointSettigs.cardsInRow)
  }, [currentWidth])

  //добавляем нужное кол-во карточек
  const handleMoreButtonClick = () => setMoviesCount(moviesCount + getBreakPointSettings().increment)

  return (
    <div className="movies-card-list">
      {moviesList.length > 0
        ? <div className="movies-card-list__list">
          {moviesList.slice(0, moviesCount)
            .map(element => (<MoviesCard key={element.id} card={element} saved={saved} />))}
        </div>
        : <p className="movies-card-list__error"> {error}</p>
      }
      {moviesCount < moviesList.length
        ? <button className="movies-card-list__more-btn" onClick={handleMoreButtonClick}>Ещё</button>
        : ''
      }
    </div >
  );
}

export default MoviesCardList
