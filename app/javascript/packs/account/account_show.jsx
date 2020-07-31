import React from 'react';
import { fetchPayments } from '../redux/ActionCreators';
import { connect } from "react-redux";
import { Loading } from '../loadingComponent';
// import MyHeader from '../components/my_header';
import Footer from '../../components/footer';

class AccountShow extends React.Component{
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    // alert(accountId)
    // this.props.fetchPayments(this.props.flatId, accountId); //this.props.account.id);
    // this.handleAccountClick = this.handleAccountClick.bind(this);
  }
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
      // alert('isLoading')
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
                      <td>{p.utility_id}</td>
                      <td>{p.amount}</td>
                      <td>{p.is_counter ? '' :  'мес.'}</td>
                      {p.is_counter ? <td>{p.old_value_counter}</td> : null}
                      {p.is_counter ? <td>{p.new_value_counter}</td> : null}
                      {p.is_counter ? <td>{p.quantity}</td> : null}
                  </tr>}): null}
                        {/*
                    let deleteLink = <input id={u.id} type="submit" value="Удалить" onClick={event => this.handleDeleteClick(event)}/>;
                    var category;
                    this.props.categories.some(cat => {category = cat; return cat.id == u.category_id;});
                    var tariff;
                    this.props.tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id;});

                    return <tr key={u.id}>
                        <td>{category.name}</td>
                        <td>{category.is_variable_tariff ? 'Тариф зависит от количества' : tariff.value}</td>
                        <td>{u.description}</td>
                        <td>{category.is_counter ? 'Да':'Нет'}</td>
                        <td>{category.is_counter ? u.start_value_counter : ''}</td>
                        <td>{category.is_counter ? u.last_value_counter : ''}</td>
                        <td>{deleteLink}</td>
                      </tr>;
                    })
                  */}
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
          payments: state.accounts.payments}
  }
export default connect(mapStateToProps, mapDispatchToProps)(AccountShow);
// export default AccountShow;