import './Header.css'
import Container from '../Container/Container'
import logo from '../../images/header/logo.svg'
import { Menu, menuStates } from '../Menu/Menu'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext, useCallback } from 'react'
import useCurrentWidth from '../../utils/useCurrentWidth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { breakPoints } from '../../utils/config'


function Header({ className = 'header' }) {
  const currentUser = useContext(CurrentUserContext)
  const [menuState, setMenuState] = useState(menuStates.hidden)
  const currentWidth = useCurrentWidth()

  const handleOpenMenu = () => setMenuState(currentWidth <= breakPoints.lg
    ? menuStates.popup_opened
    : menuStates.desktop)

  const handleCloseMenu = useCallback(() =>
    setMenuState(currentWidth <= breakPoints.lg
      ? menuStates.hidden
      : menuStates.desktop), [currentWidth])


  // если пользователь увеличивает ширину окна больше 992px, закрываем меню
  useEffect(() => {
    if (currentWidth > breakPoints.lg) {
      handleCloseMenu()
    }
  }, [handleCloseMenu, currentWidth])

  return (
    <header className={className}>
      <Container className="header__content container" >

        <Link to="/" className="header__link" target="_self" >
          <img className="header__logo" alt="логотип" src={logo} />
        </Link>

        {
          currentUser.loggedIn
            ? <>
              <Menu menuState={menuState} onCloseMenu={handleCloseMenu} />
              <button className="header__show-menu-button" onClick={handleOpenMenu} />
            </>
            : <>
              <div className="header__space"></div>
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_green-btn">Войти</Link>
            </>
        }

      </Container >
    </header >
  );
}

export default Header
