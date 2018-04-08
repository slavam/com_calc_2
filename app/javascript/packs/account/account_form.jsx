import React from 'react';
import AccountLine from './account_line';

export default class AccountForm extends React.Component {  
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
    this.dateChange = this.dateChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.updateCounterValue = this.updateCounterValue.bind(this);
  }
  updateCounterValue(utilityId, newValue, tariff){
    this.state.utilityParams[utilityId].new_value_counter = +newValue;
    this.state.utilityParams[utilityId].tariff = tariff;
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
    this.props.onAccountSubmit(this.state);
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
      <div>
        <form className="account-form" onSubmit={(event) => this.handleSubmit(event)}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Начало периода</th> 
                <th>Количество месяцев</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="date" name="input-date" value={this.state.startDate} onChange={this.dateChange} required="true" autoComplete="on" /></td>
                <td><input type="number" value={this.state.monthsNumber} onChange={this.numberChange} name="input-number" min="1" step="1"/></td>
              </tr>
            </tbody>
          </table>
          <table className="table table-hover">
            <thead>
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
                return <AccountLine key={utilityParams.utility_id} utilityParams={utilityParams} utilityId={i} tariffLimits={tariffLimits} flat={this.props.flat} monthsNumber={this.state.monthsNumber} onUtilitySubmit={this.updateCounterValue}/>;
              })}
              <tr key="0"><td><b>Итого</b></td><td className="total"><b>{(+this.state.total).toFixed(2)}</b></td></tr>
            </tbody>
          </table>
          <input type="submit" value="Сохранить" />
        </form>          
      </div>
    );
  }
}