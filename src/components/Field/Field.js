import "./Field.css"
import { useState, useEffect } from "react"

function Field({ field, value, isEditMode, simpleFormType = false, onChange }) {
  const [fieldValue, setFieldValue] = useState(value)

  useEffect(() => setFieldValue(value), [value])

  const [fieldError, setFieldError] = useState({ valid: true, text: '' })

  const handleChange = event => {
    const input = event.target
    setFieldValue(input.value)
    const isFieldValid = input.validity.valid && (field.customvalidator ? field.customvalidator(input.value) : true)
    setFieldError({
      valid: isFieldValid,
      text: input.title + (input.validationMessage ? `  ${input.validationMessage}` : ''),
      patternMismatch: input.validity.patternMismatch
    })
    onChange(input.name, input.value, isFieldValid)
  }

  const fieldClassName = 'field' + (simpleFormType ? ' field_simple' : '')
  const fieldLabelClassName = 'field__label' + (simpleFormType ? ' field__label_simple' : '')
  const fieldFieldClassName = 'field__input' + (simpleFormType ? ' field__input_simple' : '')
  const fieldFieldErrorClassName = 'field__input_error'
  const fieldFieldErrorTextClassName = 'field__input-error-text' + (simpleFormType ? ' field__input-error-text_simple' : '')

  const fieldErrorText = fieldError.text +
    (fieldError.patternMismatch ? (field.title ? ` (${field.title})` : '') : '')

  return (
    <div className={fieldClassName}>
      <label className={fieldLabelClassName} htmlFor={field.name}> {field.label} </label>
      <input
        className={`${fieldFieldClassName} ${!fieldError.valid ? fieldFieldErrorClassName : ''}`}
        type={field.type}
        id={field.name}
        name={field.name}
        title={field.title}
        placeholder={field.placeholder}
        value={fieldValue}
        onChange={handleChange}
        disabled={!isEditMode}
        {...field.validParams}
      />
      {!fieldError.valid ? <p className={fieldFieldErrorTextClassName} > {fieldErrorText} </p> : ''}
    </div>
  )

}

export default Field
