import "./AboutMe.css"
import profileImage from '../../images/about-me/vadim.png'

function AboutMe() {
  return (
    <div className="about-me">
      <img className="about-me__image" src={profileImage} alt="Фотография студента"/>
      <h3 className="about-me__name">Вадим</h3>
      <p className="about-me__info">Фронтентд-разработчик</p>
      <p className="about-me__text">
        Я родился в СССР, закончил ТюмГНГУ в 2003г, работаю с тех пор в сфере ИТ на разных должностях. У меня есть жена и дети. Я люблю природу, туризм и технику. В декабре 2020 решил пройти курс по веб-разработке. Работы выполненные в процессе обучения доступны по ссылкам ниже.
      </p>
      <ul className="about-me__link-items">
        <li className="about-me__link-item">
          <a className="about-me__link" href="https://www.facebook.com/vadim.moiseev.9" target="_blank" rel="noreferrer">Facebook</a>
        </li>
        <li className="about-me__link-item">
          <a className="about-me__link" href="https://github.com/vadim-mg" target="_blank" rel="noreferrer">Github</a>
        </li>
      </ul>
    </div >
  );
}

export default AboutMe
