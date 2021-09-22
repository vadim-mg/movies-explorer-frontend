import "./CheckBox.css"

const CheckBox = ({ name, className, children , checked, onChange, disabled}) => {

  return (
    <div className={`checkbox ${className}`}>
      <input id="s1d" className="checkbox__input" type="checkbox" name={name} checked={checked} onChange={onChange} disabled={disabled}/>
      <label className="checkbox__label" htmlFor={name}>{children}</label>
    </div>
  )
}

export default CheckBox
