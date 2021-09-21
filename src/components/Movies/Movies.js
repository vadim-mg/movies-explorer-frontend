import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState } from "react"
import moviesApi from "../../utils/MoviesApi"
import { maxTimeOfShortMovie } from "../../utils/constants"


function Movies({ savedMovies, onMovieCardBtnClick, mainError }) {

  const [shownMovies, setShownMovies] = useState(JSON.parse(localStorage.getItem('movies')) || [])
  const [searchParams, setSearchParams] = useState(JSON.parse(localStorage.getItem('searchParams')) || {
    searchText: '',
    isShortFilm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [badError, setBadError] = useState('')

  const filterFunction = (searchParams, item) => {
    if (!searchParams || !item) {
      return false
    }
    const result = !(
      (searchParams.isShortFilm && item.duration > maxTimeOfShortMovie) ||
      (item.nameRU.toLowerCase().indexOf(searchParams.searchText.toLowerCase()) === -1)
    )
    return result
  }

  const searchMovies = (searchParams) => {
    setSearchParams(searchParams)
    setIsLoading(true)
    localStorage.setItem('searchParams', JSON.stringify(searchParams))
    moviesApi.loadMovies()
      .then(result => result.filter(item => filterFunction(searchParams, item)))
      .then(result => {
        setIsLoading(false)
        localStorage.setItem('movies', JSON.stringify(result))
        setBadError('')
        if (result.length > 0) {
          setShownMovies(result)
          setError('')
        } else {
          setShownMovies([])
          setError('Ничего не найдено!')
        }
      })
      .catch(() => {
        setIsLoading(false)
        localStorage.setItem('movies', JSON.stringify([]))
        setShownMovies([])
        setBadError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
  }


  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm onSearch={searchMovies} searchParams={searchParams} minTextLenth="1" />
        {isLoading
          ? <Preloader />
          : <Section additionalContainerClass="container_size_xxl">
            {shownMovies &&
              <MoviesCardList moviesList={shownMovies} badError={mainError + badError} goodError={error} savedMovies={savedMovies}
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
