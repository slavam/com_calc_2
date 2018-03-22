import React from 'react';
export default class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e){
    this.props.onDeleteAccount(e.target.id);
  }
  render() {
    return(
      <div>
        <li className='account-list'>
            {
              this.props.accounts.map((a) => {
                // let deleteLink = <input id={u.id} type="submit" value="Удалить" onClick={this.handleDeleteClick}/>;
                // let category; 
                // this.props.categories.some(cat => {category = cat; return cat.id == u.category_id});
                // let tariff;
                // this.props.tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id});
                return <span className="account" key={a.id}>С {a.start_date} за {a.months_number} мес. начислено {a.total}</span>;
              })
            }
        </li>
      </div>
    );
  }
}