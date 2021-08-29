import './Container.css'
function Container({ className = '', children }) {
  const conainerClassName = `container ${className}`
  return (
    <>
      <div className={conainerClassName}>
        {children}
      </div>
    </>)
}

export default Container
