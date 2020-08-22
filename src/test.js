// import ProfileRatingView from "./view/profile-rating.js";
// import SiteMenuView from "./view/menu.js";
// import FilterView from "./view/filter.js";
// import StatsTemplateView from "./view/stats.js";
// import SortingView from "./view/sorting.js";
// import BoardView from "./view/board.js";
// import FilmsListView from "./view/films-list.js";
// import BestFilmsView from "./view/best-films-list.js";
// import CommentedFilmsView from "./view/commented-films-list.js";
// import CardView from "./view/card.js";
// import ShowMoreButtonView from "./view/show-more-button.js";
// import FilmsCounterView from "./view/films-counter.js";
// import FilmDetailsCardView from "./view/film-details-card.js";
// import NoFilmsView from "./view/no-films.js";

// import {generateCard} from "./mock/film.js";
// import {generateFilter} from "./mock/filter.js";
// import {generateUserRank} from "./mock/user.js";
// import MovieListPresenter from "./presenter/movie-list.js";
// import {render, RenderPosition, remove} from "./utils/render.js";

// const FilmsCount = {
//   PER_STEP: 5,
//   TOTAL: 25,
//   EXTRA: 2
// };

// // собирает в массив результаты вызова функции, генерирующей случайную карточку фильма
// const cards = new Array(FilmsCount.TOTAL).fill(``).map(generateCard);

// // собирает фильтры из массива карточек
// const filters = generateFilter(cards);

// const siteHeaderElement = document.querySelector(`.header`);
// const footerElement = document.querySelector(`.footer`);

// const renderCard = (filmsListElement, card) => {
//   const cardComponent = new CardView(card);
//   const cardDetailsComponent = new FilmDetailsCardView(card);


//   const showFilmDetails = () => {
//     // рисует попап с дополнительной информацией о фильме
//     render(footerElement, cardDetailsComponent, RenderPosition.AFTEREND);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       remove(cardDetailsComponent);
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   const onCrossButtonClick = () => {
//     remove(cardDetailsComponent);
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   };

//   const onCardClick = () => {
//     showFilmDetails();
//     document.addEventListener(`keydown`, onEscKeyDown);
//     cardDetailsComponent.setClickHandler(onCrossButtonClick);
//   };

//   cardComponent.setClickHandler(onCardClick);

//   render(filmsListElement, cardComponent, RenderPosition.BEFOREEND);
// };

// // рисует звание пользователя на странице
// render(siteHeaderElement, new ProfileRatingView(generateUserRank(cards)), RenderPosition.BEFOREEND);

// const siteMainElement = document.querySelector(`.main`);

// // рисует меню
// const menuComponent = new SiteMenuView();
// render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

// render(menuComponent, new FilterView(filters), RenderPosition.BEFOREEND);
// render(menuComponent, new StatsTemplateView(), RenderPosition.BEFOREEND);

// // рисует сортировку
// render(siteMainElement, new SortingView(), RenderPosition.BEFOREEND);

// // рисует список блоков фильмов
// const boardComponent = new BoardView();
// if (cards.length === 0) {
//   render(siteMainElement, new NoFilmsView(), RenderPosition.BEFOREEND);
// } else {
//   render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

//   // рисует основной список фильмов
//   render(boardComponent, new FilmsListView(), RenderPosition.BEFOREEND);
//   const filmsListComponent = boardComponent.getElement().querySelector(`.films-list .films-list__container`);

//   for (let i = 0; i < Math.min(cards.length, FilmsCount.PER_STEP); i++) {
//     renderCard(filmsListComponent, cards[i]);
//   }

//   if (cards.length > FilmsCount.PER_STEP) {
//     let renderedCardCount = FilmsCount.PER_STEP;
//     const showMoreButtonComponent = new ShowMoreButtonView();
//     render(filmsListComponent, showMoreButtonComponent, RenderPosition.AFTEREND);
//     showMoreButtonComponent.setClickHandler(() => {
//       cards
//       .slice(renderedCardCount, renderedCardCount + FilmsCount.PER_STEP)
//       .forEach((card) => renderCard(filmsListComponent, card));

//       renderedCardCount += FilmsCount.PER_STEP;

//       if (renderedCardCount >= cards.length) {
//         showMoreButtonComponent.getElement().remove();
//         showMoreButtonComponent.removeElement();
//       }
//     });
//   }

//   // рисует дополнительные списки фильмов
//   render(boardComponent, new BestFilmsView(), RenderPosition.BEFOREEND);

//   const bestfilmsListElement = boardComponent.getElement().querySelector(`.films-list--extra .films-list__container`);

//   const sortedByRatingsFilms = cards.slice().sort((a, b) => b.rating - a.rating);

//   for (let i = 0; i < FilmsCount.EXTRA; i++) {
//     renderCard(bestfilmsListElement, sortedByRatingsFilms[i]);
//   }

//   render(boardComponent, new CommentedFilmsView(), RenderPosition.BEFOREEND);
//   const commentedFilmsListElement = boardComponent.getElement().querySelector(`.films-list--extra:last-of-type .films-list__container`);

//   const sortedByCommentsFilms = cards.slice().sort((a, b) => b.comments.length - a.comments.length);

//   for (let i = 0; i < FilmsCount.EXTRA; i++) {
//     renderCard(commentedFilmsListElement, sortedByCommentsFilms[i]);
//   }
// }

// const movieListPresenter = new MovieListPresenter(siteMainElement);

// movieListPresenter.init(cards);

// // рисует счетчик фильмов в футере
// const footerStatElement = footerElement.querySelector(`.footer__statistics`);
// render(footerStatElement, new FilmsCounterView(cards), RenderPosition.BEFOREEND);

