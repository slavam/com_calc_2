import React from 'react';
import { connect } from "react-redux";

// export default class AccountTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleDeleteClick = this.handleDeleteClick.bind(this);
//   }
//   handleDeleteClick(e){
//     this.props.onDeleteAccount(e.target.id);
//   }
//   render() {
//     return(
const AccountTable = ({accounts, flatId}) =>(
  <div>
    {
      accounts.map((a) => {
        let desiredLink = "/flats/"+flatId+"/accounts/"+a.id;
        return <li className='account-list' key={a.id}><span className="account" ><a href={desiredLink}>С {a.start_date} за {a.months_number} мес. начислено {a.total}</a></span></li>;
      })
    }
  </div>
);
const mapStateToProps = state => {
  return {accounts: state.accounts.accounts, flatId: state.accounts.flatId};
}
export default connect(mapStateToProps)(AccountTable);
// export default AccountTable;
