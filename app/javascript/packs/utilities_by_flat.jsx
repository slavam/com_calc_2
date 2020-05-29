import React from 'react';
import ReactDOM from 'react-dom';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { postUtility, fetchTariffs, fetchUtilities } from './redux/ActionCreators';

class UtilitiesByFlat extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteUtility = this.handleDeleteUtility.bind(this);
  }
  componentDidMount(){
    this.props.fetchTariffs();
    const link = document.getElementById('to_accounts');
    const flatId = JSON.parse(link.getAttribute('flatId'));
    this.props.fetchUtilities(flatId);
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

  render() {
    return(
      <div>
        <h3>Новая услуга</h3>
        <UtilityForm  postUtility={this.props.postUtility} categories={this.props.categories} tariffs={this.props.tariffs}/>
        {/*<UtilityForm addUtility={this.props.addUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>*/}
        {/*<h3>Всего услуг - {this.state.utilities.length}</h3>
        <UtilityTable utilities={this.state.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onDeleteUtility={this.handleDeleteUtility}/>
        */}
        <h3>Список услуг {this.props.flatId}</h3>
        <UtilityTable />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postUtility: (flatId, utility) => dispatch(postUtility(flatId, utility)),
  fetchUtilities: (flatId) => dispatch(fetchUtilities(flatId)),
  fetchTariffs: () => dispatch(fetchTariffs())
});
const mapStateToProps = state => {
  return {tariffs: state.tariffs.tariffs, categories: state.tariffs.categories, total: state.accounts.total, flatId: state.accounts.flatId};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);

// export default connect(null)(UtilitiesByFlat);
