import React from 'react';
import { Link } from "react-router-dom";
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
    this.props.categories.map((c) => {
      this.categories.push({value: c.id, label: c.name});
    });
  }
  handleCategorySelected(category){
    this.setState({category});
    this.props.getCategory(category.value);
  }
  render() {
    let formIs = this.props.isLoading ?
      null :
      <div>
        <h3>Категория</h3>
        <Select value={this.state.category} onChange={this.handleCategorySelected} options={this.categories}/>
        <TariffTable />
      </div>;
    // this.props.categories.map((c) => {
    //   this.categories.push({value: c.id, label: c.name});
    // });

    return(
      <div>
        <nav className='navbar navbar-dark navbar-expand-sm fixed-top'>
          <div className='container'>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target="#Navbar">
              <span className='navbar-toggler-icon'></span>
            </button>
            <a className='navbar-brand mr-auto' href='/'>Utilities</a>
              <div className='collapse navbar-collapse' id='Navbar'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item'>
                    <Link to="/" className="btn btn-link nav-link">
                      Home
                    </Link>
                  </li>
                  <li className='nav-item active'>
                    <Link to="/tariffs" className="btn btn-link nav-link">
                      Тарифы
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to="/categories" className="btn btn-link nav-link">
                      Категории услуг
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={`/users/${this.props.userId}`} className="btn btn-link nav-link">
                      Жилье
                    </Link>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <ol className="col-12 breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Тарифы</li>
            </ol>
          </div>
          
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getCategory: categoryId => dispatch(getCategory(categoryId)),
  fetchTariffs: () => dispatch(fetchTariffs())
});
const mapStateToProps = state => {
  return {categories: state.tariffs.categories,
          isLoading: state.utilities.isLoading};
};
export default connect(mapStateToProps, mapDispatchToProps)(TariffsByCategory);
