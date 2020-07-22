import React from 'react';
import AccountLine from './account_line';

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let month = now.getMonth()+1 < 10 ? '0'+(now.getMonth()+1) : now.getMonth()+1;
    this.state = {
      utilityParams: this.props.utilityParams,
      monthsNumber: 1,
      total: this.props.total,
      startDate: now.getFullYear()+'-'+month+'-01'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.updateCounterValue = this.updateCounterValue.bind(this);
  }
  updateCounterValue(utilityId, newValue, tariff){
    this.props.setValueCounter(utilityId, newValue, tariff);
    this.calcTotal();
  }
  dateChange(e) {
    let firstDay = e.target.value.substr(0,8)+'01';
    this.setState({startDate: firstDay});
  }
  numberChange(e){
    this.state.monthsNumber = +e.target.value;
    this.calcTotal();
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.postAccount(this.props.flatId, this.state);
  }
  calcTotal(){
    let total = 0;
    this.props.utilityParams.map((up) => {
      if (up.is_counter){
        let delta = up.new_value_counter-up.old_value_counter;
        total += delta*up.tariff;
      }else
        total += up.quantity*up.tariff*this.state.monthsNumber;
    });
    this.setState({total: total});
  }
  render() {
    return(
      <div className='container'>
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Новый счет</h3>
          </div>
          <div className='col-12 col-md-9'>
            <form className="account-form" onSubmit={(event) => this.handleSubmit(event)}>
              <div className='form-group row'>
                <label htmlFor='start-date' className='col-md-3 col-form-label'>Начало периода</label>
                <div className='col-md-3'>
                  <input className="form-control" type="date" id='start-date' name="input-date" value={this.state.startDate} onChange={event => this.dateChange(event)} required={true} autoComplete="on" />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='number-months' className='col-md-3 col-form-label'>Количество месяцев</label>
                <div className='col-md-3'>
                  <input className="form-control" id='number-months' type="number" value={this.state.monthsNumber} onChange={event => this.numberChange(event)} name="input-number" min="1" step="1"/>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>Категория</th>
                      <th>Сумма</th>
                      <th>Тариф</th>
                      <th>Количество</th>
                      <th>Было</th>
                      <th>Стало</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.utilityParams.map((utilityParams, i) => {
                      let tariffLimits= this.props.tariffLimits[utilityParams.category_id];
                      return <AccountLine key={utilityParams.utility_id} utilityParams={utilityParams} utilityId={i} tariffLimits={tariffLimits} monthsNumber={this.state.monthsNumber} onUtilitySubmit={this.updateCounterValue}/>;
                    })}
                    <tr key="0"><td><b>Итого</b></td><td className="total"><b>{(+this.state.total).toFixed(2)}</b></td></tr>
                  </tbody>
                </table>
              </div>
              
              <div className='form-group row'>
                <div className='col-md-12'>
                  <button type='submit' className='btn btn-primary'>
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountForm;
