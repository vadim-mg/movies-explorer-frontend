import Container from '../Container/Container'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text container">Учебный проект Яндекс.Практикум х BeatFilm.</div>
      <Container className="footer__content container">
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
        <p className="footer__copyright">©{new Date().getFullYear()}</p>
      </Container>
    </footer >
  );
}

export default Footer
