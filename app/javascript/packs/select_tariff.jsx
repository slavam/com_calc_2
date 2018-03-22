import React from 'react';
export default class SelectTariff extends React.Component{
  handleChange(e) {
    e.preventDefault();
    this.props.onTariffChange(e.target.value);
  }
  render() {
    return(
      <select className='selectTariff' onChange={(event) => this.handleChange(event)}>
        {
          this.props.tariffs.map((t) => {
            if(t.category_id == this.props.categoryId)
              return <option key={t.id} value={t.id} >{t.name}</option>;
          })
        }
      </select>
    );
  }
}