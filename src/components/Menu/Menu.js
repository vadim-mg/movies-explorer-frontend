import './Menu.css'
import { Link } from 'react-router-dom'

const menuStates = {
  'hidden': 0,
  'popup_opened': 1,
  'desktop': 2,
}

function Menu({ onCloseMenu, menuState }) {
  const classModifier =
    `${menuState === menuStates.popup_opened ? ' menu_popup-opened' : ''}` +
    `${menuState === menuStates.desktop ? ' menu_desktop' : ''}`
  return (
    <div className={`menu ${classModifier}`}>
      <nav className="menu__panel">
        <ul className="menu__items">
          <li className="menu__item menu__item_hidden-on-lg" >
            <Link to="/" className="menu__item-link" target="_self" onClick={onCloseMenu}>Главная</Link>
          </li>
          <li className="menu__item" >
            <Link to="/movies" className="menu__item-link" target="_self" onClick={onCloseMenu}>Фильмы</Link>
          </li>
          <li className="menu__item" >
            <Link to="/saved-movies" className="menu__item-link" target="_self" onClick={onCloseMenu}>Сохранённые фильмы</Link>
          </li>
        </ul>
        <Link to="/profile" className="menu__profile-link" target="_self">
          <i className="menu__profile-link-icon"></i>Аккаунт
        </Link>
        <button className="menu__close-button" onClick={onCloseMenu} />
      </nav>
    </div >
  )
}

export { Menu }
export { menuStates }

