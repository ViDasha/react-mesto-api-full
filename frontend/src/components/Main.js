import React from 'react';
import Card from './Card';
import { withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
        <main className="content">
          <section className="profile">
            <div className="profile__data">
              <div onClick={this.props.onEditAvatar} className="profile__avatar">
                <img src={this.context.avatar} alt="Лицо автора в круглой рамке" className="profile__avatar-img" />
              </div>
              <div className="profile__info">
                <h1 className="profile__name">{this.context.name}</h1>
                <button onClick={this.props.onEditProfile} type="button" aria-label="Редактировать" className="profile__edit-button"></button>
                <p className="profile__about">{this.context.about}</p>
              </div>
            </div>
            <button onClick={this.props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
          </section>
          <section className="elements">
            {this.props.cards.map((item, i) => (
              <Card key={item._id} card={item} onCardClick={this.props.onCardClick} onCardLike={this.props.onCardLike} onCardDelete={this.props.onCardDelete}/>
            ))}
          </section>
        </main>
      );
  }
}

export default withRouter(Main);