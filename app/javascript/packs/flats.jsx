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
          <div className="card-body">
            <h5 className="card-title">Адрес: {flat.address}</h5>
            {/*<a href={`/flats/${flat.id}/utilities`}>Услуги</a>*/}
            <Link to={`/flats/${flat.id}/utilities`} className="btn custom-button">
              Услуги
            </Link>
            <Link to={`/flats/${flat.id}/accounts`} className="btn custom-button">
              Счета
            </Link>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Жилье пользователя {this.props.user ? this.props.user.last_name : ''}</h1>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              { allFlats }
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
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
