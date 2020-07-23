import React from "react";
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'; 
import 'bootstrap-social/bootstrap-social.css';

// export default (props) => (
class Home extends React.Component{
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
          <Link to="/logout" className="btn btn-link nav-link">
            Logout
          </Link>
        </li>
      </ul> :
      <ul className="navbar-nav navbar-right">
        <li className='nav-item'>
          <Link to="/login" className="btn btn-link nav-link">
            Login
          </Link>
        </li>
      </ul>;
    return(
      <div>
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
        <header className='jumbotron2'>
          <div className='container'>
            <div className='row row-header'>
              <div className='col-12 col-sm-6'>
                <h1>Utilities</h1>
              </div>
              <div className="row align-items-center">
                <div className='col-12 col-sm-6'>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="container secondary-color">
              <hr className="my-4" />
              <Link to="/tariffs" className="btn btn-link">
                Тарифы
              </Link>
              <Link to="/categories" className="btn btn-link">
                Категории услуг
              </Link>
            </div>
          </div>
        </div>
        <footer className='footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-3 offset-1 col-sm-2'>
                <h5>Ссылки</h5>
                <ul className='list-unstyled'>
                  <li><a href='#'><span className="fa fa-home fa-lg"></span>Home</a></li>
                  <li><a href='#'>Categories</a></li>
                  <li><a href='#'>Tariffs</a></li>
                </ul>
              </div>
              <div className='col-7 col-sm-5'>
                <h5>Адрес</h5>
                <address>
                  г. Донецк
                  ул. Любавина, дом 2
                </address>
                <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br/>
                <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br/>
                <i className="fa fa-envelope fa-lg"></i>: 
                <a href="mailto:mwm1955@gmail.com">mwm1955@gmail.com</a>
              </div>
              <div className='col-12 col-sm-4 align-self-center'>
                <div className="text-center">
                  <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                  <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                  <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                  <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                  <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                  <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                </div>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-auto'>
                <p>© Copyright mwm 2020</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Home;
