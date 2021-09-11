import './Container.css'
function Container({ additionalContainerClass = '', children }) {
  return (
    <div className={`container ${additionalContainerClass}`}>
      {children}
    </div>
  )
}

export default Container
