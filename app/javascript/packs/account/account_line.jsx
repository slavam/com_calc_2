import React from 'react';

export default class AccountLine extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      valueCounter: this.props.utility.last_value_counter
    };
    this.valueCounterChange = this.valueCounterChange.bind(this);
  }
  valueCounterChange(e){
    this.setState({valueCounter: e.target.value});
  }
  
  render(){
    let quantity = (()=>{
      let ret;
      switch (this.props.category.name) {
        case 'Квартплата':
          ret = this.props.flat.total_area;
          break;
        case 'Газ':
          ret = this.props.flat.residents_number;
          break;
        case 'ОТОПЛЕНИЕ':
          ret = this.props.flat.heated_area;
      }
      return ret;
    });
    // let counter = '<td></td><td></td>';
    // if (category.is_counter){
    // <td>{u.start_value_counter}</td>
    // <td>{u.last_value_counter}</td></tr>;
    // }
    // if (category.is_variable_tariff)
    return <tr key={this.props.category.id}><td>{this.props.category.name}</td>
      <td>{0}</td>
      <td>{this.props.category.is_variable_tariff ? '' : this.props.tariff.value}</td>
      <td>{this.props.category.is_counter ? '2' : quantity()}</td>
      <td>{this.props.category.is_counter ? this.props.utility.last_value_counter : ''}</td>
      <td>{this.props.category.is_counter ? <input type="number" value={this.state.valueCounter} onChange={this.valueCounterChange} name="input-number" min={this.props.utility.last_value_counter} step="0.01"/> : ''}</td>
    </tr>;
  }
}