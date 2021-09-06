import "./Profile.css"
import Header from "../Header/Header"
import { useState } from "react"
function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <>
      <Header />
      <form className="profile">
        <fieldset className="profile__fields">
          <legend className="profile__caption">Привет, Виталий!</legend>
          <label className="profile__label" htmlFor="name">Имя</label>
          <input className="profile__field" type="text" id="name" placeholder="Ваше имя" value="Виталий" />
          <hr className="profile__line" />
          <label className="profile__label" htmlFor="email">E-mail</label>
          <input className="profile__field" type="text" id="email" placeholder="Ваш E-mail" value="pochta@yandex.ru" />
        </fieldset>
        {isEditMode
          ? <button className="profile__button">Сохранить</button>
          : <>
            <a className="profile__link" onClick={() => { setIsEditMode(true) }}>Редактировать</a>
            <a className="profile__link profile__link_color_red">Выйти из аккаута</a>
          </>
        }
      </form>
    </>
  );
}

export default Profile
