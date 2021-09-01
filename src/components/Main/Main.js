import './Main.css'
import Container from "../Container/Container"
import Header from "../Header/Header"
import Promo from '../Promo/Promo'
import NavTab from "../NavTab/NavTab"
import AboutProject from "../AboutProject/AboutProject"
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
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
      <Header additionalClassName="header_light" />
      <main className="main">

        <Promo />
        <NavTab />

        <section className="main__content">
          <Container>
            <h2 className="main__content-caption">О проекте</h2>
            <AboutProject />
          </Container>
        </section>

        <section className="main__content main__content_bg_light">
          <Container>
            <h2 className="main__content-caption  main__content-caption_padding-top_sm">Технологии</h2>
            <Techs />
          </Container>
        </section>

        <section className="main__content">
          <Container additionalClassName="container_size_lg">
            <h2 className="main__content-caption">Студент</h2>
            <AboutMe />
          </Container>
        </section>

        <section className="main__content">
          <Container additionalClassName="container_size_lg">
            <Portfolio />
          </Container>
        </section>

      </main >
      <Footer />
    </>
  );
}

export default Main
