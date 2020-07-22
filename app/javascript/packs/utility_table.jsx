import React from 'react';
import { connect } from 'react-redux';
import { Loading } from './loadingComponent';
import { baseUrl } from './redux/ActionCreators';

class UtilityTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    return fetch(baseUrl + 'flats/'+this.props.flatId+'/utilities/'+e.target.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(this.props.fetchUtilities(this.props.flatId))
    .catch(error =>  { console.log('delete utilities', error.message); alert('Your utility could not be deleted\nError: '+error.message); });
  }
  render(){
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
    }else return(
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

