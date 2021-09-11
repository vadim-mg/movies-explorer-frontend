import './Promo.css'
import Section from '../Section/Section';

function Promo({ title }) {
  return (
    <Section additionalSectionClass="promo" additionalContainerClass="container_size_full-screen promo__content">
      <h1 className="promo__caption">{title}</h1>
    </Section>
  );
}

export default Promo
