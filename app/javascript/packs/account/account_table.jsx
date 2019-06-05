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
        {
          this.props.accounts.map((a) => {
            let desiredLink = "/flats/"+this.props.flatId+"/accounts/"+a.id;
            return <li className='account-list' key={a.id}><span className="account" ><a href={desiredLink}>С {a.start_date} за {a.months_number} мес. начислено {a.total}</a></span></li>;
          })
        }
      </div>
    );
  }
}