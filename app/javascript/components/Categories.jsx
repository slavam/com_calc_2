import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { fetchCategories } from '../packs/redux/ActionCreators';

class Categories extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    const allCategories = this.props.categories.map((category, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{category.name}</h5>
            <Link to={`/categories/${category.id}`} className="btn custom-button">
              Просмотреть
            </Link>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Все категории</h1>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              { allCategories }
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </div>
    );
  }
}
// export default Categories;
const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
});
const mapStateToProps = state => {
  return {categories: state.categories.categories};
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
