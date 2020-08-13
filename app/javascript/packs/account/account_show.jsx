import React from 'react';
import { fetchPayments } from '../redux/ActionCreators';
import { connect } from "react-redux";
import { Loading } from '../loadingComponent';
import { Link } from "react-router-dom";
import MyHeader from '../../components/my_header';
import Footer from '../../components/footer';

class AccountShow extends React.Component{
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
  componentDidMount(){
    const { flatId } = this.props.match.params;
    const { accountId } = this.props.match.params;
    this.props.fetchPayments(flatId, accountId);
  }
  render() {
    if(this.props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }else if(this.props.errMes){
      return(
        <div className="container">
          <div className="row">
            <h4>{this.props.errMes}</h4>
          </div>
        </div>
      );
    }else {
    return(
      <div className='container'> 
        <MyHeader userId={this.props.userId} />
        <div className='row'>
          <ol className="col-12 breadcrumb">
            <li><Link to="/" className="btn btn-link">Home</Link></li>
            <li><Link to={`/users/${this.props.userId}`} className="btn btn-link">Жилье</Link></li>
            <li><Link to={`/flats/${this.props.flatId}/accounts`} className="btn btn-link">Счета</Link></li>
            <li style={{marginTop:'7px'}}>Счет</li>
          </ol>
        </div>
        <div className='row row-content'>
          <div className='col-12'>
            {this.props.account ? <h3>Счет на оплату коммунальных услуг с {this.props.account.start_date} за {this.props.account.months_number} мес.</h3>:null}
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Услуга</th>
                    <th>Сумма</th>
                    <th>Период оплаты</th>
                    <th>Было</th>
                    <th>Стало</th>
                    <th>Разница</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.payments ? this.props.payments.map((p) => {
                    return <tr key={p.id}>
                      <td>{p.utility_name}</td>
                      <td>{p.amount}</td>
                      <td>{p.is_counter ? '' :  p.months_number+' мес.'}</td>
                      {p.is_counter ? <td>{p.old_value_counter}</td> : null}
                      {p.is_counter ? <td>{p.new_value_counter}</td> : null}
                      {p.is_counter ? <td>{p.quantity}</td> : null}
                    </tr>}) : null}
                  {this.props.account ?
                    <tr>
                      <td><b>Итого</b></td>
                      <td><b>{this.props.account.total}</b></td>
                    </tr> : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )}
  }
}
const mapDispatchToProps = dispatch => ({
  fetchPayments: (flatId, accountId) => dispatch(fetchPayments(flatId, accountId))
})
const mapStateToProps = state => {
  return {userId: state.accounts.userId,
          flatId: state.accounts.flatId,
          isLoading: state.accounts.isLoading,
          errMes: state.accounts.errMes,
          account: state.accounts.account,
          utilityParams: state.accounts.utilityParams,
          payments: state.accounts.payments}
  }
export default connect(mapStateToProps, mapDispatchToProps)(AccountShow);