import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { fetchCategories } from '../packs/redux/ActionCreators';
import { Loading } from '../packs/loadingComponent';

class Categories extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const allCategories = this.props.categories.map((category, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <h5 className="card-header bg-primary text-white">{category.name}</h5>
          <div className="card-body">
            <dl className="row">
              {category.description.length > 0 ? <dt className="col-5">Описание</dt> : null}
              {category.description.length > 0 ? <dd className="col-7">{category.description}</dd> : null}
              <dt className="col-5">Единица измерения</dt>
              <dd className="col-7">{category.unit}</dd>
              {category.is_counter ? <dt className="col-5">По счетчику</dt> : null}
              {category.is_variable_tariff ? <dt className="col-5">Переменный тариф</dt> : null}
            </dl>
            {/*<Link to={`/categories/${category.id}`} className="btn custom-button">
              Просмотреть
    </Link>*/}
          </div>
        </div>
      </div>
    ));
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
    }else return (
      <div className='container'>
        <Link to="/" className="btn btn-link">Home</Link>
        <div className='col-12'>
          <h2>Все категории</h2>
        </div>
        <div className="py-5">
          <main className="container">
            <div className="row">
              { allCategories }
            </div>
          </main>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});
const mapStateToProps = state => {
  return {categories: state.categories.categories,
          isLoading: state.categories.isLoading};
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
// export default Categories;
