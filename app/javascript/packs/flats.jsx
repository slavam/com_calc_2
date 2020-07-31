import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { fetchFlats } from '../packs/redux/ActionCreators';
import Footer from '../components/footer';
import { Loading } from './loadingComponent';
import MyHeader from '../components/my_header';

class Flats extends React.Component {
  componentDidMount() {
    this.props.fetchFlats(this.props.userId);
  }
  render() {
    const allFlats = this.props.flats.map((flat, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <h5 className="card-header bg-primary text-white">Адрес: {flat.address}</h5>
          <div className='card-body bg-light'>
            <dl className="row">
              <dt className="col-6">Плательщик</dt>
              <dd className="col-6">{flat.payer_lastname}</dd>
              <dt className="col-6">Проживающих</dt>
              <dd className="col-6">{flat.residents_number}</dd>
              <dt className="col-6">Общая площадь</dt>
              <dd className="col-6">{flat.total_area}</dd>
              <dt className="col-6">Отапливаемая площадь</dt>
              <dd className="col-6">{flat.heated_area}</dd>
            </dl>
            <Link to={`/flats/${flat.id}/utilities`} className="btn btn-link">
              Услуги
            </Link>
            <Link to={`/flats/${flat.id}/accounts`} className="btn btn-link">
              Счета
            </Link>
          </div>
        </div>
      </div>
    ));
    if(this.props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }else if(this.props.errMes){
      return(
        <div className="container">
          <div className="row">
            <h4>{this.props.errMes}</h4>
          </div>
        </div>
      );
    }else return (
      <div>
        <MyHeader userId={this.props.userId} />
        <div className='row'>
          <ol className="col-12 breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Жилье</li>
          </ol>
        </div>
        <div className='col-12'>
          <h2>Жилье пользователя {this.props.user ? this.props.user.last_name : ''}</h2>
          <div className="py-5">
            <main className="container">
              <div className="row row-content">
                { allFlats }
              </div>
            </main>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchFlats: (userId) => dispatch(fetchFlats(userId))
});
const mapStateToProps = state => {
  return {flats: state.flats.flats, 
          isLoading: state.flats.isLoading,
          user: state.flats.user};
};
export default connect(mapStateToProps, mapDispatchToProps)(Flats);
