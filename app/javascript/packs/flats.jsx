import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { fetchFlats } from '../packs/redux/ActionCreators';

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
    return (
      <div className='container'>
        <div className='col-12'>
          <h2>Жилье пользователя {this.props.user ? this.props.user.last_name : ''}</h2>
          <div className="py-5">
            <main className="container">
              <div className="row row-content">
                { allFlats }
              </div>
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchFlats: (userId) => dispatch(fetchFlats(userId))
});
const mapStateToProps = state => {
  return {flats: state.flats.flats, user: state.flats.user};
};
export default connect(mapStateToProps, mapDispatchToProps)(Flats);
