import './Navigation.css'
import { Link } from 'react-router-dom'

const navigationStates = {
  'hidden': 0,
  'popup_opened': 1,
  'desktop': 2,
}

function Navigation({ onCloseNavigation, navigationState }) {
  const classModifier =
    `${navigationState === navigationStates.popup_opened ? ' navigation_popup-opened' : ''}` +
    `${navigationState === navigationStates.desktop ? ' navigation_desktop' : ''}`
  return (
    <div className={`navigation ${classModifier}`}>
      <nav className="navigation__panel">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_hidden-on-lg" >
            <Link to="/" className="navigation__item-link" target="_self" onClick={onCloseNavigation}>Главная</Link>
          </li>
          <li className="navigation__item" >
            <Link to="/movies" className="navigation__item-link" target="_self" onClick={onCloseNavigation}>Фильмы</Link>
          </li>
          <li className="navigation__item" >
            <Link to="/saved-movies" className="navigation__item-link" target="_self" onClick={onCloseNavigation}>Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link to="/profile" className="navigation__profile-link" target="_self">
          <i className="navigation__profile-link-icon"></i>Аккаунт
        </Link>
        <button className="navigation__close-button" onClick={onCloseNavigation} />
      </nav>
    </div >
  )
}

export { Navigation }
export { navigationStates }

