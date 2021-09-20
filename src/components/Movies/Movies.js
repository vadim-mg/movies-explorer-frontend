import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState } from "react"
import moviesApi from "../../utils/MoviesApi"


function Movies({ savedMovies, onMovieCardBtnClick }) {

  const [shownMovies, setShownMovies] = useState(JSON.parse(localStorage.getItem('movies')) || [])
  const [searchParams, setSearchParams] = useState(JSON.parse(localStorage.getItem('searchParams')) || {
    searchText: '',
    isShortFilm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')


  const searchMovies = (searchParams, filterFunction) => {
    setSearchParams(searchParams)
    setIsLoading(true)
    moviesApi.loadMovies()
      .then(result => result.filter(item => filterFunction(searchParams, item)))
      .then(result => {
        setIsLoading(false)
        if (result.length > 0) {
          setShownMovies(result)
          localStorage.setItem('movies', JSON.stringify(result))
          localStorage.setItem('searchParams', JSON.stringify(searchParams))
        } else {
          setShownMovies([])
          setError('Ничего не найдено!')
        }
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
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
              <MoviesCardList moviesList={shownMovies} error={error} savedMovies={savedMovies}
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
