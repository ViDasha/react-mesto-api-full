import React from "react";

class ImagePopup extends React.Component {
  render() {
    const { card, onClose } = this.props;

    return(
      <div id="pp-img" className={`popup ${Object.keys(card).length && 'popup_opened'}`}>
        <div className="popup__overlay popup__overlay_darkened"></div>
        <div className="popup__container">
          <button type="button" aria-label="Закрыть" name="close" className="popup__close" onClick={onClose} ></button>
          <img src={card.link} alt={card.name} className="popup__image" />
          <h2 className="popup__name">{card.name}</h2>
        </div>
      </div>
    );
  }
}

export default ImagePopup;