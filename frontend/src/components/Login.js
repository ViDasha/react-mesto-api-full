import React from 'react';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    this.props.onLogin(this.state.password, this.state.email);
  }

  render(){
    return(
      <div className="auth">
        <h2 className="popup__title popup__title_theme_dark">Вход</h2>
        <form method="post" action="#" id="authorize-form" name="authorize-form" className="popup__form" noValidate onSubmit={this.handleSubmit}>
          <input id="email" name="email" type="email" className="popup__item popup__item_theme_dark" placeholder="E-mail" minLength="2" maxLength="40" required value={this.state.email} onChange={this.handleChange} />
          <span className="email-error popup__item-error"></span>
          <input id="password" name="password" type="password" className="popup__item popup__item_theme_dark" placeholder="Пароль" minLength="2" maxLength="40" required value={this.state.password} onChange={this.handleChange} />
          <span className="password-error popup__item-error"></span>
          <button type="submit" aria-label="Войти" name="save" className="popup__button-save popup__button-save_theme_dark">Войти</button>
        </form>
      </div>
    )
  }
}

export default Login;

