import React from 'react';
import { connect } from "react-redux";
const UtilityTable = ({categories, tariffs, utilities}) =>(
  // constructor(props) {
  //   super(props);
  //   this.handleDeleteClick = this.handleDeleteClick.bind(this);
  // }
  // handleDeleteClick(e){
  //   this.props.onDeleteUtility(e.target.id);
  // }
  // render() {
    // var that = this;
  <div>
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Категория</th>
          <th>Тариф</th>
          <th>Описание</th>
          <th>По счетчику?</th>
          <th>Показания при установке</th>
          <th>Последние показания</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          utilities.map((u) => {
            let deleteLink = <input id={u.id} type="submit" value="Удалить" onClick={this.handleDeleteClick}/>;
            let category;
            categories.some(cat => {category = cat; return cat.id == u.category_id});
            let tariff;
            tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id});
            return <tr key={u.id}><td>{category.name}</td><td>{category.is_variable_tariff ? 'Тариф зависит от количества' : tariff.value}</td><td>{u.description}</td><td>{category.is_counter ? 'Да':'Нет'}</td><td>{u.start_value_counter}</td><td>{u.last_value_counter}</td><td>{deleteLink}</td></tr>;
          })
        }
      </tbody>
    </table>
  </div>
);
const mapStateToProps = state => {
  return {categories: state.utilities.categories, tariffs: state.utilities.tariffs, utilities: state.utilities.utilities, flatId: state.utilities.flatId};
}
export default connect(mapStateToProps)(UtilityTable);
