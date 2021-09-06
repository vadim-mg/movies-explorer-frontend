import "./Page404.css"
import { useHistory } from "react-router-dom"

const Page404 = () => {
  let history = useHistory();
  return (
    <div className="page404">
      <main className="page404__content">
        <h1 className="page404__header">404</h1>
        <p className="page404__text">Страница не найдена</p>
      </main>
      <footer className="page404__footer">

        <a className="page404__link" onClick={history.goBack}>Назад</a>
      </footer>
    </div>
  )
}

export default Page404
