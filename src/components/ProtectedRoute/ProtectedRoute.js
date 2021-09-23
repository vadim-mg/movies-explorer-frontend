import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

const ProtectedRoute = ({ component: Component, ...props }) => {
  const currentUser = useContext(CurrentUserContext)
  return (
    <Route>
      {
        () => currentUser && currentUser.loggedIn
          ? <Component {...props} />
          : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute
