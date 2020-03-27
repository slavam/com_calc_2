import React from 'react';
import Select from 'react-select';
import TariffTable from './tariff_table';
import {connect} from 'react-redux';
import { getCategory } from './redux/actions'

const node = document.getElementById('tariffs_data');
const categories = JSON.parse(node.getAttribute('categories'));

class TariffsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    categories.map((c) => {
      this.categories.push({value: c.id, label: c.name});
    });
    this.state = {
      category: {value: categories[0].id, label: categories[0].name}
    };
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }
  handleCategorySelected(value){
    this.setState({category: value});
    this.props.getCategory(value.value);
  }
  render() {
    return(
      <div>
        <h3>Категория</h3>
        <Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>
        <h3>Тарифы</h3>
        <TariffTable />
      </div>
    );
  }
}

export default connect(null, { getCategory })(TariffsByCategory);
