import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchPayments } from '../redux/ActionCreators';

// const AccountTable = ({accounts, flatId}) =>(
class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    // this.accountId = 0;
    // this.handleAccountClick = this.handleAccountClick.bind(this);
  }
//     this.handleDeleteClick = this.handleDeleteClick.bind(this);
  // }
//   handleDeleteClick(e){
//     this.props.onDeleteAccount(e.target.id);
//   }
  // handleAccountClick(e){
  //   e.preventDefault();
  //   // alert(e.target.id)
  //   this.props.fetchPayments(this.props.flatId, e.target.id);
  //   this.props.history.push("/flats/"+this.props.flatId+"/accounts/"+e.target.id);
  // }
  render() {
    return(

      <div className='container'> 
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Список счетов</h3>
            {
              this.props.accounts.map((a) => {
                // return <li key={a.id} onClick={event => this.handleAccountClick(event)}>С {a.start_date} за {a.months_number} мес. начислено {a.total}</li>

                let desiredLink = "/flats/"+this.props.flatId+"/accounts/"+a.id;
                // this.accountId = a.id;
                // return <li key={a.id}><span><a href={desiredLink}>С {a.start_date} за {a.months_number} мес. начислено {a.total}</a></span></li>;
                return <li key={a.id}><Link to={desiredLink} className="btn btn-link" id={a.id} >
                    С {a.start_date} за {a.months_number} мес. начислено {a.total}
                  </Link></li>
              })
            }
          </div>
        </div>
      </div>
    )};
}
// const mapDispatchToProps = dispatch => ({
//   fetchPayments: (flatId, accountId) => dispatch(fetchPayments(flatId, accountId))
// })
const mapStateToProps = state => {
  return {accounts: state.accounts.accounts, 
    flatId: state.accounts.flatId,
    isLoading: state.accounts.isLoading,
    // accountId: 41,
          errMes: state.accounts.errMes,
          // account: state.accounts.account,
          // payments: state.accounts.payments
  };
}
export default connect(mapStateToProps)(AccountTable);
// export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
// export default AccountTable;
