import "./SavedMovies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { useState, useEffect } from "react"


function SavedMovies({ savedMovies, onMovieCardBtnClick }) {
  const [shownMovies, setShownMovies] = useState([])
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useState({
    searchText: '',
    isShortFilm: false
  })

  useEffect(() => {
    if (savedMovies) {
      setShownMovies(savedMovies)
    }
  }, [savedMovies])

  const searchMovies = (searchParams, filterFunction) => {
    setSearchParams(searchParams)
    const searchResult = savedMovies.filter(item => filterFunction(searchParams, item))
    setShownMovies(searchResult)
    setError(searchResult.length === 0 ? 'Ничего не найдено!' : '')
  }

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSearch={searchMovies} searchParams={searchParams} />
        <Section additionalContainerClass="container_size_xxl">
          {shownMovies &&
            <MoviesCardList moviesList={shownMovies} isMyMovies="true" error={error} savedMovies={savedMovies}
              onMovieCardBtnClick={onMovieCardBtnClick} />
          }
        </Section>
      </main >
      <Footer />
    </>
  )
}

export default SavedMovies

