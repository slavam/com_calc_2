import React from 'react';
import { connect } from 'react-redux';
import { Loading } from './loadingComponent';

class UtilityTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  handleDeleteClick(e) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: "/flats/"+this.props.flatId+"/utilities/"+e.target.id
    }).done(function(data){
      this.props.fetchUtilities(this.props.flatId);
    }.bind(this))
    .fail(function(res){});

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
    );
  }
}
export default connect(null)(UtilityTable);
// const handleDeleteClick = (e) => {
//   e.preventDefault();
//   // props.deleteUtility(e.target.id);
//   $.ajax({
//     type: 'DELETE',
//     url: "/flats/1/utilities/"+e.target.id
//     // url: "/utilities/"+e.target.id
//   }).done(function(data){
//     alert(data.message);
//     // dispatch(addUtilities(data));
//     // this.setState({utilities: data.utilities});
//   }.bind(this))
//   .fail(function(res){});
//   props.fetchUtilities(props.flatId);
//   // this.props.onDeleteUtility(e.target.id);
// };
// }
// const mapStateToProps = state => {
//   return {isLoading: state.utilities.isLoading, errMes: state.utilities.errMes, categories: state.tariffs.categories, tariffs: state.tariffs.tariffs, utilities: state.utilities.utilities, flatId: state.utilities.flatId};
// }
// export default connect(mapStateToProps)(UtilityTable);
