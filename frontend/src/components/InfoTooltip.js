import React from "react";
import success from '../images/success_icon.svg';
import unsuccess from '../images/unsuccess_icon.svg';


class InfoTooltip extends React.Component {
  render() {
    return(
      <div className={`popup ${this.props.isOpen && 'popup_opened'}`}>
          <div className="popup__overlay"></div>
          <div className="popup__container popup__container_type_info">
          <button onClick={this.props.onClose} type="button" aria-label="Закрыть" name="close" className="popup__close"></button>
          <img className="popup__icon" src={this.props.isSuccess ? success : unsuccess}/>
          <h2 className="popup__title">{this.props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
          </div>
      </div>
    );
  }
}

export default InfoTooltip;