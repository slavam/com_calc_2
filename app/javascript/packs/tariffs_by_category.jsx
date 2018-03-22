import React from 'react';
import ReactDOM from 'react-dom';
import SelectCategory from './select_category';
import TariffTable from './tariff_table';

export default class TariffsByCategory extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      category_id: 1
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }
  handleCategoryChange(value){
    this.setState({category_id: +value});
  }
  render() {
    return(
      <div>
        <h3>Категория</h3>
        <SelectCategory categories={this.props.categories} onCategoryChange={this.handleCategoryChange} />
        <h3>Тарифы => {this.state.category_id}</h3>
        <TariffTable tariffs={this.props.tariffs} category_id={this.state.category_id}/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('tariffs_data');
  const tariffs = JSON.parse(node.getAttribute('tariffs'));
  const categories = JSON.parse(node.getAttribute('categories'));

  ReactDOM.render(
    <TariffsByCategory tariffs={tariffs} categories={categories} />,
    document.getElementById('tariffs')
  );
})