import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { postUtility, fetchUtilities } from './redux/ActionCreators';

class UtilitiesByFlat extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const { flatId } = this.props.match.params;
    this.props.fetchUtilities(flatId);
  }
  render() {
    return(
      <div>
        <h3>Новая услуга</h3>
        <UtilityForm postUtility={this.props.postUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        <h3>Список услуг. Всего услуг - {this.props.utilities.length}</h3>
        <UtilityTable fetchUtilities={this.props.fetchUtilities} errMes={this.props.errMes} isLoading={this.props.isLoading} utilities={this.props.utilities} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to={`/users/${this.props.userId}`} className="btn btn-link">
          Жилье
        </Link>
        <Link to={`/flats/${this.props.flatId}/accounts`} className="btn btn-link">
          Счета
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postUtility: (flatId, utility) => dispatch(postUtility(flatId, utility)),
  fetchUtilities: (flatId) => dispatch(fetchUtilities(flatId))
});
const mapStateToProps = state => {
  return {userId: state.utilities.userId,
          flatId: state.utilities.flatId,
          isLoading: state.utilities.isLoading,
          errMes: state.utilities.errMes,
          tariffs: state.utilities.tariffs,
          categories: state.utilities.categories,
          utilities: state.utilities.utilities};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);
