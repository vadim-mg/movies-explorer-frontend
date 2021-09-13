// точки перелома макета. Не изменять без соотвествующих правок во всех CSS файлах!!!
export const breakPoints = {
  // свойства
  //
  // 'size': - размер до которого действуют настройкии
  // 'initMovieCount': - начальное кол-во карточек в зависимости от размера экрана
  // 'increment': - по сколько карточек добавляем при нажатии кнопки "еще"
  // 'cardsInRow': -карточек в ряду

  //  5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  'md': {
    'size': 576,
    'initMovieCount': 5,
    'increment': 2,
    'cardsInRow': 1,
  },
  // 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  'lg': {
    'size': 992,
    'initMovieCount': 8,
    'increment': 2,
    'cardsInRow': 2,
  },
  // 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
  'xl': {
    'size': 4000,
    'initMovieCount': 9,
    'increment': 3,
    'cardsInRow': 3,
  },
}

export const moviesImageUrl = 'https://api.nomoreparties.co'
export const moviesApiUrl = 'https://api.nomoreparties.co/beatfilm-movies'
// eslint-disable-next-line no-undef
export const mainApiUrl = `${window.location.protocol}${process.env.MAIN_API_URL || '//localhost:3000'}`
