import React from "react";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
      const url = "/categories/index";
      // fetch(url)
    //   fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
        // .then(response => {
        //   if (response.ok) {
        //     return response.json();
        //   }
        //   throw new Error("Network response was not ok.");
        // })
        // .then(response => this.setState({ categories: response }))
        // .catch(() => this.props.history.push("/"));
      $.ajax({
          type: 'GET',
          url: "/categories",
          dataType: 'json',
        }).done((data) => {
          this.setState({ categories: data });
          // dispatch(addTariffs(data));
        }).fail((res) => {
          // dispatch(tariffsFailed("Ошибка при чтении тарифов из базы"));
          this.setState({errors: ["Ошибка при чтении тарифов из базы"]});
        });
  }
  render() {
    const { categories } = this.state;
    const allCategories = categories.map((category, index) => (
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
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/new_recipe">create one</Link>
        </h4>
      </div>
    );

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
export default Categories;
