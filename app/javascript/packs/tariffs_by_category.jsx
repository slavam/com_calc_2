import React from 'react';
import Select from 'react-select';
import TariffTable from './tariff_table';
import {connect} from 'react-redux';
import { getCategory } from './redux/ActionCreators';

class TariffsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.props.categories.map((c) => {
      this.categories.push({value: c.id, label: c.name});
    });
    this.category = {value: this.props.categories[0].id, label: this.props.categories[0].name}
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }
  handleCategorySelected(value){
    this.props.getCategory(value.value);
  }
  render() {
    return(
      <div>
        <h3>Категория</h3>
        <Select value={this.category} onChange={this.handleCategorySelected} options={this.categories}/>
        <h3>Тарифы</h3>
        <TariffTable />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {categories: state.tariffs.categories};
}
export default connect(mapStateToProps, { getCategory })(TariffsByCategory);
