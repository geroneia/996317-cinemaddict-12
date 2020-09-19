import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(updateType, cards) {
    this._cards = cards.slice();

    this._notify(updateType);
  }

  getCards() {
    return this._cards;
  }

  updateCard(updateType, update, comments) {
    const indexOfCard = this._cards.findIndex((card) => card.id === update.id);

    if (indexOfCard === -1) {
      throw new Error(`Can't update unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, indexOfCard),
      update,
      ...this._cards.slice(indexOfCard + 1)
    ];

    this._notify(updateType, update, comments);
  }

  static adaptToClient(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
        // id: card.film_info.id,
          title: card.film_info.title,
          alternativeTitle: card.film_info.alternative_title,
          poster: card.film_info.poster,
          rating: card.film_info.total_rating,
          director: card.film_info.director,
          writers: card.film_info.writers,
          actors: card.film_info.actors,
          releaseDate: card.film_info.release.date,
          runtime: card.film_info.runtime,
          country: card.film_info.release.release_country,
          genres: card.film_info.genre,
          description: card.film_info.description,
          ageRating: card.film_info.age_rating,
          // comments:
          isAddedToWatchlist: card.user_details.watchlist,
          isWatched: card.user_details.already_watched,
          isFavorite: card.user_details.favorite,
          watchingDate: card.user_details.watching_date
        }
    );
    delete adaptedCard.film_info;

    delete adaptedCard.user_details;

    return adaptedCard;
  }

  static adaptToServer(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
          "film_info": {
            "actors": card.actors,
            "age_rating": card.ageRating,
            "alternative_title": card.alternativeTitle,
            "description": card.description,
            "director": card.director,
            "genre": card.genres,
            "poster": card.poster,
            "release": {
              "date": card.releaseDate,
              "release_country": card.country
            },
            "runtime": card.runtime,
            "title": card.title,
            "total_rating": card.rating,
            "writers": card.writers,
          },
          "user_details": {
            "already_watched": card.isWatched,
            "favorite": card.isFavorite,
            "watching_date": card.watchingDate,
            "watchlist": card.isAddedToWatchlist
          }
        }
    );

    delete adaptedCard.title;
    delete adaptedCard.alternativeTitle;
    delete adaptedCard.poster;
    delete adaptedCard.rating;
    delete adaptedCard.director;
    delete adaptedCard.writers;
    delete adaptedCard.actors;
    delete adaptedCard.releaseDate;
    delete adaptedCard.runtime;
    delete adaptedCard.country;
    delete adaptedCard.genres;
    delete adaptedCard.description;
    delete adaptedCard.ageRating;

    delete adaptedCard.isAddedToWatchlist;
    delete adaptedCard.isWatched;
    delete adaptedCard.isFavorite;
    delete adaptedCard.watchingDate;

    return adaptedCard;
  }
}
