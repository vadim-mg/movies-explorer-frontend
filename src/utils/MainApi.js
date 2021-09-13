import { mainApiUrl } from "./config";

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
      `${this._baseUrl} /${adress}`,
      {
        method: method,
        credentials: 'include',
        headres: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
      .then(res => res.ok
        ? res.json()
        : Promise.reject({
          message: `[${error}] Ошибка запроса: ${res.url} ${res.status}`,
          status: res.status,
        })
      )
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
      'users/movies',
      'Ошибка загрузки фильмов',
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
  signUp(email, password) {
    return this._fetch(
      'signup',
      'Ошибка создания пользователя',
      'POST',
      { email, password }
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

const mainApi = new MainApi(mainApiUrl)

export default mainApi
