import React from 'react';
import { Link } from "react-router-dom";

class MyHeader extends React.Component{
  render() {
    let isLogged = (this.props.userId > '') ?
      <li className='nav-item'>
        <Link to={`/users/${this.props.userId}`} className="btn btn-link nav-link">
          Жилье
        </Link>
      </li> :
      null;
    let inOut = (this.props.userId > '') ?
      <ul className="navbar-nav navbar-right">
        <li className='nav-item'>
          <a className="nav-link" data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/logout">Logout</a>
        </li>
      </ul> :
      <ul className="navbar-nav navbar-right">
        <li className='nav-item'>
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>;
    return(
        <nav className='navbar navbar-dark navbar-expand-sm fixed-top'>
          <div className='container'>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target="#Navbar">
              <span className='navbar-toggler-icon'></span>
            </button>
            <a className='navbar-brand mr-auto' href='#'>Utilities</a>
              <div className='collapse navbar-collapse' id='Navbar'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item'>
                    <Link to="/tariffs" className="btn btn-link nav-link">
                      Тарифы
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/categories" className="btn btn-link nav-link">
                      Категории услуг
                    </Link>
                  </li>
                  {isLogged}
                </ul>
                {inOut}
              </div>
          </div>
        </nav>
    );
  }
}
export default MyHeader;