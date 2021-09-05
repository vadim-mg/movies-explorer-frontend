import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Section from "../Section/Section"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader"
import { useState } from "react"

function Movies() {

  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useState([])

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />

        {movies ?
          <Section>
            <MoviesCardList />
          </Section>
          : <Preloader />}
      </main >
      <Footer />
    </>

  );
}

export default Movies
