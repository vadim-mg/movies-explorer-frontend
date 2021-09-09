import "./Profile.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { CurrentUserContext } from '../../contexts/CurrentUserContext'



function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)
  const currentUser = useContext(CurrentUserContext)



  const handleSubmit = () => {
    // setIsEditMode(false)
    // сделать сохранение на 3м этапе
  }

  const handleLogout = () => {
    // сделать логоф на 3м этапе
    console.log('Выполнен выход!!')
  }

  return (
    <>
      <Header />
      <Form
        simpleFormType
        caption={`Привет, ${currentUser.name}!`}
        onSubmit={isEditMode ? handleSubmit : () => { setIsEditMode(true) }}
        submitButtonName={isEditMode ? "Cохранить" : null}
        isEditMode={isEditMode}

        fields={[
          {
            name: 'name',
            label: 'Имя',
            type: 'text',
            placeholder: 'Ваше имя',
            value: currentUser.name,
            validParams: { required: true, minLength: "2", maxLength: "40" },
          },
          {
            name: 'line',
          },
          {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            placeholder: 'Ваш E-mail',
            value: currentUser.email,
            validParams: { required: true },
          },
        ]}>
        {!isEditMode &&
          <div className="profile__links">
            <button className="profile__link" onClick={() => { setIsEditMode(true) }}>Редактировать</button>
            <Link className="profile__link profile__link_color_red" onClick={handleLogout} to="/">Выйти из аккаута</Link>
          </div>
        }
      </Form>

    </>
  );
}

export default Profile
