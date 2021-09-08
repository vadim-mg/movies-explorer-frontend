import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Page404 from '../Page404/Page404'
import { Route, Switch, /* Redirect */ } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useState } from 'react'

function App() {

  // на этапе верстки, ставим по дефолту true чтоб увидеть интерфейс авторизованного пользователя
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    loggedIn: false
  });




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
            <Profile />
          </Route>


          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route>
            <Page404 />
          </Route>
          {/* <Redirect to="/page404" /> */}
        </Switch>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
