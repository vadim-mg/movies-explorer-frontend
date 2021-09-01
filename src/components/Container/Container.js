import './Container.css'
function Container({ additionalClassName = '', children }) {
  return (
    <div className={`container ${additionalClassName}`}>
      {children}
    </div>
  )
}

export default Container
