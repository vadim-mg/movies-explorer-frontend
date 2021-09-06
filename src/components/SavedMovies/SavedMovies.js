import "./SavedMovies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState } from "react"
import { savedMoviesCards } from "../../utils/constants"


function SavedMovies() {

  // eslint-disable-next-line no-unused-vars
  const [savedMovies, setMovies] = useState(savedMoviesCards)

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />

        {savedMovies ?
          <Section additionalContainerClass="container_size_xxl">
            <MoviesCardList moviesList={savedMovies} saved={true} />
          </Section>
          : <Preloader />}
      </main >
      <Footer />
    </>

  )
}

export default SavedMovies

