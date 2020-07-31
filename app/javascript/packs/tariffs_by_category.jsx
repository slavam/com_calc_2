import React from 'react';
import Select from 'react-select';
import TariffTable from './tariff_table';
import {connect} from 'react-redux';
import { getCategory, fetchTariffs } from './redux/ActionCreators';
import { Loading } from './loadingComponent';
import Footer from '../components/footer';
import MyHeader from '../components/my_header';

class TariffsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {value: 1, label: 'Квартплата'} 
    };
    this.categories = [];
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }
  componentDidMount() {
    this.props.fetchTariffs();
    this.props.getCategory(this.state.category.value);
  }
  handleCategorySelected(category){
    this.setState({category});
    this.props.getCategory(category.value);
  }
  render() {
    if(this.props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }else if(this.props.errMes){
      return(
        <div className="container">
          <div className="row">
            <h4>{this.props.errMes}</h4>
          </div>
        </div>
      );
    }else{
      this.categories = [];
      this.props.categories.map((c) => {
        this.categories.push({value: c.id, label: c.name});
      });
      return(
        <div>
          <MyHeader userId={this.props.userId} />
          <div className='container'>
            <div className='row'>
              <ol className="col-12 breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Тарифы</li>
              </ol>
          </div>
            <div>
              <h3>Категория</h3>
              <Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>
              <TariffTable />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({
  getCategory: categoryId => dispatch(getCategory(categoryId)),
  fetchTariffs: () => dispatch(fetchTariffs())
});
const mapStateToProps = state => {
  return {categories: state.tariffs.categories,
          isLoading: state.tariffs.isLoading};
};
export default connect(mapStateToProps, mapDispatchToProps)(TariffsByCategory);
