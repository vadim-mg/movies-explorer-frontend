
import "./Register.css"

import { useState, useEffect } from "react"

import AuthForm from "../AuthForm/AuthForm"


function Register() {

  const [formFieldsValues, setFormFieldsValues] = useState({ name: 'Виталий Тест', email: 'test@test.ru', password: '123456' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ name: true, email: true, password: true })
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

  const handleRegister = () => {
    // сделать логин на 3м этапе
    console.log('Выполнена регистрация!!')
  }

  return (
    <AuthForm caption="Добро пожаловать!" onSubmit={handleRegister} isFormValid={isFormValid} submitButtonName="Зарегистрироваться" question="Уже зарегистрированы?" linkName="Войти" link="/signin">

      <label className="auth-form__label" htmlFor="name">Имя</label>
      <input className={`auth-form__field ${!formFieldsErrors.name ? 'auth-form__field_error' : ''}`} type="text" id="name" name="name" placeholder="Ваше имя" required minLength="2" maxLength="40" value={formFieldsValues.name} onChange={handleChange} />


      <label className="auth-form__label" htmlFor="email">E-mail</label>
      <input className={`auth-form__field ${!formFieldsErrors.email ? 'auth-form__field_error' : ''}`} type="email" id="email" name="email" placeholder="Ваш E-mail" required value={formFieldsValues.email} onChange={handleChange} />

      <label className="auth-form__label" htmlFor="password">Пароль</label>
      <input className={`auth-form__field ${!formFieldsErrors.password ? 'auth-form__field_error' : ''}`} type="password" id="password" name="password" placeholder="Ваш пароль" required minLength="6" value={formFieldsValues.password} onChange={handleChange} />

    </AuthForm>
  );
}

export default Register
