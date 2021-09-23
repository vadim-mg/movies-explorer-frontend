import "./Profile.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import { useState, useContext, useEffect } from "react"
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import mainApi from "../../utils/MainApi"
import isEmail from 'validator/lib/isEmail';


function Profile({ onProfileUpdate, onLogOut, mainError, handleError }) {
  const currentUser = useContext(CurrentUserContext)
  const [values, setValues] = useState(currentUser)
  const [isEditMode, setIsEditMode] = useState(false)
  const [sucessfullMessage, setSucessfullMessage] = useState(null)

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser])


  const handleSubmit = (userData) => {
    setIsEditMode(false)
    setValues(userData)
    return mainApi.setProfile({
      email: userData.email,
      name: userData.name
    })
      .then(res => {
        onProfileUpdate({ ...res, 'loggedIn': true }, '/profile')
        setSucessfullMessage('Данные профиля сохранены успешно!')
      })
      .catch(err => {
        setIsEditMode(true)
        handleError(err)
      })
  }

  const handleLogout = () => {
    onLogOut()
  }

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setValues({ name: '', email: '' })
      setTimeout(() => setValues(currentUser), 1)
    }else{
      setSucessfullMessage('')
    }
    setIsEditMode(!isEditMode)
  }

  return (
    <>
      <Header />
      <Form
        simpleFormType
        caption={`Привет, ${currentUser.name}!`}
        onSubmit={isEditMode ? handleSubmit : ''}
        submitButtonName={isEditMode ? "Cохранить" : null}
        isEditMode={isEditMode}
        values={values}
        mainError={mainError}
        fields={[
          {
            name: 'name',
            label: 'Имя',
            type: 'text',
            placeholder: 'Ваше имя',
            validParams: { required: true, minLength: "2", maxLength: "40", pattern: "[A-Za-zА-Яа-яЁё\\s\\-]*" },
            title: 'Имя может содержать латиницу, кириллицу, пробел или дефис',
          },
          {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            placeholder: 'Ваш E-mail',
            validParams: { required: true },
            customvalidator: (val) => isEmail(val),
            title: 'Поле Email должно быть заполнено корректно.',
          },
        ]}>

        {sucessfullMessage !== '' ? <p className="profile__sucessfull-message">{sucessfullMessage}</p> : ''}

        <div className="profile__links">
          <button type="button" className="profile__link" onClick={handleToggleEditMode}>{!isEditMode ? 'Редактировать' : 'Вернуться'}</button>
          {!isEditMode && <button type="button" className="profile__link profile__link_color_red" onClick={handleLogout}>Выйти из аккаута</button>}
        </div>

      </Form>

    </>
  );
}

export default Profile
