import React from 'react';
import ReactDOM from 'react-dom';
import AccountForm from './account_form';
import AccountTable from './account_table';
// var RadarChart = require("react-chartjs").Radar;

export default class AccountsByFlat extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      flatId: this.props.flatId,
      accounts: this.props.accounts,
    };
    this.createAccount = this.createAccount.bind(this);
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
  createAccount(accountParams){
    // delete accountParams['category_id'];
    // delete accountParams['category_name'];
    // delete accountParams['is_variable_tariff'];
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {flat_id: this.props.flatId, account_data: accountParams}, 
      }).done((data) => {
        this.setState({accounts: data.accounts});
      }).fail((res) => {
        this.setState({errors: ["Ошибка записи в базу"]});
      }); 
  }
  render() {
    return(
      <div>
        <h3>Новый счет</h3>
        <AccountForm total={this.props.total} utilityParams={this.props.utilityParams} flat={this.props.flat} tariffLimits={this.props.tariffLimits} onAccountSubmit={this.createAccount}/>
        <h3>Список счетов</h3>
        <AccountTable accounts={this.state.accounts} onDeleteAccount={this.handleDeleteAccount}/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('accounts_data');
  const accounts = JSON.parse(node.getAttribute('accounts'));
  const utilityParams = JSON.parse(node.getAttribute('utilityParams'));
  const tariffLimits = JSON.parse(node.getAttribute('tariffLimits'));
  const flat = JSON.parse(node.getAttribute('flat'));
  const flatId = node.getAttribute('flatId');
  const total = node.getAttribute('total');

  ReactDOM.render(
    <AccountsByFlat flatId={flatId} flat={flat} accounts={accounts} tariffLimits={tariffLimits} utilityParams={utilityParams} total={total}/>,
    document.getElementById('accounts')
  );
})