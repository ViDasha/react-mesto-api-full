import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo_header.svg';

class Header extends React.Component {
  render() {
    const { email } = this.props.userData;
    return (
      <header className="header">
      <img className="header__logo" alt="Место" src={logo}/>
      <Switch>
        <Route exact path="/signin">
          <Link to="signup" className="header__link">Регистрация</Link>
        </Route>
        <Route exact path="/signup">
          <Link to="signin" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
           <p className="header__email">{email}</p>
          <Link to="signin" className="header__link header__link_darkened" onClick={this.props.onSignOut}>Выйти</Link>
          </div>          
        </Route>
      </Switch>
    </header>
    );
  }
}

export default Header;