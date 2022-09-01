import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
      loggedIn: false,
      userData: {},
      isSuccess: false
    }

    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.handleOnRegister = this.handleOnRegister.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    Promise.all([api.getUserProfile(jwt), api.getInitialCards(jwt)])
    .then(([currentUser, cards]) => {
      this.setState({
        currentUser: currentUser,
        cards: cards
      })
    })
    .catch(err => {
    // тут ловим ошибку
      console.log(err); // выведем ошибку в консоль
    });

  // позже здесь тоже нужно будет проверить токен пользователя!
    this.handleTokenCheck();
  }

  handleOnLogin = (password, email) => {
    auth.authorize(password, email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      this.setState(
        {
          loggedIn: true,
          userData: {
            email: email
          }
        });
      this.props.history.push("/");
    })
    .catch((err) => {
      switch (err){
        case 'Ошибка: 400': {
          console.log('Не передано одно из полей');
          break;
        }
        case 'Ошибка: 401': {
          console.log('Пользователь с email не найден');
          break;
        }
        default: {}
      }
      this.setState(
        {
          isInfoTooltipOpen: true,
          isSuccess: false
        }
      )
    });
  } 

  handleOnRegister = (password, email) => {
    auth.register(password, email)
    .then(() => {
        this.setState({
          isInfoTooltipOpen: true,
          isSuccess: true
        });
        this.props.history.push("/signin");
    })
    .catch((err) => {
      switch (err){
        case 'Ошибка: 400': {
          console.log('Некорректно заполнено одно из полей');
          break;
        }
        default: {}
      }
      this.setState(
        {
          isInfoTooltipOpen: true,
          isSuccess: false
        }
      )
    });
  }

  handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    // здесь будем проверять токен
    if (jwt){
      // проверим токен
      auth.getContent(jwt)
        .then((res) => {
          if (res){
          // здесь можем получить данные пользователя!
            const userData = {
              email: res.data.email
            }
          // авторизуем пользователя
            this.setState({
              loggedIn: true,
              userData
            }, () => {
              this.props.history.push("/");
            });
          }
        })
      .catch((err) => {
        switch (err){
          case 'Ошибка: 400': {
            console.log('Токен не передан или передан не в том формате');
            break;
          }
          case 'Ошибка: 401': {
            console.log('Переданный токен некорректен');
            break;
          }
          default: {}
        }
      });
    }
  }

  handleOnSignOut = () => {
    localStorage.removeItem('jwt');
    this.setState({
      loggedIn: false
    });
    this.props.history.push('/signin');
  }
  
  handleCardLike = (card) => {
    const setCards = (newCard) => {
      this.setState({ cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)});
    };

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === this.state.currentUser._id);

    const jwt = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeCardLike(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards(newCard);
      })
      .catch(err => {
        console.log(err);
      });
  } 

  handleCardDelete = (card) => {
    const updateCards = () => {
      this.setState({ cards: this.state.cards.filter((c) => c._id !== card._id)});
    }

    const jwt = localStorage.getItem('jwt');
    api.deleteCard(card._id, jwt)
      .then(() => {
        updateCards();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card
    })
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    });
  }
    
  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }
    
  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {}
    })
  }

  handleUpdateUser = (inputValues) => {
    const jwt = localStorage.getItem('jwt');
    api.patchUserInfo(inputValues, jwt)
    .then((userInfo) => {
      this.setState({
        currentUser: userInfo
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  handleUpdateAvatar = (inputValues) => {
    const jwt = localStorage.getItem('jwt');
    api.patchUserAvatar(inputValues.avatar, jwt)
    .then((userInfo) => {
      this.setState({
        currentUser: userInfo
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  handleAddPlaceSubmit = (inputValues) => {
    const jwt = localStorage.getItem('jwt');
    api.postNewCard(inputValues, jwt)
    .then((newCard) => {
      this.setState({
        cards: [newCard, ...this.state.cards]
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="page">
        <Header userData={this.state.userData} onSignOut={this.handleOnSignOut}/>
        <Switch>
        <ProtectedRoute
            exact path="/"
            loggedIn={this.state.loggedIn}
            component={Main}
            onEditProfile = {this.handleEditProfileClick} 
            onAddPlace = {this.handleAddPlaceClick} 
            onEditAvatar = {this.handleEditAvatarClick}
            onCardClick = {this.handleCardClick}
            onCardLike = {this.handleCardLike}
            onCardDelete = {this.handleCardDelete}
            cards = {this.state.cards}
          />
          <Route path="/signin">
            <Login onLogin={this.handleOnLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={this.handleOnRegister}/>
          </Route>
          <Route>
            {this.state.loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        {this.state.loggedIn && <Footer />}
        <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />
        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} currentUser={this.state.currentUser}/>
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />
        <ImagePopup 
          onClose = {this.closeAllPopups}
          card = {this.state.selectedCard}
        />
        <InfoTooltip isOpen={this.state.isInfoTooltipOpen} onClose={this.closeAllPopups} isSuccess={this.state.isSuccess}/>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default withRouter(App);
