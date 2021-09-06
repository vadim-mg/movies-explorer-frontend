import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState } from "react"
import { moviesCards } from "../../utils/constants"


function Movies() {

  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useState(moviesCards)

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
