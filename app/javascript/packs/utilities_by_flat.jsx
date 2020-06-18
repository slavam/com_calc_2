import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { postUtility, fetchTariffs, fetchUtilities } from './redux/ActionCreators';

class UtilitiesByFlat extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDeleteUtility = this.handleDeleteUtility.bind(this);
  }
  componentDidMount(){
    const { flatId } = this.props.match.params;
    this.props.fetchUtilities(flatId);
  }
  // handleDeleteUtility(utilityId){
  //   $.ajax({
  //     type: 'DELETE',
  //     url: "/flats/"+this.props.flatId+"/utilities/"+utilityId
  //   }).done(function(data){
  //     this.setState({utilities: data.utilities});
  //   }.bind(this))
  //   .fail(function(res){});
  // }

  render() {
    return(
      <div>
        <h3>Новая услуга</h3>
        <UtilityForm postUtility={this.props.postUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        {/*<UtilityForm addUtility={this.props.addUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>*/}
        {/*<h3>Всего услуг - {this.state.utilities.length}</h3>
        <UtilityTable utilities={this.state.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onDeleteUtility={this.handleDeleteUtility}/>
        */}
        <h3>Список услуг</h3>
        <UtilityTable fetchUtilities={this.props.fetchUtilities} errMes={this.props.errMes} isLoading={this.props.isLoading} utilities={this.props.utilities} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to={`/users/${this.props.userId}`} className="btn custom-button">
          Жилье
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
  return {userId: state.utilities.userId, flatId: state.utilities.flatId, isLoading: state.utilities.isLoading, errMes: state.utilities.errMes, tariffs: state.utilities.tariffs, categories: state.utilities.categories, total: state.accounts.total, utilities: state.utilities.utilities};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);

// export default connect(null)(UtilitiesByFlat);
