import React from 'react';
import AccountLine from './account_line';

export default class AccountForm extends React.Component {  
  constructor(props) {
    super(props);
    let now = new Date();
    let month = now.getMonth()+1 < 10 ? '0'+(now.getMonth()+1) : now.getMonth()+1;
    this.state = {
      monthsNumber: 1,
      startDate: now.getFullYear()+'-'+month+'-01' 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
  }
  dateChange(e) {
    let firstDay = e.target.value.substr(0,8)+'01';
    this.setState({startDate: firstDay});
  }
  numberChange(e){
    this.setState({monthsNumber: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
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
              {
                this.props.utilities.map((u) => {
                  let category; 
                  this.props.categories.some(cat => {category = cat; return cat.id == u.category_id});
                  let tariff;
                  this.props.tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id});
                  return <AccountLine key={u.id} utility={u} category={category} tariff={tariff} flat={this.props.flat} />;
                })
              }
            </tbody>
          </table>
          <input type="submit" value="Сохранить" />
        </form>          
      </div>
    );
  }
}