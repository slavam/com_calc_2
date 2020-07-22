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
      category: {value: this.props.categories[0].id, label: this.props.categories[0].name},
      tariff: {value: this.props.tariffs[0].id, label: this.props.tariffs[0].name}
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
      <p>Тариф зависит от потребленного количества</p> :
      <Select id='tariff' value={this.state.tariff} onChange={this.handleTariffSelected} options={this.tariffs}/>;
    let counter = (this.props.categories.some(cat => cat.id == this.state.category.value && cat.is_counter)) ?
      <div className='form-group row'>
        <label htmlFor='counter' className='col-md-2 col-form-label'>Начальное показание счетчика</label>
        <div className='col-md-10'>
          <input className="form-control" id='counter' type="number" value={this.state.startCounterValue} pattern="[0-9]+([,\.][0-9]+)?" onChange={event => this.handleValueChange(event)} min="0.0" step="0.001"/>
        </div>
      </div> : null;
    return(
      <div className='container'>
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Новая услуга</h3>
          </div>
          <div className='col-12 col-md-9'>
            <form className="utilityForm" onSubmit={(event) => this.handleSubmit(event)}>
              <div className='form-group row'>
                <label htmlFor='category' className='col-md-2 col-form-label'>Категория</label>
                <div className='col-md-10'>
                  <Select id='category' value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>  
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='tariff' className='col-md-2 col-form-label'>Тариф</label>
                <div className='col-md-10'>
                  {tariff}
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='description' className='col-md-2 col-form-label'>Описание</label>
                <div className='col-md-10'>
                  <input className="form-control" id='description' type="text" value={this.state.description} onChange={(event) => this.handleDescriptionChange(event)}/>
                </div>
              </div>
              {counter}
              <div className='form-group row'>
                <div className='offset-md-2 col-md-10'>
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
export default connect(null)(UtilityForm);
