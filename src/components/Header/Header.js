import './Header.css'
import Container from '../Container/Container'
import logo from '../../images/header/logo.svg'
import { Navigation, navigationStates } from '../Navigation/Navigation'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useContext, useCallback } from 'react'
import useCurrentWidth from '../../utils/useCurrentWidth'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { BREAK_POINTS } from '../../utils/config'


function Header({ additionalContainerClass = '', withoutNav }) {
  const currentUser = useContext(CurrentUserContext)
  const [navigationState, setNavigationState] = useState(navigationStates.hidden)
  const currentWidth = useCurrentWidth()

  const handleOpenNavigation = () => setNavigationState(currentWidth <= BREAK_POINTS.lg.size
    ? navigationStates.popup_opened
    : navigationStates.desktop)

  const handleCloseNavigation = useCallback(() =>
    setNavigationState(currentWidth <= BREAK_POINTS.lg.size
      ? navigationStates.hidden
      : navigationStates.desktop), [currentWidth])


  // если пользователь увеличивает ширину окна больше 992px, закрываем меню
  useEffect(() => {
    if (currentWidth > BREAK_POINTS.lg.size) {
      handleCloseNavigation()
    }
  }, [handleCloseNavigation, currentWidth])

  return (
    <header className={`header ${additionalContainerClass}`}>
      <Container additionalContainerClass={`container_size_xl header__content ${withoutNav ? 'header__content_without-nav' : ''}`} >

        <NavLink exact to="/" className="header__link" target="_self" activeClassName="header__link_active">
          <img className="header__logo" alt="логотип" src={logo} />
        </NavLink>
        {!withoutNav &&
          <>
            {
              currentUser && currentUser.loggedIn
                ? <>
                  <Navigation navigationState={navigationState} onCloseNavigation={handleCloseNavigation} />
                  <button className="header__show-menu-button" onClick={handleOpenNavigation} />
                </>
                : <>
                  <div className="header__space"></div>
                  <NavLink to="/signup" className="header__link">Регистрация</NavLink>
                  <NavLink to="/signin" className="header__link header__link_green-btn">Войти</NavLink>
                </>
            }
          </>
        }

      </Container >
    </header >
  );
}

export default Header
