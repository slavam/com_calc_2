import React from 'react';
import Select from 'react-select';
import { connect } from "react-redux";

class UtilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.props.categories.map((c) => {
      this.categories.push({value: c.id, label: c.name});
    });
    this.tariffs = [];
    this.props.tariffs.map((t) => {
      if(t.category_id == 1)
        this.tariffs.push({value: t.id, label: t.name});
    });
    this.state = {
      description: '',
      startCounterValue: 0.0,
      category: this.props.categories[0] ? {value: this.props.categories[0].id, label: this.props.categories[0].name}:{value:1, label: 'ssss'},
      tariff: this.props.tariffs[0] ? {value: this.props.tariffs[0].id, label: this.props.tariffs[0].name}:{value: 4, label: 'ddddd'}
    };
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleTariffSelected = this.handleTariffSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCategorySelected(value){
    let categoryId = value.value;
    this.tariffs = [];
    this.props.tariffs.map((t) => {
      if(t.category_id == categoryId)
        this.tariffs.push({value: t.id, label: t.name});
    });
    this.setState({category: value, tariff: this.tariffs[0]});
  }
  handleTariffSelected(value){
    this.setState({tariff: value});
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  handleValueChange(e){
    this.setState({startCounterValue: +e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.postUtility(this.props.flatId, this.state);
    this.setState({ description: '',
                    startCounterValue: 0,
                    category: {value: this.props.categories[0].id, label: this.props.categories[0].name},
                    tariff: {value: this.props.tariffs[0].id, label: this.props.tariffs[0].name}
                  });
  }
  render() {
    var tariff = (this.props.categories.some(cat => cat.id == this.state.category.value && cat.is_variable_tariff)) ?
      <td>Тариф зависит от потребленного количества</td> :
      <td><Select value={this.state.tariff} onChange={this.handleTariffSelected} options={this.tariffs}/></td>;
    let counter = (this.props.categories.some(cat => cat.id == this.state.category.value && cat.is_counter)) ?
      <tr><th>Начальное показание счетчика:</th><td><input type="number" value={this.state.startCounterValue} pattern="[0-9]+([,\.][0-9]+)?" onChange={event => this.handleValueChange(event)} min="0.0" step="0.001"/></td></tr> : null;
    return(
      <div className='container'>
        <form className="utilityForm" onSubmit={(event) => this.handleSubmit(event)}>
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <th>Категория</th>
                <td><Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/></td>
              </tr>
              <tr>
                <th>Тариф</th>
                {tariff}
              </tr>
              <tr>
                <th>Описание</th>
                <td><input type="text" value={this.state.description} onChange={(event) => this.handleDescriptionChange(event)}/></td>
              </tr>
              {counter}
            </tbody>
          </table>
          <input type="submit" value="Сохранить" />
        </form>
      </div>
    );
  }
}
export default connect(null)(UtilityForm);
