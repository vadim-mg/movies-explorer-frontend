import "./Form.css"
import { useState, useEffect, useCallback, Fragment } from "react"
import Field from "../Field/Field"
import { Link } from "react-router-dom"

function Form({ children, values, caption, onSubmit, submitButtonName, question, linkName, link, fields, isEditMode = true, simpleFormType = false, mainError = '' }) {

  const [formFields, setFormFields] = useState(values)
  const [formFieldsErrors, setFormFieldsErrors] = useState(fields.reduce((acc, val) => ({ ...acc, [val.name]: { valid: values[val.name] ? true : false } })
    , {}))
  const [isFieldsChanged, setIsFieldsChanged] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    return () => setFormFields(values)
  }, [])

  useEffect(() => {
    setFormFields(values)
  }, [values])


  useEffect(() => {
    if (Object.values(formFieldsErrors).some(i => i.valid === false)) {
      setIsFormValid(false)
      return
    } else {
      setIsFormValid(true)
    }
    for (let
      prop in values) {
      if (formFields && formFields[prop] && (formFields[prop] !== values[prop])) {
        setIsFieldsChanged(true)
        return
      }
    }
    setIsFieldsChanged(false)
  }, [formFields])


  const setField = useCallback(
    (name, value, valid) => {
      setFormFields(prevState => ({ ...prevState, [name]: value }))
      setFormFieldsErrors(prevState => ({ ...prevState, [name]: { valid: valid } }))
    },
    [setIsFormValid]
  )


  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(formFields)
      .then(() => {
        setFormError('')
      })
      .catch(err => {
        setFormError(err.message)
      })
  }

  const formClassName = 'form' + (simpleFormType ? ' form_simple' : '')
  const formFieldsClassName = 'form__fields' + (simpleFormType ? ' form__fields_simple' : '')
  const formCaptionClassName = 'form__caption' + (simpleFormType ? ' form__caption_simple' : '')
  const formLineClassName = 'form__line' + (simpleFormType ? ' form__line_simple' : '')
  const formErrorClassName = 'form__error' + (simpleFormType ? ' form__error_simple' : '')
  const formButtonClassName = 'form__button'
  const formLinkContainerClassName = 'form__link-container'
  const formLinkQuestionClassName = 'form__link-question'
  const formLinkClassName = 'form__link form__link_color_blue'

  return (
    <form className={formClassName} autoComplete="off" noValidate onSubmit={handleSubmit}>
      <fieldset className={formFieldsClassName}>

        <legend className={formCaptionClassName}>{caption}</legend>

        {fields.map((field, i) => (
          <Fragment key={`${field.name}-${i}`}>

            {/* для простой формы добавляем разделительную линию между полями */}
            {(simpleFormType && i) ? <hr className={formLineClassName} /> : ''}
            <Field
              field={field}
              value={values[field.name]}
              isEditMode={isEditMode}
              simpleFormType={simpleFormType}
              onChange={setField} />

          </Fragment>
        ))}

        <p className={formErrorClassName}>{formError}</p>
        {mainError !=='' ? <p className={formErrorClassName}>{mainError}</p> : ''}

      </fieldset>

      {submitButtonName &&
        <button className={formButtonClassName} type="submit" disabled={!(isFormValid && isFieldsChanged)}>
          {submitButtonName}
        </button>}

      {(question || linkName) &&
        <div className={formLinkContainerClassName}>
          <p className={formLinkQuestionClassName}>{question}</p>
          <Link type="button" className={formLinkClassName} to={link}>{linkName}</Link>
        </div>}
      {children}

    </form>
  )
}
export default Form
