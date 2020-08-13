import React from 'react';
import { Link } from "react-router-dom";
import UtilityForm from './utility_form';
import UtilityTable from './utility_table';
import { connect } from "react-redux";
import { removeUtility, postUtility, fetchUtilities } from './redux/ActionCreators';
import { Loading } from './loadingComponent';
import MyHeader from '../components/my_header';
import Footer from '../components/footer';

class UtilitiesByFlat extends React.Component {
  componentDidMount(){
    const { flatId } = this.props.match.params;
    this.props.fetchUtilities(flatId);
  }
  render() {
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
        <MyHeader userId={this.props.userId} />
        <div className='row'>
          <ol className="col-12 breadcrumb">
            <li><Link to="/" className="btn btn-link">Home</Link></li>
            <li><Link to={`/users/${this.props.userId}`} className="btn btn-link">Жилье</Link></li>
            <li style={{marginTop:'7px'}} className="breadcrumb-item active">Услуги</li>
          </ol>
        </div>
        <UtilityForm postUtility={this.props.postUtility} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        <UtilityTable removeUtility={this.props.removeUtility} fetchUtilities={this.props.fetchUtilities} errMes={this.props.errMes} isLoading={this.props.isLoading} utilities={this.props.utilities} categories={this.props.categories} tariffs={this.props.tariffs} flatId={this.props.flatId}/>
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to={`/users/${this.props.userId}`} className="btn btn-link">
          Жилье
        </Link>
        <Link to={`/flats/${this.props.flatId}/accounts`} className="btn btn-link">
          Счета
        </Link>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postUtility: (flatId, utility) => dispatch(postUtility(flatId, utility)),
  removeUtility: (flatId, utilityId) => dispatch(removeUtility(flatId, utilityId)),
  fetchUtilities: (flatId) => dispatch(fetchUtilities(flatId))
});
const mapStateToProps = state => {
  return {userId: state.utilities.userId,
          flatId: state.utilities.flatId,
          isLoading: state.utilities.isLoading,
          errMes: state.utilities.errMes,
          tariffs: state.utilities.tariffs,
          categories: state.utilities.categories,
          utilities: state.utilities.utilities};
};
export default connect(mapStateToProps, mapDispatchToProps)(UtilitiesByFlat);
