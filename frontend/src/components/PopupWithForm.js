import React from "react";

class PopupWithForm extends React.Component {
  render() {
    return(
      <div id={this.props.name} className={`popup ${this.props.isOpen && 'popup_opened'}`}>
          <div className="popup__overlay"></div>
          <div className="popup__container popup__container_type_form">
          <button onClick={this.props.onClose} type="button" aria-label="Закрыть" name="close" className="popup__close"></button>
          <h2 className="popup__title">{this.props.title}</h2>
          <form method="post" action="#" id={`${this.props.name}-form`} name="popup-form" className="popup__form" noValidate onSubmit={this.props.onSubmit}>
              {this.props.children}
              <button id={`${this.props.name}-save`} type="submit" aria-label="Сохранить" name="save" className="popup__button-save">Сохранить</button>
          </form>
          </div>
      </div>
    );
  }
}

export default PopupWithForm;