import "./Profile.css"
import Header from "../Header/Header"
import { useState } from "react"
import { Link } from "react-router-dom"
function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [formFieldsValues, setFormFieldsValues] = useState({ name: 'Виталий Тест', email: 'test@test.ru' })
  const handleChange = event => {
    const input = event.target
    const { name, value } = input
    setFormFieldsValues(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <Header />
      <form className="profile" autoComplete="off" noValidate>
        <fieldset className="profile__fields">
          <legend className="profile__caption">Привет, Виталий!</legend>
          <label className="profile__label" htmlFor="name">Имя</label>
          <input className="profile__field" type="text" id="name" name="name" placeholder="Ваше имя" value={formFieldsValues.name} disabled={!isEditMode} onChange={handleChange} />
          <hr className="profile__line" />
          <label className="profile__label" htmlFor="email">E-mail</label>
          <input className="profile__field" type="text" id="email" name="email" placeholder="Ваш E-mail" value={formFieldsValues.email} disabled={!isEditMode} onChange={handleChange} />
        </fieldset>
        {isEditMode
          ? <button className="profile__button">Сохранить</button>
          : <>
            <button className="profile__link" onClick={() => { setIsEditMode(true) }}>Редактировать</button>
            <Link className="profile__link profile__link_color_red" to="/">Выйти из аккаута</Link>
          </>
        }
      </form>
    </>
  );
}

export default Profile
