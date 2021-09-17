
import "./Register.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import isEmail from 'validator/lib/isEmail';
import mainApi from "../../utils/MainApi";

function Register({ onRegister }) {

  const handleRegister = (data) => {
    const { email, password, name } = data
    return mainApi
      .signUp(email, password, name)
      .then(() => mainApi.signIn(email, password))
      .then(() => onRegister({ email, name, 'loggedIn': true }, '/movies'))

    //cath есть в форме, откуда вызывается handleRegister
  }

  return (
    <>
      <Header additionalContainerClass="header_empty" withoutNav />
      <Form
        caption="Добро пожаловать!"
        onSubmit={handleRegister}
        submitButtonName="Зарегистрироваться"
        question="Уже зарегистрированы?"
        linkName="Войти"
        link="/signin"
        values={{
          name: '',
          email: '',
          password: ''
        }}
        fields={[
          {
            name: 'name',
            label: 'Имя',
            type: 'text',
            placeholder: 'Ваше имя',
            title: 'Имя может содержать латиницу, кириллицу, пробел или дефис',
            validParams: { required: true, minLength: "2", maxLength: "40", pattern: "[A-Za-zА-Яа-яЁё\\s\\-]*" },
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
          {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            placeholder: 'Ваш пароль',
            validParams: { required: true, minLength: "6" },
          },
        ]}>
      </Form>
    </>
  );
}

export default Register
