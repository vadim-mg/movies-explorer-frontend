import './Promo.css'
import Container from '../Container/Container'

function Promo() {
  return (
    <section className="promo">
      <Container additionalClassName="container_full-screen">
        <h1 className="promo__caption">Учебный проект студента факультета Веб-разработки.</h1>
      </Container>
    </section>
  );
}

export default Promo
