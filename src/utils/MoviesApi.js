import { moviesApiUrl } from "./config"
export const moviesImageUrl = 'https://api.nomoreparties.co'
const urlPattern = /^https?:\/\/([\w-]+\.)+\w+[/\w\-.~:?#[\]@!$&'()*+,;=]*$/

class MoviesApi {

  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }

  validUrl(url) {
    return urlPattern.test(url) ? url : 'https://api.nomoreparties.co/'
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
          country: item.country || 'No Country specified in BeatFilms',
          director: item.director || 'No Director specified in BeatFilms',
          duration: item.duration || 0,
          year: item.year || 'No Year specified in BeatFilms',
          description: item.description || 'No Description specified in BeatFilms',
          image: this.validUrl(moviesImageUrl + item.image.url),
          trailer: this.validUrl(item.trailerLink),
          thumbnail: this.validUrl(moviesImageUrl + item.image.formats.thumbnail.url),
          nameRU: item.nameRU || 'No Russian movie Name specified in BeatFilms',
          nameEN: item.nameEN || 'No English movie name specified in BeatFilms',
        }))
      })
  }
}

const moviesApi = new MoviesApi(moviesApiUrl)

export default moviesApi
