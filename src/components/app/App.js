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

const notLoggedUser = {
  loggedIn: false,
  name: '',
  email: ''
}

function App() {

  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null);


  const loadProfile = () => mainApi.getProfile()
    .then(result => setCurrentUser({
      loggedIn: true,
      name: result.name,
      email: result.email
    }))
    .catch(() => setCurrentUser(notLoggedUser))

  useEffect(() => loadProfile(), [])


  const handlerChangeUser = (userData, route = '/') => {
    setCurrentUser(prevState => userData ? ({ ...prevState, ...userData }) : notLoggedUser)
    if (userData && userData.loggedIn && !userData.name) {
      loadProfile()
    }
    history.push(route)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      {currentUser && <div className="app">
        <Switch>
          <Route exact path="/" component={Main} />
          <ProtectedRoute path="/movies" component={Movies} />
          <ProtectedRoute path="/saved-movies" component={SavedMovies} />
          <ProtectedRoute path="/profile" component={Profile}
            onProfileUpdate={handlerChangeUser} />

          <Route path="/signup">
            <Register onRegister={handlerChangeUser} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handlerChangeUser} />
          </Route>

          <ProtectedRoute path="/" component={Page404} />

        </Switch>
      </div >}
    </CurrentUserContext.Provider >
  );
}

export default App;
