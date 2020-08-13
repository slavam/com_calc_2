import React from 'react';
import { connect } from 'react-redux';

class UtilityTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    if (!confirm("Услуга будет удалена со всеми платежами по ней в счетах. Удалить?"))
      return;
    this.props.removeUtility(this.props.flatId, e.target.id);
    this.props.fetchUtilities(this.props.flatId);
  }
  render(){
    return(
      <div className='container'> 
        <div className='row row-content'>
          <div className='col-12'>
            <h3>Список услуг. Всего услуг - {this.props.utilities.length}</h3>
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead className='thead-dark'>
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
                  {this.props.utilities.map((u) => {
                    let deleteLink = <input id={u.id} type="submit" value="Удалить" onClick={event => this.handleDeleteClick(event)}/>;
                    var category;
                    this.props.categories.some(cat => {category = cat; return cat.id == u.category_id;});
                    var tariff;
                    this.props.tariffs.some(tar => {tariff = tar; return tar.id == u.tariff_id;});

                    return <tr key={u.id}>
                        <td>{category.name}</td>
                        <td>{category.is_variable_tariff ? 'Тариф зависит от количества' : tariff.value}</td>
                        <td>{u.description}</td>
                        <td>{category.is_counter ? 'Да':'Нет'}</td>
                        <td>{category.is_counter ? u.start_value_counter : ''}</td>
                        <td>{category.is_counter ? u.last_value_counter : ''}</td>
                        <td>{deleteLink}</td>
                      </tr>;
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null)(UtilityTable);

