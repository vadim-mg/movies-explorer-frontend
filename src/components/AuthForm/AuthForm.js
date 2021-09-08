import "./AuthForm.css"
import Header from "../Header/Header"
import { Link } from "react-router-dom"
import { useState } from "react"

function AuthForm({ caption, onSubmit, children, isFormValid, submitButtonName, question, linkName, link }) {

  const [formError, setFormError] = useState('Что-то пошло не так - тут ошибка по заданию будет появляться при получении ошибки от сервера')


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
      <form className="auth-form" autoComplete="off" noValidate>
        <fieldset className="auth-form__fields">

          <legend className="auth-form__caption">{caption}</legend>

          {children}

          <p className="auth-form__error">{formError}</p>
        </fieldset>

        <button className="auth-form__button" type="submit" onClick={handleSubmit} disabled={!isFormValid}>{submitButtonName}</button>

        <div className="auth-form__link-container">
          <p className="auth-form__link-question">{question}</p>
          <Link className="auth-form__link auth-form__link_color_blue" to={link}>{linkName}</Link>
        </div>

      </form>
    </>
  )
}
export default AuthForm
