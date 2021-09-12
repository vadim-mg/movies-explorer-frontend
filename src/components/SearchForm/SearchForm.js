import "./SearchForm.css"
import CheckBox from "../CheckBox/CheckBox"
import Container from "../Container/Container"
import { useState, useEffect } from "react"

function SearchForm({ onSearch, searchParams }) {
  const [searchText, setSearchText] = useState(searchParams.searchText)
  const [isShortFilm, setIsShortFilm] = useState(searchParams.isShortFilm)
  const [isValidForm, setIsValidForm] = useState(true)

  useEffect(()=>{
    setSearchText(searchParams.searchText)
    setIsShortFilm(searchParams.isShortFilm)
  }, [searchParams])

  const handleInputChange = (event) => {
    setSearchText(event.target.value)
    setIsValidForm(event.target.validity.valid)
  }

  const handleCheckBoxChange = (event) => {
    setIsShortFilm(event.target.checked)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setIsValidForm(searchText.length > 0)
    if (searchText.length > 0) {
      onSearch({
        searchText,
        isShortFilm
      })
    }
  }

  return (
    <Container additionalContainerClass="container_size_xl">
      <form className="search-form" onSubmit={handleSearch} autoComplete="off" noValidate>
        <input className="search-form__field" placeholder="Фильм" name="searchField" required type="text" value={searchText} onChange={handleInputChange} />
        <button className="search-form__search-button" type="submit">Найти</button>
        {!isValidForm && <p className="search-form__error">Нужно ввести ключевое слово</p>}
        <CheckBox className="search-form__filter" name="searchFilter" checked={isShortFilm} onChange={handleCheckBoxChange}>Короткометражки</CheckBox>
      </form>
    </Container >
  );
}

export default SearchForm
