import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Page404 from '../Page404/Page404'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useState, useEffect } from 'react'
import mainApi from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

const notLoginedUser = {
  loggedIn: false,
  name: '',
  email: ''
}

function App() {

  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null);
  const [savedMovies, setSavedMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => loadProfile(), [])

  const loadSavedMovies = () => mainApi.getMovies()
    .then(result => {
      setSavedMovies(result)
      setError('')
      return Promise.resolve(result)
    })
    .catch((err) => {
      setSavedMovies([])
      setError(err.message)
      return err
    })

  const loadProfile = () => mainApi.getProfile()
    .then(result => {
      setCurrentUser({
        loggedIn: true,
        name: result.name,
        email: result.email
      })
    })
    .catch(() => setCurrentUser(notLoginedUser))
    .then(() => loadSavedMovies())

  const handlerChangeUser = (userData, route = '/') => {
    setCurrentUser(prevState => userData ? ({ ...prevState, ...userData }) : notLoginedUser)
    if (userData && userData.loggedIn && !userData.name) {
      loadProfile()
    }
    history.push(route)
  }

  const handleMovieCardBurronClick = (movie) => {
    const savedMovie = savedMovies.find(i => i.movieId === movie.movieId)

    if (savedMovie) {
      return mainApi.deleteMovie(savedMovie._id)
        .then((result) => setSavedMovies(savedMovies.filter(item => item._id !== result._id)))
    } else {
      return (savedMovie ? mainApi.deleteMovie(savedMovie._id) : mainApi.createMovie(movie))
        .then(() => loadSavedMovies())
    }
  }

  const handleLogout = () => mainApi.signOut()
    .then(() => {
      localStorage.clear()
      setSavedMovies([])
    })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser &&
        <div className="app">
          <Switch>
            <Route exact path="/" component={Main} />
            <ProtectedRoute path="/movies" component={Movies} savedMovies={savedMovies}
              onMovieCardBtnClick={handleMovieCardBurronClick} mainError={error} />
            <ProtectedRoute path="/saved-movies" component={SavedMovies} savedMovies={savedMovies}
              onMovieCardBtnClick={handleMovieCardBurronClick} mainError={error} />
            <ProtectedRoute path="/profile" component={Profile}
              onProfileUpdate={handlerChangeUser} onLogOut={handleLogout} />

            <Route path="/signup">
              <Register onRegister={handlerChangeUser} />
            </Route>
            <Route path="/signin">
              <Login onLogin={handlerChangeUser} />
            </Route>

            <ProtectedRoute path="/" component={Page404} />
          </Switch>
        </div >
      }
    </CurrentUserContext.Provider >
  );
}

export default App;
