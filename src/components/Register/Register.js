
import "./Register.css"
import Header from "../Header/Header"
import Form from "../Form/Form"
import isEmail from 'validator/lib/isEmail';

function Register() {

  const handleRegister = () => {
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
            title: 'Имя может содержать латиницу, кириллицу, пробел или дефис',
            value: '',
            validParams: { required: true, minLength: "2", maxLength: "40", pattern: "[A-Za-zА-Яа-яЁё\\s\\-]*" },
          },
          {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            placeholder: 'Ваш E-mail',
            value: '',
            validParams: { required: true, customValidator: (val) => isEmail(val) },
          },
          {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            placeholder: 'Ваш пароль',
            value: '',
            validParams: { required: true, minLength: "6" },
          },
        ]}>
      </Form>
    </>
  );
}

export default Register
