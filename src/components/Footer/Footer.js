import './Footer.css'
import Container from '../Container/Container'

function Footer() {
  return (
    <footer className="footer">
      <Container additionalContainerClass="container_size_lg">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">

          <ul className="footer__links">
            <li className="footer__link-item">
              <a href="https://practicum.yandex.ru/web/" className="footer__link" target="_blank" rel="noreferrer" >Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a href="https://github.com/vadim-mg" className="footer__link" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__link-item">
              <a href="https://www.facebook.com/" className="footer__link" target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>

          <span className="footer__copyright">{new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer >
  );
}

export default Footer
