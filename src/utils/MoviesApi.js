import { moviesApiUrl } from "./config"
export const moviesImageUrl = 'https://api.nomoreparties.co'

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
          status: res.status,
          message: `Ошибка запроса: ${res.url} ${res.status}`,
        })
      )
      .then(res => {
        return res.map(item => ({
          id: res._id,
          movieId: item.id,
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          image: moviesImageUrl + item.image.url,
          trailer: item.trailerLink,
          thumbnail: moviesImageUrl + item.image.formats.thumbnail.url,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
        }))
      })
  }
}

const moviesApi = new MoviesApi(moviesApiUrl)

export default moviesApi
