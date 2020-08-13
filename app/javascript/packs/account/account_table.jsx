import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccountDelete = this.handleAccountDelete.bind(this);
  }
  handleAccountDelete(e){
    e.preventDefault();
    if (!confirm("Удалить?"))
      return;
    this.props.removeAccount(this.props.flatId, e.target.id);
    this.props.fetchAccounts(this.props.flatId);
  }
  render() {
    return(
      <div className='container'> 
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Список счетов</h3>
            {
              this.props.accounts.map((a) => {
                let desiredLink = "/flats/"+this.props.flatId+"/accounts/"+a.id;
                return <li key={a.id}>
                  <div id={a.id} className='col-12'> 
                    <div id={a.id} className='row'>
                      <div id={a.id} className='col-md-6'>
                        <Link to={desiredLink} className="btn btn-link" id={a.id} >
                          С {a.start_date} за {a.months_number} мес. начислено {a.total}
                        </Link>
                      </div>
                      <div id={a.id} className='col-md-2'>
                        <input id={a.id} type="submit" value="Удалить" onClick={event => this.handleAccountDelete(event)}/>
                      </div>
                    </div>
                  </div>
                </li>
              })
            }
          </div>
        </div>
      </div>
    )};
}
const mapStateToProps = state => {
  return {accounts: state.accounts.accounts, 
    flatId: state.accounts.flatId,
    isLoading: state.accounts.isLoading,
    errMes: state.accounts.errMes
  };
}
export default connect(mapStateToProps)(AccountTable);
