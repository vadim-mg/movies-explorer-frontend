import "./SearchForm.css"
import CheckBox from "../CheckBox/CheckBox";
import Container from "../Container/Container";

function SearchForm() {
  return (
    <Container additionalContainerClass="container_size_xl search-form">
      <input className="search-form__field" placeholder="Фильм"  type="text" />
      <button className="search-form__search-button">Найти</button>
      <CheckBox className="search-form__filter" name="filter">Короткометражки</CheckBox>
    </Container >
  );
}

export default SearchForm
