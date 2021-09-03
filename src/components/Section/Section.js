import './Section.css'
import Container from '../Container/Container'

function Section({ linkRef, title, children, additionalSectionClass = '', additionalContainerClass = '' }) {
  return (
    <section className={`section ${additionalSectionClass}`} ref={linkRef}>
      <Container additionalContainerClass={additionalContainerClass} >
        {title && <h2 className="section__caption">{title}</h2>}
        {children}
      </Container>
    </section>
  )
}

export default Section
