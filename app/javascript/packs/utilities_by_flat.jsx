import React from 'react';
import ReactDOM from 'react-dom';
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { postUtility, fetchTariffs, fetchUtilities } from './redux/ActionCreators';

class UtilitiesByFlat extends React.Component {
  constructor(props) {
    super(props);
    this.flatId = 0;
    this.handleDeleteUtility = this.handleDeleteUtility.bind(this);
  }
  componentDidMount(){
    // this.props.fetchTariffs();
    this.props.fetchUtilities(this.props.flatId);
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
        <h3>Новая услуга {this.props.categories.length}</h3>
        <UtilityForm postUtility={this.props.postUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.flatId}/>
        {/*<UtilityForm addUtility={this.props.addUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>*/}
        {/*<h3>Всего услуг - {this.state.utilities.length}</h3>
        <UtilityTable utilities={this.state.utilities} categories={this.props.categories} tariffs={this.props.tariffs} onDeleteUtility={this.handleDeleteUtility}/>
        */}
        <h3>Список услуг {this.flatId}</h3>
        <UtilityTable errMes={this.props.errMes} isLoading={this.props.isLoading} utilities={this.props.utilities} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.flatId}/>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postUtility: (flatId, utility) => dispatch(postUtility(flatId, utility)),
  fetchTariffs: () => dispatch(fetchTariffs()),
  fetchUtilities: (flatId) => dispatch(fetchUtilities(flatId))
});
const mapStateToProps = state => {
  return {flatId: state.utilities.flatId, isLoading: state.utilities.isLoading, errMes: state.utilities.errMes, tariffs: state.utilities.tariffs, categories: state.utilities.categories, total: state.accounts.total, utilities: state.utilities.utilities};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);

// export default connect(null)(UtilitiesByFlat);
