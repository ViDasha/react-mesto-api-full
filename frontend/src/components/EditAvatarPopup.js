import React from "react";
import PopupWithForm from './PopupWithForm';

class EditAvatarPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.props.onUpdateAvatar({
      avatar: this.inputRef.current.value
    });

    this.clearRef();
  } 

  handleClose = () => {
    this.props.onClose();
    this.clearRef();
  }

  clearRef = () => {
    this.inputRef.current.value = '';
  }

  render() {
    return(
      <PopupWithForm 
        name="pp-avatar" 
        title="Обновить аватар" 
        isOpen={this.props.isOpen} 
        onClose = {this.handleClose}
        onSubmit={this.handleSubmit}>
          <>
            <input id="pp-avatar-src" type="url"  ref={this.inputRef} name="link" className="popup__item" placeholder="Ссылка на картинку" required />
            <span className="pp-avatar-src-error popup__item-error"></span>
          </>
      </PopupWithForm>
    );
  }
}

export default EditAvatarPopup;