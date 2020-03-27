import React from 'react';
import { connect } from 'react-redux'
import { getCategory } from './redux/actions'

class SelectCategory extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    // console.log("CategoryId=>"+e.target.value);
    e.preventDefault();
    // this.props.onCategoryChange(e.target.value);
    this.props.getCategory(e.target.value);
  }
  render() {
    return(
      <select id="selectCategory" className='selectCategory' onChange={(event) => this.handleChange(event)} defaultValue = {this.props.defaultValue}>
        {
          this.props.categories.map((c) => {
            return <option key={c.id} value={c.id} >{c.name}</option>;
          })
        }
      </select>
    );
  }
}

const mapStateToProps = state => {
  return { categoryId: state.categoryId };
};

export default connect(
  mapStateToProps,
  { getCategory }
)(SelectCategory)
