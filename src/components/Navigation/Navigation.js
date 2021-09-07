import './Navigation.css'
import { NavLink } from 'react-router-dom'

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
            <NavLink exact to="/" className="navigation__item-link" target="_self" onClick={onCloseNavigation} activeClassName="navigation__item-link_active">Главная</NavLink>
          </li>
          <li className="navigation__item" >
            <NavLink to="/movies" className="navigation__item-link" target="_self" onClick={onCloseNavigation} activeClassName="navigation__item-link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__item" >
            <NavLink to="/saved-movies" className="navigation__item-link" target="_self" onClick={onCloseNavigation} activeClassName="navigation__item-link_active">Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="navigation__profile-link" target="_self" activeClassName="navigation__profile-link_active">
          <i className="navigation__profile-link-icon"></i>Аккаунт
        </NavLink>
        <button className="navigation__close-button" onClick={onCloseNavigation} />
      </nav>
    </div >
  )
}

export { Navigation }
export { navigationStates }

