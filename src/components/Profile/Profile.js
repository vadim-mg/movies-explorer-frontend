import "./Profile.css"
import Header from "../Header/Header"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [formFieldsValues, setFormFieldsValues] = useState({ name: 'Виталий Тест', email: 'test@test.ru' })
  const [formFieldsErrors, setFormFieldsErrors] = useState({ name: true, email: true })
  const [isFormValid, setIsFormValid] = useState(true)
  const [formError, setFormError] = useState('')

  const handleChange = event => {
    const input = event.target
    const { name, value } = input
    setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
    setFormFieldsErrors(prevState => ({ ...prevState, [name]: input.validity.valid }))
  }

  useEffect(() => {
    if (Object.values(formFieldsErrors).some(i => i === false)) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [formFieldsErrors])

  const handleSubmit = event => {
    event.preventDefault()
    setIsEditMode(false)
    // сделать сохранение на 3м этапе
    setFormError('')
    // setFormError('произошла какая-то ошибка')
  }

  const handleLogout = () => {
    // сделать логоф на 3м этапе
    console.log('Выполнен выход!!')
  }

  return (
    <>
      <Header />
      <form className="profile" autoComplete="off" noValidate>
        <fieldset className="profile__fields">

          <legend className="profile__caption">Привет, Виталий!</legend>

          <label className="profile__label" htmlFor="name">Имя</label>
          <input className={`profile__field ${!formFieldsErrors.name ? 'profile__field_error' : ''}`} type="text" id="name" name="name" placeholder="Ваше имя" required minLength="2" maxLength="40" value={formFieldsValues.name} disabled={!isEditMode} onChange={handleChange} />

          <hr className="profile__line" />

          <label className="profile__label" htmlFor="email">E-mail</label>
          <input className={`profile__field ${!formFieldsErrors.email ? 'profile__field_error' : ''}`} type="email" id="email" name="email" placeholder="Ваш E-mail" required value={formFieldsValues.email} disabled={!isEditMode} onChange={handleChange} />

        </fieldset>
        {isEditMode
          ? <>
            <p className="profile__error">{formError}</p>
            <button className="profile__button" type="submit" onClick={handleSubmit} disabled={!isFormValid}>Сохранить</button>
          </>
          : <>
            <button className="profile__link" onClick={() => { setIsEditMode(true) }}>Редактировать</button>
            <Link className="profile__link profile__link_color_red" onClick={handleLogout} to="/">Выйти из аккаута</Link>
          </>
        }
      </form>
    </>
  );
}

export default Profile
