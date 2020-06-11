import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Utilities</h1>
        <hr className="my-4" />
        <Link
          to="/tariffs"
          className="btn btn-lg custom-button"
          role="button"
        >
          Tariffs
        </Link>
        <br/>
        <Link
          to="/categories"
          className="btn btn-lg custom-button"
          role="button"
        >
          Categories
        </Link>
        <br/>
        <Link to={`/users/${props.userId}`} className="btn custom-button">
          Жилье
        </Link>
      </div>
    </div>
  </div>
);
