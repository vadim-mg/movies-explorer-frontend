import "./SearchForm.css"
import CheckBox from "../CheckBox/CheckBox"
import Container from "../Container/Container"
import { useState, useEffect } from "react"
import { maxTimeOfShortMovie } from "../../utils/constants"

function SearchForm({ onSearch, searchParams, minTextLenth = 0 }) {
  const [searchText, setSearchText] = useState(searchParams.searchText)
  const [isShortFilm, setIsShortFilm] = useState(searchParams.isShortFilm)
  const [isValidForm, setIsValidForm] = useState(true)

  useEffect(() => {
    setSearchText(searchParams.searchText)
    setIsShortFilm(searchParams.isShortFilm)
  }, [searchParams])

  const handleInputChange = (event) => {
    setSearchText(event.target.value)
    setIsValidForm(event.target.value.length >= minTextLenth)
  }

  const handleCheckBoxChange = (event) => {
    setIsShortFilm(event.target.checked)
  }

  const filterFunction = (searchParams, item) => !(
    (searchParams.isShortFilm && item.duration > maxTimeOfShortMovie) ||
    (item.nameRU.toLowerCase().indexOf(searchParams.searchText.toLowerCase()) === -1)
  )

  const handleSearch = (event) => {
    setIsValidForm(searchText.length >= minTextLenth)
    if (searchText.length >= minTextLenth) {
      onSearch({ searchText, isShortFilm }, filterFunction)
    }
    event.preventDefault()
  }

  return (
    <Container additionalContainerClass="container_size_xl">
      <form className="search-form" onSubmit={handleSearch} autoComplete="off" noValidate>
        <input className="search-form__field" placeholder="Фильм" name="searchField" type="text" value={searchText || ''} onChange={handleInputChange} />
        <button className="search-form__search-button" type="submit">Найти</button>
        {!isValidForm && <p className="search-form__error">Нужно ввести искомый текст</p>}
        <CheckBox className="search-form__filter" name="searchFilter" checked={isShortFilm || false} onChange={handleCheckBoxChange}>Короткометражки</CheckBox>
      </form>
    </Container >
  );
}

export default SearchForm
