import React from 'react';
import { connect } from "react-redux";
import { Loading } from './loadingComponent';
// const UtilityTable = ({isLoading, errMes, categories, tariffs, utilities}) =>(
const UtilityTable = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.handleDeleteClick = this.handleDeleteClick.bind(this);
  // }
  // handleDeleteClick(e){
  //   this.props.onDeleteUtility(e.target.id);
  // }
  // render() {
    // var that = this;
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }else if(props.errMes){
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMes}</h4>
        </div>
      </div>
    );
  }else return(
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
            {props.utilities.map((u) => {
              let deleteLink = <input id={u.id} type="submit" value="Удалить" onClick={this.handleDeleteClick}/>;
              let category;
              props.categories.some(cat => {category = cat; return cat.id == u.category_id});
              let tariff;
              props.tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id});
              return <tr key={u.id}><td>{category.name}</td><td>{category.is_variable_tariff ? 'Тариф зависит от количества' : tariff.value}</td><td>{u.description}</td><td>{category.is_counter ? 'Да':'Нет'}</td><td>{u.start_value_counter}</td><td>{u.last_value_counter}</td><td>{deleteLink}</td></tr>;
            })
          }
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = state => {
  return {isLoading: state.utilities.isLoading, errMes: state.utilities.errMes, categories: state.tariffs.categories, tariffs: state.tariffs.tariffs, utilities: state.utilities.utilities, flatId: state.utilities.flatId};
}
export default connect(mapStateToProps)(UtilityTable);
