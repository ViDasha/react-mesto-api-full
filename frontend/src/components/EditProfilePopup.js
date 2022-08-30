import React from "react";
import PopupWithForm from './PopupWithForm';

class EditProfilePopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.description,
    });  
  }

  componentDidMount() {
    this.handleStateUserInfoUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
        this.handleStateUserInfoUpdate();
    }
  }

  handleStateUserInfoUpdate() {
    this.setState({ 
        name: this.props.currentUser.name,
        description: this.props.currentUser.about
    });
  }

  handleClose = () => {
    this.props.onClose();
    this.handleStateUserInfoUpdate();
  }

  render() {
    return(
        <PopupWithForm 
        name="pp-edit" 
        title="Редактировать профиль" 
        isOpen={this.props.isOpen} 
        onClose = {this.handleClose}
        onSubmit={this.handleSubmit}>
            <>
            <input id="pp-edit-name" type="text" name="name"  value={this.state.name || ''} onChange={this.handleNameChange} className="popup__item" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="pp-edit-name-error popup__item-error"></span>
            <input id="pp-edit-about" type="text" name="about" value={this.state.description || ''} onChange={this.handleDescriptionChange} className="popup__item" placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="pp-edit-about-error popup__item-error"></span>
            </>
        </PopupWithForm>
    );
  }
}

export default EditProfilePopup;
