import React from 'react';
import Select from 'react-select';
import TariffTable from './tariff_table';
import {connect} from 'react-redux';
import { getCategory, fetchTariffs } from './redux/ActionCreators';

class TariffsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {value: 1, label: 'Квартплата'}//{value: this.props.categories[0].id, label: this.props.categories[0].name}
    };
    this.categories = [];
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }
  componentDidMount() {
    this.props.fetchTariffs();
  }
  handleCategorySelected(category){
    this.setState({category});
    this.props.getCategory(category.value);
  }
  render() {
    this.props.categories.map((c) => {
      this.categories.push({value: c.id, label: c.name});
    });

    return(
      <div>
        <h3>Категория</h3>
        <Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>
        <h3>Тарифы</h3>
        <TariffTable />
        {/*<TariffTable tariffs={this.props.tariffs.tariffs}
              tariffsLoading={this.props.tariffs.isLoading}
              tariffErrMess={this.props.tariffs.errMess}/>*/}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getCategory: categoryId => dispatch(getCategory(categoryId)),
  fetchTariffs: () => dispatch(fetchTariffs())
});
const mapStateToProps = state => {
  return {categories: state.tariffs.categories}; //, isLoading: state.tariffs.isLoading};
};
// export default connect(mapStateToProps, { getCategory })(TariffsByCategory);
export default connect(mapStateToProps, mapDispatchToProps)(TariffsByCategory);
