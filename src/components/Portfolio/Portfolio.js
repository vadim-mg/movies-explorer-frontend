import './Portfolio.css'
function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__caption">Портфолио</h2>
      <ul className="portfolio__link-items">
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://github.com/vadim-mg/how-to-learn" rel="noreferrer" target="_blank">Статичный сайт</a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://github.com/vadim-mg/russian-travel" rel="noreferrer" target="_blank">Адаптивный сайт</a>
        </li>
        <li className="portfolio__link-item">
          <a className="portfolio__link" href="https://github.com/vadim-mg/react-mesto-api-full" rel="noreferrer" target="_blank">Одностраничное приложение</a>
        </li>
      </ul>
    </div >
  );
}

export default Portfolio
