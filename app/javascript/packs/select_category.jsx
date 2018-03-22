import React from 'react';
export default class SelectCategory extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.props.onCategoryChange(e.target.value);
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