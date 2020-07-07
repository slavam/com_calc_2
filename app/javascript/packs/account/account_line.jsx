import React from 'react';

export default class AccountLine extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      quantity: this.props.utilityParams.quantity,
      tariff: this.props.utilityParams.tariff,
      valueCounter: this.props.utilityParams.old_value_counter
    };
  }
  valueCounterChange(e){
    let quantity = +e.target.value - this.props.utilityParams.old_value_counter;
    let tariff;
    if (this.props.utilityParams.is_variable_tariff)
      this.props.tariffLimits.some(l => {tariff = +l.value; return l.low_edge <= quantity && l.top_edge >= quantity;});
    else
      tariff = this.props.utilityParams.tariff;
    this.setState({valueCounter: +e.target.value, quantity: quantity.toFixed(2), tariff: tariff});
    this.props.onUtilitySubmit(this.props.utilityId, e.target.value, tariff);
    // this.props.setValueCounter(this.props.utilityId, e.target.value, tariff);
  }
  render(){
    let sum = this.state.quantity*this.state.tariff*(this.props.utilityParams.is_counter ? 1 : this.props.monthsNumber);
    return <tr key={this.props.utilityId}>
      <td>{this.props.utilityParams.category_name}</td>
      <td><b>{sum.toFixed(2)}</b></td>
      <td>{this.state.tariff}</td>
      <td>{this.state.quantity}</td>
      <td>{this.props.utilityParams.is_counter ? this.props.utilityParams.old_value_counter : ''}</td>
      <td>{this.props.utilityParams.is_counter ? <input type="number" value={this.state.valueCounter} onChange={event => this.valueCounterChange(event)} name="input-number" min={this.props.utilityParams.old_value_counter} step="0.1"/> : ''}</td>
    </tr>;
  }
}
