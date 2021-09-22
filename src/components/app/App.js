import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Page404 from '../Page404/Page404'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
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
    .catch((err) => handleError(err))

  const loadProfile = () => mainApi.getProfile()
    .then(result => {
      setCurrentUser({
        loggedIn: true,
        name: result.name,
        email: result.email
      })
      setError('')
    })
    .then(() => loadSavedMovies())
    .catch((err) => handleError(err))

  const handleChangeUser = (userData, route = '/') => {
    setCurrentUser(prevState => userData ? ({ ...prevState, ...userData }) : notLoginedUser)
    if (userData && userData.loggedIn && !userData.name) {
      loadProfile()
    }
    history.push(route)
  }

  const handleMovieCardBurronClick = (movie) => {
    const savedMovie = savedMovies.find(i => i.movieId === movie.movieId)
    return (savedMovie
      ? mainApi.deleteMovie(savedMovie._id)
        .then((result) => {
          setSavedMovies(savedMovies.filter(item => item._id !== result._id))
          setError('')
        })
      : mainApi.createMovie(movie)
        .then((result) => {
          const arr = savedMovies.slice()
          arr.push(result)
          setSavedMovies(arr)
          setError('')
        }))
      .catch(err => handleError(err))
  }

  const handleError = (err) => {
    if (err.status && err.status === 401) {
      setTimeout(clearAndRedirect, 3000)
    }
    setError(err.message)
    return err
  }

  const clearAndRedirect = () => {
    localStorage.clear()
    setSavedMovies([])
    setError('')
    setCurrentUser(notLoginedUser)
    history.push('/')
  }

  const handleLogout = () => mainApi.signOut()
    .then(() => clearAndRedirect())
    .catch(err => setError(err.message))

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
              onProfileUpdate={handleChangeUser} onLogOut={handleLogout}
              mainError={error} handleError={handleError} />

            <Route path="/signup">
              {currentUser.loggedIn ? <Redirect to="/" /> : <Register onRegister={handleChangeUser} />}
            </Route>
            <Route path="/signin">
              {currentUser.loggedIn ? <Redirect to="/" /> : <Login onLogin={handleChangeUser} />}
            </Route>

            <ProtectedRoute path="/" component={Page404} />

          </Switch>
        </div >
      }
    </CurrentUserContext.Provider >
  );
}

export default App;