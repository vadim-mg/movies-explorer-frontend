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

const notLoggedUser = {
  loggedIn: false,
  name: '',
  email: ''
}

function App() {

  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(notLoggedUser);


  const loadProfile = () => mainApi.getProfile()
    .then(result => {
      setCurrentUser({
        loggedIn: true,
        name: result.name,
        email: result.email
      })
    })
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
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile onProfileUpdate={handlerChangeUser} />
          </Route>


          <Route path="/signup">
            <Register onRegister={handlerChangeUser} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handlerChangeUser} />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
