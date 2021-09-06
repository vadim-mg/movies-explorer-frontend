import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList({ moviesList, saved }) {
  return (
    <div className="movies-card-list">
      <div className="movies-card-list__list">
        {moviesList.map(element => {
          return (
            <MoviesCard key={element.id} card={element} saved={saved}/>
          )
        })}
      </div>
      <button className="movies-card-list__more-btn">Ещё</button>
    </div >
  );
}

export default MoviesCardList
