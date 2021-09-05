import './Main.css'
import Section from '../Section/Section'
import Header from "../Header/Header"
import Promo from '../Promo/Promo'
import NavTab from "../NavTab/NavTab"
import AboutProject from "../AboutProject/AboutProject"
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import Footer from "../Footer/Footer"
import { useContext, useRef } from "react"
import { CurrentUserContext } from '../../contexts/CurrentUserContext'


function Main() {
  const currentUser = useContext(CurrentUserContext)
  const sectionAboutRef = useRef(null)
  const sectionTechRef = useRef(null)
  const sectionAboutMeRef = useRef(null)


  //Чтоб увидеть верску неавторизованного пользователя на главной.
  //исчезнет на следющем этапе
  currentUser.loggedIn = false;

  return (
    <>
      <Header additionalContainerClass="header_bg_light" />

      <main className="main">

        <Promo title="Учебный проект студента факультета Веб-разработки." />

        <NavTab links={[
          {
            'id': 1,
            'name': 'О проекте',
            'linkRef': sectionAboutRef,
          },
          {
            'id': 2,
            'name': 'Tехнологии',
            'linkRef': sectionTechRef,
          },
          {
            'id': 3,
            'name': 'Портфолио',
            'linkRef': sectionAboutMeRef,
          },
        ]} />

        <Section linkRef={sectionAboutRef} title="О проекте">
          <AboutProject />
        </Section>

        <Section linkRef={sectionTechRef} title="Технологии" additionalSectionClass="section_color_gray" >
          <Techs />
        </Section>

        <Section linkRef={sectionAboutMeRef} title="Студент" additionalContainerClass="container_size_lg">
          <AboutMe />
        </Section>

        <Section additionalContainerClass="container_size_lg">
          <Portfolio />
        </Section>

      </main >

      <Footer />
    </>
  );
}

export default Main
