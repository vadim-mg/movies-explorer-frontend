
import "./Register.css"
import Header from "../Header/Header"
import Form from "../Form/Form"

function Register() {

  const handleRegister = () => {
    // сделать логин на 3м этапе
    console.log('Выполнена регистрация!!')
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
        fields={[
          {
            name: 'name',
            label: 'Имя',
            type: 'text',
            placeholder: 'Ваше имя',
            value: 'Виталий Тест',
            validParams: { required: true, minLength: "2", maxLength: "40" },
          },
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
            validParams: { required: true, minLength: "6" },
          },
        ]}>
      </Form>
    </>
  );
}

export default Register
