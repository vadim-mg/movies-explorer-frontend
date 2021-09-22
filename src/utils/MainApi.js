import { MAIN_API_URL } from "./config";

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  /**
   * Вызов API
   * @param {String} adress - переменная часть адреса запроса
   * @param {String} error - текст ошибки для передачи в Catch, в случае ошибки
   * @param {String} method1, по дефолту GET
   * @param {Object} rest - другие параметры
   * @returns
   */
  _fetch(adress, error = 'Какая-то ошибка', method = 'GET', rest) {
    return fetch(
      `${this._baseUrl}/${adress}`,
      {
        method: method,
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest)
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 429) {
          return Promise.reject({
            message: 'Сервер перегружен, повторите попытку позже!',
            status: res.status,
          })
        }
        if (adress !== 'signin' && res.status === 401) {
          return Promise.reject({
            message: 'Необходима авторизация!',
            status: res.status,
          })
        }
        return res.text().then(text => { throw new Error(text) })
      })
      .catch(err => {
        if (err.message === 'Failed to fetch') {
          err.message = 'Сервер не доступен'
        }
        const textError = `${error} : ${err.message || JSON.parse(err.message).message}`
        return Promise.reject({ message: textError , status: err.status})
      })
  }

  // возвращает информацию о пользователе(email и имя)
  getProfile() {
    return this._fetch(
      'users/me',
      'Ошибка загрузки профиля',
    )
  }

  // обновляет информацию о пользователе(email и имя)
  setProfile({ email, name }) {
    return this._fetch(
      'users/me',
      'Ошибка обновления профиля',
      'PATCH',
      { email: email, name: name }
    )
  }

  //	все сохранённые пользователем фильмы
  getMovies() {
    return this._fetch(
      'movies',
      'Ошибка загрузки сохранённых фильмов',
    )
  }

  // создаёт фильм с переданными в теле данными
  createMovie(movie) {
    return this._fetch(
      'movies',
      'Ошибка добавления фильма',
      'POST',
      movie
    )
  }

  // 	удаляет сохранённый фильм по movieId
  deleteMovie(movieId) {
    return this._fetch(
      'movies/' + movieId,
      'Ошибка удаления фильма',
      'DELETE',
    )
  }

  //	создаёт пользователя с переданными в теле данными
  signUp(email, password, name) {
    return this._fetch(
      'signup',
      'Ошибка создания пользователя',
      'POST',
      { email, password, name }
    )
  }

  // ЛОгин -сохраняет JWT в куках, если в теле запроса переданы правильные почта и пароль
  signIn(email, password) {
    return this._fetch(
      'signin',
      'Ошибка авторизации',
      'POST',
      { email, password }
    )
  }

  // signout	удаляет JWT из куки
  signOut() {
    return this._fetch(
      'signout',
      'Ошибка',
      'POST',
    )
  }

}

const mainApi = new MainApi(MAIN_API_URL)

export default mainApi
