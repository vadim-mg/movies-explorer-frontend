import Container from '../Container/Container'
import logo from '../../images/header/logo.svg'
// import menu from '../../images/header/menu.svg'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <header className="header">
      <Container className="header__content container">
        <Link to="/" className="header__link" target="_self" >
          <img className="header__logo" alt="логотип" src={logo} />
        </Link>
        <button className="header__menu-button" />
      </Container>
    </header >
  );
}

export default Header
