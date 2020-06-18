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
      categoryId: 1,
      tariffId: 4,
      description: '',
      startCounterValue: 0.0,
      category: this.props.categories[0] ? {value: this.props.categories[0].id, label: this.props.categories[0].name}:{value:1, label: 'ssss'}, //this.categories[0],//{value: this.categories[0].id, label: this.categories[0].name},
      tariff: this.props.tariffs[0] ? {value: this.props.tariffs[0].id, label: this.props.tariffs[0].name}:{value: 4, label: 'ddddd'}
      // errors: []
    };
    // this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleTariffSelected = this.handleTariffSelected.bind(this);
    // this.handleTariffChange = this.handleTariffChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  // componentDidMount(){
// alert('componentDidMount =>'+this.props.categories.length)
    // this.props.fetchTariffs();
    // this.props.categories.map((c) => {
    //   this.categories.push({value: c.id, label: c.name});
    // });
  // }
  handleCategorySelected(value){
    let categoryId = value.value;
    this.tariffs = [];
    this.props.tariffs.map((t) => {
      if(t.category_id == categoryId)
        this.tariffs.push({value: t.id, label: t.name});
    });
    this.setState({category: value, tariff: this.tariffs[0], categoryId: categoryId});
    // this.props.getCategory(value.value);
  }
  handleTariffSelected(value){
    this.setState({tariff: value});
  }
  // handleCategoryChange(value){
  //   let tariffId;
  //   this.props.tariffs.some(t => {
  //     tariffId = t.id;
  //     return t.category_id == +value;
  //   });
  //   this.setState({categoryId: +value, tariffId: tariffId});
  //
  // }
  // handleTariffChange(value){
  //   this.setState({tariffId: +value});
  // }
  handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  handleValueChange(e){
    this.setState({startCounterValue: +e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.postUtility(this.props.flatId, this.state);
    this.state.description = '';
    this.state.startCounterValue = 0;
  }
  render() {
    // alert('render => '+this.props.categories.length)
    var categories = [];
    this.props.categories.map((c) => {
      categories.push({value: c.id, label: c.name});
    });
    var tariff = (this.props.categories.some(cat => cat.id == this.state.categoryId && cat.is_variable_tariff)) ?
      <p>Тариф зависит от потребленного количества</p> :
      <Select value={this.state.tariff} onChange={this.handleTariffSelected} options={this.tariffs}/>;
    let counter = (this.props.categories.some(cat => cat.id == this.state.categoryId && cat.is_counter)) ?
      <div>Начальное показание счетчика:<input type="number" value={this.state.startCounterValue} pattern="[0-9]+([,\.][0-9]+)?" onChange={this.handleValueChange} min="0.0" step="0.001"/></div> : '';
    return(
      <div>
        <form className="utilityForm" onSubmit={(event) => this.handleSubmit(event)}>
          <div>Категория
            <Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>
          </div>
          <div>Тариф
            {tariff}
          </div>
          <div>Описание
            <input type="text" value={this.state.description} onChange={(event) => this.handleDescriptionChange(event)}/>
            {/*<span style={{color: 'red'}}>{this.state.errors[0]}</span>*/}
          </div>
          {counter}
          <input type="submit" value="Сохранить" />
        </form>
      </div>
    );
  }
}
// const mapDispatchToProps = dispatch => ({
//   fetchTariffs: () => dispatch(fetchTariffs())
// });
// const mapStateToProps = state => {
//   return {tariffs: state.tariffs.tariffs, flatId: state.accounts.flatId, categories: state.tariffs.categories}
// };
export default connect(null)(UtilityForm);
// export default connect(mapStateToProps)(UtilityForm);
// export default connect(mapStateToProps, mapDispatchToProps)(UtilityForm);
