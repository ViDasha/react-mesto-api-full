import React from "react";
import PopupWithForm from './PopupWithForm';

class AddPlacePopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputNameRef = React.createRef();
    this.inputLinkRef = React.createRef();
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.onAddPlace({
        name: this.inputNameRef.current.value,
        link: this.inputLinkRef.current.value
    });

    this.clearRef();
  }
  
  handleClose = () => {
    this.props.onClose();
    this.clearRef();
  }

  clearRef = () => {
    this.inputNameRef.current.value = '';
    this.inputLinkRef.current.value = '';
  }

  render() {
    return(
      <PopupWithForm 
        name="pp-add" 
        title="Новое место" 
        isOpen={this.props.isOpen} 
        onClose = {this.handleClose}
        onSubmit={this.handleSubmit}>
            <>
              <input id="pp-add-name" type="text" name="name"  ref={this.inputNameRef} className="popup__item" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="pp-add-name-error popup__item-error"></span>
              <input id="pp-add-src" type="url" name="link"  ref={this.inputLinkRef} className="popup__item" placeholder="Ссылка на картинку" required />
              <span className="pp-add-src-error popup__item-error"></span>
            </>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;