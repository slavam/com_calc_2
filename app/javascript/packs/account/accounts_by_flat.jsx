import React from 'react';
import ReactDOM from 'react-dom';
import AccountForm from './account_form';
import AccountTable from './account_table';

export default class AccountsByFlat extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      flatId: this.props.flatId,
      accounts: this.props.accounts
    };
    // this.createUtility = this.createUtility.bind(this);
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
//   createUtility(utility){
//     $.ajax({
//       type: 'POST',
//       dataType: 'json',
//       data: {flat_id: this.props.flatId, utility: {category_id: utility.categoryId, tariff_id: utility.tariffId, description: utility.description, start_value_counter: utility.startCounterValue }}, 
//       }).done((data) => {
//         this.setState({utilities: data.utilities});
//       }).fail((res) => {
//         this.setState({errors: ["Ошибка записи в базу"]});
//       }); 
//   }
  render() {
    return(
      <div>
        <h3>Новый счет</h3>
        <AccountForm flat={this.props.flat} utilities={this.props.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onUtilitySubmit={this.createUtility} />
        <h3>Список счетов</h3>
        <AccountTable accounts={this.state.accounts} onDeleteAccount={this.handleDeleteAccount}/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('accounts_data');
  const accounts = JSON.parse(node.getAttribute('accounts'));
  const utilities = JSON.parse(node.getAttribute('utilities'));
  const tariffs = JSON.parse(node.getAttribute('tariffs'));
  const categories = JSON.parse(node.getAttribute('categories'));
  const flat = JSON.parse(node.getAttribute('flat'));
  const flatId = node.getAttribute('flatId');

  ReactDOM.render(
    <AccountsByFlat flatId={flatId} flat={flat} accounts={accounts} utilities={utilities} tariffs={tariffs} categories={categories} />,
    document.getElementById('accounts')
  );
})