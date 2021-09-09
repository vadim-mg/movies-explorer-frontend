import "./Form.css"
import Header from "../Header/Header"
import { Link } from "react-router-dom"
import { useState, useEffect, Fragment } from "react"

function Form({ caption, onSubmit, submitButtonName, question, linkName, link, fields }) {

  const [formError, setFormError] = useState('Что-то пошло не так - тут ошибка по заданию будет появляться при получении ошибки от сервера')

  const [formFieldsValues, setFormFieldsValues] = useState(fields.reduce((acc, val) => {
    acc[val.name] = val.value
    return acc
  }, {}))

  const [formFieldsErrors, setFormFieldsErrors] = useState(fields.reduce((acc, val) => {
    acc[val.name] = true
    return acc
  }))

  const [isFormValid, setIsFormValid] = useState(true)

  useEffect(() => {
    if (Object.values(formFieldsErrors).some(i => i === false)) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [formFieldsErrors])

  const handleChange = event => {
    const input = event.target
    const { name, value } = input
    setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
    setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit()
    // сделать сохранение на 3м этапе
    // setFormError('')
    setFormError('произошла какая-то ошибка')
  }

  return (
    <>
      <Header additionalContainerClass="header_empty" withoutNow />
      <form className="form" autoComplete="off" noValidate>
        <fieldset className="form__fields">

          <legend className="form__caption">{caption}</legend>

          {fields.map(field => (
            <Fragment key={field.name}>
              <label className="form__label" htmlFor={field.name}>{field.label}</label>
              <input
                className={`form__field ${!formFieldsErrors[field.name] ? 'form__field_error' : ''}`}
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formFieldsValues[field.name]}
                onChange={handleChange}
                {...field.validParams}
              />
            </Fragment>
          ))}

          <p className="form__error">{formError}</p>

        </fieldset>

        <button className="form__button" type="submit" onClick={handleSubmit} disabled={!isFormValid}>{submitButtonName}</button>

        <div className="form__link-container">
          <p className="form__link-question">{question}</p>
          <Link className="form__link form__link_color_blue" to={link}>{linkName}</Link>
        </div>

      </form>
    </>
  )
}
export default Form
