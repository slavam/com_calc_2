import React from 'react';
import ReactDOM from 'react-dom';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';

export default class UtilitiesByFlat extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      flatId: this.props.flatId,
      utilities: this.props.utilities
    };
    this.createUtility = this.createUtility.bind(this);
    this.handleDeleteUtility = this.handleDeleteUtility.bind(this);
  }
  handleDeleteUtility(utilityId){
    // var that = this;
    $.ajax({
      type: 'DELETE',
      url: "/flats/"+this.props.flatId+"/utilities/"+utilityId
      // data: {flat_id: this.props.flatId, id: utilityId}
      // url: "/pollution_values/delete_value/"+utilityId //value_delete?=record_id="+pollutionId
    }).done(function(data){
      this.setState({utilities: data.utilities});
    }.bind(this))
    .fail(function(res){});
  }
  createUtility(utility){
    $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {flat_id: this.props.flatId, utility: {category_id: utility.categoryId, tariff_id: utility.tariffId, description: utility.description, start_value_counter: utility.startCounterValue }}, 
      // url: "/flats/"+this.props.flatId+"/utilities/create"
      }).done((data) => {
        this.setState({utilities: data.utilities});
        // alert(this.state.errors[0]);
      }).fail((res) => {
        this.setState({errors: ["Ошибка записи в базу"]});
      }); 
  }
  render() {
    return(
      <div>
        <h3>Новая услуга flatId=>{this.props.flatId}</h3>
        <UtilityForm categories={this.props.categories} tariffs={this.props.tariffs} onUtilitySubmit={this.createUtility} />
        <h3>Всего услуг - {this.state.utilities.length}</h3>
        <UtilityTable utilities={this.state.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onDeleteUtility={this.handleDeleteUtility}/>
      </div>
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('utilities_data');
  const tariffs = JSON.parse(node.getAttribute('tariffs'));
  const categories = JSON.parse(node.getAttribute('categories'));
  const utilities = JSON.parse(node.getAttribute('utilities'));
  const flatId = node.getAttribute('flatId');

  ReactDOM.render(
    <UtilitiesByFlat flatId={flatId} utilities={utilities} tariffs={tariffs} categories={categories} />,
    document.getElementById('utilities')
  );
})