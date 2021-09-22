
import "./Login.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import mainApi from "../../utils/MainApi"

function Login({ onLogin }) {

  const handleLogin = (data) => {
    const { email, password } = data
    return mainApi
      .signIn(email, password)
      .then(() => onLogin({ email, 'loggedIn': true }, '/movies'))
    //cath есть в форме, откуда вызывается handleLogin
  }

  return (
    <>
      <Header additionalContainerClass="header_empty" withoutNav />
      <Form
        caption="Рады видеть!"
        onSubmit={handleLogin}
        submitButtonName="Войти"
        question="Еще не зарегистрированы?"
        linkName="Регистрация"
        link="/signup"
        values={{
          email: '',
          password: '',
        }}
        fields={[
          {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            placeholder: 'Ваш E-mail',
            validParams: { required: true },
          },
          {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            placeholder: 'Ваш пароль',
            validParams: { required: true },
          },
        ]}>
      </Form>
    </>
  );
}

export default Login
