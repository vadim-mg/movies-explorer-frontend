import "./Movies.css"
import { useState } from "react"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import { SearchForm, emptySearchField } from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import moviesApi from "../../utils/MoviesApi"
import { MAX_TIME_OF_SHORT_MOVIE, TIME_LIFE_OF_MOVIE_API_RESULT } from "../../utils/config"


function Movies({ savedMovies, onMovieCardBtnClick, mainError}) {

  const [searchParams, setSearchParams] = useState(
    JSON.parse(localStorage.getItem('searchParams')) || emptySearchField)

  const filterFunction = (searchParams, item) => (!searchParams || !item)
    ? false
    : !((searchParams.isShortFilm && item.duration > MAX_TIME_OF_SHORT_MOVIE) ||
      (item.nameRU.toLowerCase().indexOf(searchParams.searchText.toLowerCase()) === -1))

  const [loadedMovies, setLoadedMovies] = useState(
    localStorage.getItem('movies') &&
    JSON.parse(localStorage.getItem('movies'))
      .filter(item => filterFunction(searchParams, item)) || [])
  const [isLoading, setIsLoading] = useState(false)
  const [goodError, setGoodError] = useState('')
  const [badError, setBadError] = useState('')



  const searchMovies = (searchParams) => {
    setIsLoading(true)
    setSearchParams(searchParams)
    localStorage.setItem('searchParams', JSON.stringify(searchParams))

    const showResult = (movies) => {
      const result = movies.filter(item => filterFunction(searchParams, item))
      setLoadedMovies((result.length > 0) ? result : [])
      setBadError('')
      setGoodError((result.length > 0) ? '' : 'Ничего не найдено!')
      setIsLoading(false)
    }

    //Запрос к серверку за фильмами не чаще чер раз в TIME_LIFE_OF_MOVIE_API_RESULT минут
    const now = new Date().getTime() / 1000 / 60
    const loadMoviesTime = localStorage.getItem('loadMoviesAt')
    if (!loadMoviesTime || now - loadMoviesTime > TIME_LIFE_OF_MOVIE_API_RESULT) {
      localStorage.removeItem('movies')
      localStorage.setItem('loadMoviesAt', now)
    }

    const moviesInStorage = localStorage.getItem('movies')

    if (moviesInStorage) {
      showResult(JSON.parse(moviesInStorage))
    } else {
      moviesApi.loadMovies()
        .then(result => {
          localStorage.setItem('movies', JSON.stringify(result))
          showResult(result)
        })
        .catch(() => {
          localStorage.removeItem('movies')
          setLoadedMovies([])
          setGoodError('')
          setBadError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
          setIsLoading(false)
        })
    }
  }

  const checkBoxDisabled = searchParams.isShortFilm ? false : !loadedMovies.length

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSearch={searchMovies} searchParams={searchParams} minTextLenth="1" checkBoxDisabled={checkBoxDisabled} />
        {isLoading
          ? <Preloader />
          : <Section additionalContainerClass="container_size_xxl">
            {loadedMovies &&
              <MoviesCardList moviesList={loadedMovies} badError={mainError + badError} goodError={goodError} savedMovies={savedMovies}
                onMovieCardBtnClick={onMovieCardBtnClick} />
            }
          </Section>
        }
      </main >
      <Footer />
    </>
  );
}

export default Movies
