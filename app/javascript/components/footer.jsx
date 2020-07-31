import React from 'react';

const Footer = () =>(
  <footer className='footer'>
    <div >
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
)
export default Footer;