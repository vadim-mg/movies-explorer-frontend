import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Container from "../Container/Container"

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="saved-movies">
        <Container className="aved-movies__content">
          <p>SavedMovies</p>
        </Container>
      </main >
      <Footer />
    </>
  );
}

export default SavedMovies
