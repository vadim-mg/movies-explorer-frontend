import { moviesApiUrl } from "./config"

class MoviesApi {

  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  loadMovies() {
    return fetch(this._baseUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.ok
        ? Promise.resolve(res.json())
        : Promise.reject({
          message: `Ошибка запроса: ${res.url} ${res.status}`,
          status: res.status,
        })
      )
  }

}

const moviesApi = new MoviesApi(moviesApiUrl)

export default moviesApi
