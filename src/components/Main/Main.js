import Container from "../Container/Container"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useContext } from "react"
import { CurrentUserContext } from '../../contexts/CurrentUserContext'



function Main() {
  const currentUser = useContext(CurrentUserContext)

  //Чтоб увидеть верску неавторизованного пользователя на главной.
  //убрать на следющем этапе
  currentUser.loggedIn = false;

  return (
    <>
      <Header className="header header_light"/>
      <main className="main">
        <Container className="main__content">
          main
        </Container>
      </main >
      <Footer />
    </>
  );
}

export default Main
