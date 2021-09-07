import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState, useEffect } from "react"
import { moviesCards } from "../../utils/constants"


function Movies() {

  const [movies, setMovies] = useState(null)

  useEffect(() => {
    setTimeout(() => { setMovies(moviesCards)}, 1000)

  }, [movies])

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />

        {movies ?
          <Section additionalContainerClass="container_size_xxl">
            <MoviesCardList moviesList={movies} />
          </Section>
          : <Preloader />}
      </main >
      <Footer />
    </>

  );
}

export default Movies
