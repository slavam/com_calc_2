import React from 'react';
import SelectCategory from './select_category';
import SelectTariff from './select_tariff';

export default class UtilityForm extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 1,
      tariffId: 4,
      description: '',
      startCounterValue: 0.0,
      errors: []
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTariffChange = this.handleTariffChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  handleCategoryChange(value){
    let tariffId;
    this.props.tariffs.some(t => {
      tariffId = t.id;
      return t.category_id == +value;
    });
    this.setState({categoryId: +value, tariffId: tariffId});
    
  }
  handleTariffChange(value){
    this.setState({tariffId: +value});
  }
  handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  handleValueChange(e){
    this.setState({startCounterValue: +e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.onUtilitySubmit(this.state);
    this.state.description = '';
    this.state.startCounterValue = 0;
    // this.setState({description: '', startCounterValue: 0});
    // let mySelect = document.getElementById('selectCategory');
    // mySelect.selectedIndex = 0;
  }
  render() {
    let tariff = (this.props.categories.some(cat => cat.id == this.state.categoryId && cat.is_variable_tariff)) ? <p>Тариф зависит от потребленного количества</p> : <SelectTariff categoryId={this.state.categoryId} tariffs={this.props.tariffs} onTariffChange={this.handleTariffChange} />;
    let counter = (this.props.categories.some(cat => cat.id == this.state.categoryId && cat.is_counter)) ? <div>Начальное показание счетчика:<input type="number" value={this.state.startCounterValue} pattern="[0-9]+([,\.][0-9]+)?" onChange={this.handleValueChange} min="0.0" step="0.001"/></div> : '';
    return(
      <div>
        <form className="utilityForm" onSubmit={(event) => this.handleSubmit(event)}>
          <div>Категория
            <SelectCategory categories={this.props.categories} defaultValue={this.state.categoryId} onCategoryChange={this.handleCategoryChange} />
          </div>
          <div>Тариф
            {tariff}
          </div>
          <div>Описание
            <input type="text" value={this.state.description} onChange={(event) => this.handleDescriptionChange(event)}/>
            <span style={{color: 'red'}}>{this.state.errors[0]}</span>
          </div>
          {counter}
          <input type="submit" value="Сохранить" />
        </form>          
      </div>
    );
  }
}