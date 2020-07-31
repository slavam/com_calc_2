import React from "react";
import 'font-awesome/css/font-awesome.min.css'; 
import 'bootstrap-social/bootstrap-social.css';
import Footer from './footer';
import MyHeader from '../components/my_header';

class Home extends React.Component{
  render() {
    return(
      <div>
        <MyHeader userId={this.props.userId} />
        <header className='jumbotron2'>
          <div className='container'>
            <div className='row row-header'>
              <div className='col-12 col-sm-3'>
                <h1>Utilities</h1>
              </div>
              <div className="row align-items-center">
                <div className='col-12 col-sm-9'>
                  <p>Application for calculation...</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}
export default Home;
