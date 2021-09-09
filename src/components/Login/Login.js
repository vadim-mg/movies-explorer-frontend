
import "./Login.css"
import Header from "../Header/Header"
import Form from "../Form/Form"

function Login() {

  const handleLogin = () => {
    // сделать логин на 3м этапе
    console.log('Выполнена авторизация!!')
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
        fields={[
          {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            placeholder: 'Ваш E-mail',
            value: 'test@test.ru',
            validParams: { required: true },
          },
          {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            placeholder: 'Ваш пароль',
            value: '123456',
            validParams: { required: true },
          },
        ]}>
      </Form>
    </>
  );
}

export default Login
