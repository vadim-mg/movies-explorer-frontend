import './NavTab.css'
import Container from '../Container/Container';

function NavTab({ links }) {

  const scrollTo = (element) =>
    element.scrollIntoView({ behavior: "smooth" })

  return (
    <nav className="nav-tab">
      <Container>
        <ul className="nav-tab__items">
          {links && links.map(item =>
            <li key={item.id} className="nav-tab__item">
              <a className="nav-tab__item-link" onClick={() => { scrollTo(item.linkRef.current) }}>
                {item.name}</a>
            </li>)}
        </ul>
      </Container>
    </nav >
  );
}

export default NavTab
