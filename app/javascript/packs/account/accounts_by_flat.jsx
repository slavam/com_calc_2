import React from 'react';
import ReactDOM from 'react-dom';
import AccountForm from './account_form';
import AccountTable from './account_table';
import { connect } from "react-redux";
import { addAccount } from '../redux/ActionCreators';

class AccountsByFlat extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }
  handleDeleteAccount(accountId){
    $.ajax({
      type: 'DELETE',
      url: "/flats/"+this.props.flatId+"/accounts/"+accountId
    }).done(function(data){
      this.setState({accounts: data.accounts});
    }.bind(this))
    .fail(function(res){});
  }
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
    return(
      <div>
        <h3>Новый счет</h3>
        <AccountForm addAccount={this.props.addAccount} total={this.props.total} utilityParams={this.props.utilityParams} flatId={this.props.flatId} tariffLimits={this.props.tariffLimits} />
        {/*<AccountForm addAccount={this.props.addAccount}/>*/}
        <h3>Список счетов</h3>
        <AccountTable />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addAccount: (flatId, accountParams) => dispatch(addAccount(flatId, accountParams))
});
const mapStateToProps = state => {
  return {utilityParams: state.accounts.utilityParams, tariffLimits: state.accounts.tariffLimits, total: state.accounts.total, flatId: state.accounts.flatId};
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsByFlat);
