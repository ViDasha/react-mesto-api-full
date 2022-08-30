import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.handleClick = () => {
      this.props.onCardClick(this.props.card);
    }

    this.handleLikeClick = () => { 
      this.props.onCardLike(this.props.card); 
    };

    this.handleLikeDelete = () => { 
      this.props.onCardDelete(this.props.card); 
    };
  }



  render() {
    const { card } = this.props;
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === this.context._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
      `element__basket ${!isOwn && 'element__basket_hide'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === this.context._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
      `element__like ${isLiked && 'element__like_active'}`
    ); 

    return (
      <article className="element">
        <img className="element__image" src={card.link} alt={card.name} onClick={this.handleClick} />
        <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick={this.handleLikeDelete}></button>
        <div className="element__panel">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__area-like">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={this.handleLikeClick} ></button>
          <h3 className="element__count-like">{card.likes.length}</h3>
        </div>
        </div>
      </article>
    );
  }
}

export default Card;