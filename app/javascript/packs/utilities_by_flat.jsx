import React from 'react';
import ReactDOM from 'react-dom';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { addUtility, fetchTariffs, fetchUtilities } from './redux/ActionCreators';

class UtilitiesByFlat extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   flatId: this.props.flatId,
    //   utilities: this.props.utilities
    // };
    // this.createUtility = this.createUtility.bind(this);
    this.handleDeleteUtility = this.handleDeleteUtility.bind(this);
  }
  componentDidMount(){
    this.props.fetchUtilities();
    this.props.fetchTariffs();
  }
  handleDeleteUtility(utilityId){
    $.ajax({
      type: 'DELETE',
      url: "/flats/"+this.props.flatId+"/utilities/"+utilityId
    }).done(function(data){
      this.setState({utilities: data.utilities});
    }.bind(this))
    .fail(function(res){});
  }
  // createUtility(utility){
  //   $.ajax({
  //     type: 'POST',
  //     dataType: 'json',
  //     data: {flat_id: this.props.flatId, utility: {category_id: utility.categoryId, tariff_id: utility.tariffId, description: utility.description, start_value_counter: utility.startCounterValue }},
  //     }).done((data) => {
  //       this.props.getUtilities(data.utilities);
  //       // this.setState({utilities: data.utilities});
  //     }).fail((res) => {
  //       this.setState({errors: ["Ошибка записи в базу"]});
  //     });
  // }
  render() {
    return(
      <div>
        <h3>Новая услуга</h3>
        <UtilityForm  addUtility={this.props.addUtility} categories={this.props.categories} tariffs={this.props.tariffs}/>
        {/*<UtilityForm addUtility={this.props.addUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>*/}
        {/*<h3>Всего услуг - {this.state.utilities.length}</h3>
        <UtilityTable utilities={this.state.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onDeleteUtility={this.handleDeleteUtility}/>
        */}
        <h3>Список услуг</h3>
        <UtilityTable />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addUtility: (flatId, utilityParams) => dispatch(addUtility(flatId, utilityParams)),
  fetchUtilities: () => dispatch(fetchUtilities()),
  fetchTariffs: () => dispatch(fetchTariffs())
});
const mapStateToProps = state => {
  return {tariffs: state.tariffs.tariffs, categories: state.tariffs.categories, total: state.accounts.total, flatId: state.accounts.flatId};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);

// export default connect(null)(UtilitiesByFlat);
