import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import AccountForm from './account_form';
import AccountTable from './account_table';
import { connect } from "react-redux";
import { postAccount, fetchAccounts } from '../redux/ActionCreators';

class AccountsByFlat extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount(){
    const { flatId } = this.props.match.params;
    this.props.fetchAccounts(flatId);
  }
  // handleDeleteAccount(accountId){
  //   $.ajax({
  //     type: 'DELETE',
  //     url: "/flats/"+this.props.flatId+"/accounts/"+accountId
  //   }).done(function(data){
  //     this.setState({accounts: data.accounts});
  //   }.bind(this))
  //   .fail(function(res){});
  // }
  // createAccount(accountParams){
  //   $.ajax({
  //     type: 'POST',
  //     dataType: 'json',
  //     data: {flat_id: this.props.flatId, account_data: accountParams},
  //     }).done((data) => {
  //       this.setState({accounts: data.accounts});
  //     }).fail((res) => {
  //       this.setState({errors: ["Ошибка записи в базу"]});
  //     });
  // }
  render() {
    let formIs = this.props.isLoading ?
      null :
      <AccountForm postAccount={this.props.postAccount} total={this.props.total} utilityParams={this.props.utilityParams} flatId={this.props.flatId} tariffLimits={this.props.tariffLimits} />;
    return(
      <div>
        <h3>Новый счет</h3>
        {formIs}
        <h3>Список счетов</h3>
        <AccountTable />
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to={`/users/${this.props.userId}`} className="btn btn-link">
          Жилье
        </Link>
        <Link to={`/flats/${this.props.flatId}/utilities`} className="btn btn-link">
          Услуги
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postAccount: (flatId, accountParams) => dispatch(postAccount(flatId, accountParams)),
  fetchAccounts: (flatId) => dispatch(fetchAccounts(flatId))
});
const mapStateToProps = state => {
  return {
    isLoading: state.accounts.isLoading,
    userId: state.accounts.userId,
    accounts: state.accounts.accounts,
    utilityParams: state.accounts.utilityParams,
    tariffLimits: state.accounts.tariffLimits,
    total: state.accounts.total,
    flatId: state.accounts.flatId
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountsByFlat);
