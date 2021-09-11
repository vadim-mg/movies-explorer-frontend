import "./Form.css"
import { Link } from "react-router-dom"
import { useState, useEffect, Fragment } from "react"

function Form({ children, caption, onSubmit, submitButtonName, question, linkName, link, fields, isEditMode = true, simpleFormType = false }) {

  const [formError, setFormError] = useState('')

  const [formFieldsValues, setFormFieldsValues] = useState(fields.reduce((acc, val) => {
    acc[val.name] = val.value
    return acc
  }, {}))

  const [formFieldsErrors, setFormFieldsErrors] = useState(fields.reduce((acc, val) => {
    acc[val.name] = true
    return acc
  }, {}))

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
    setFormError('произошла какая-то ошибка - временно для проверки верстки')
  }

  const formClassName = 'form' + (simpleFormType ? ' form_simple' : '')
  const formFieldsClassName = 'form__fields' + (simpleFormType ? ' form__fields_simple' : '')
  const formCaptionClassName = 'form__caption' + (simpleFormType ? ' form__caption_simple' : '')
  const formLabelClassName = 'form__label' + (simpleFormType ? ' form__label_simple' : '')
  const formFieldClassName = 'form__field' + (simpleFormType ? ' form__field_simple' : '')
  const formFieldErrorClassName = 'form__field_error'
  const formErrorClassName = 'form__error' + (simpleFormType ? ' form__error_simple' : '')
  const formButtonClassName = 'form__button'
  const formLinkContainerClassName = 'form__link-container'
  const formLinkQuestionClassName = 'form__link-question'
  const formLinkClassName = 'form__link form__link_color_blue'


  return (
    <form className={formClassName} autoComplete="off" noValidate>
      <fieldset className={formFieldsClassName}>

        <legend className={formCaptionClassName}>{caption}</legend>

        {fields.map(field => (
          field.name !== 'line'
            ? <Fragment key={field.name}>
              <label className={formLabelClassName} htmlFor={field.name}>
                {field.label}
              </label>
              <input
                className={`${formFieldClassName} ${!formFieldsErrors[field.name] ? formFieldErrorClassName : ''}`}
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formFieldsValues[field.name]}
                onChange={handleChange}
                disabled={!isEditMode}
                {...field.validParams}
              />
              { }
            </Fragment>
            : <hr className="form__line" />
        ))}

        <p className={formErrorClassName}>{formError}</p>

      </fieldset>

      {submitButtonName &&
        <button className={formButtonClassName} type="submit" onClick={handleSubmit} disabled={!isFormValid}>
          {submitButtonName}
        </button>}

      {(question || linkName) &&
        <div className={formLinkContainerClassName}>
          <p className={formLinkQuestionClassName}>{question}</p>
          <Link className={formLinkClassName} to={link}>{linkName}</Link>
        </div>}
      {children}

    </form>
  )
}
export default Form
