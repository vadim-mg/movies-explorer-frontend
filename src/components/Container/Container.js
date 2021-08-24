
function Container({ className, children, ...props }) {
  const conainerClassName = `container ${className}`
  return (
    <div className={conainerClassName}>
      {children}
    </div>)
}

export default Container
