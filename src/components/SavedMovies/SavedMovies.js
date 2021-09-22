import "./SavedMovies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import { SearchForm, emptySearchField } from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { useState, useEffect } from "react"
import { MAX_TIME_OF_SHORT_MOVIE } from "../../utils/config"



function SavedMovies({ savedMovies, onMovieCardBtnClick, mainError }) {

  const [shownMovies, setShownMovies] = useState([])
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useState(JSON.parse(localStorage.getItem('searchParamsForSavedMovies')) || emptySearchField)

  const filterMovies = (searchParams, item) => {
    if (!searchParams || !item) {
      return false
    }
    const result = !(
      (searchParams.isShortFilm && item.duration > MAX_TIME_OF_SHORT_MOVIE) ||
      (item.nameRU.toLowerCase().indexOf(searchParams.searchText.toLowerCase()) === -1)
    )
    return result
  }

  useEffect(() => {
    if (savedMovies) {
      setShownMovies(savedMovies.filter(item => filterMovies(searchParams, item)))
    }
  }, [savedMovies])

  const handleSearchMovies = (searchParams) => {
    setSearchParams(searchParams)
    localStorage.setItem('searchParamsForSavedMovies', JSON.stringify(searchParams))
    const searchResult = savedMovies.filter(item => filterMovies(searchParams, item))
    setShownMovies(searchResult)
    setError(searchResult.length === 0 ? 'Ничего не найдено!' : '')
  }


  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm onSearch={handleSearchMovies} searchParams={searchParams}
          checkBoxDisabled={!savedMovies.length} />
        <Section additionalContainerClass="container_size_xxl">
          {shownMovies &&
            <MoviesCardList moviesList={shownMovies} isMyMovies="true" badError={mainError} goodError={error} savedMovies={savedMovies}
              onMovieCardBtnClick={onMovieCardBtnClick} showAll />
          }
        </Section>
      </main >
      <Footer />
    </>
  )
}

export default SavedMovies

