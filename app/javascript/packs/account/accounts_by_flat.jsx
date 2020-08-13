import React from 'react';
import { Link } from "react-router-dom";
import AccountForm from './account_form';
import AccountTable from './account_table';
import { connect } from "react-redux";
import { removeAccount, postAccount, setValueCounter, fetchAccounts } from '../redux/ActionCreators';
import { Loading } from '../loadingComponent';
import MyHeader from '../../components/my_header';
import Footer from '../../components/footer';

class AccountsByFlat extends React.Component {
  componentDidMount(){
    const { flatId } = this.props.match.params;
    this.props.fetchAccounts(flatId);
  }
  // handleDeleteAccount(accountId){
  //   $.ajax({
  //     type: 'DELETE',
  //     url: "/flats/"+this.props.flatId+"/accounts/"+accountId
  //   }).done(function(data){
  //     this.setState({accounts: data.accounts});
  //   }.bind(this))
  //   .fail(function(res){});
  // }
  
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
            <li><Link to={`/flats/${this.props.flatId}/accounts`} className="btn btn-link">Счета</Link></li>
          </ol>
        </div>
        <AccountForm setValueCounter={this.props.setValueCounter} postAccount={this.props.postAccount} total={this.props.total} utilityParams={this.props.utilityParams} flatId={this.props.flatId} tariffLimits={this.props.tariffLimits} />
        <AccountTable removeAccount={this.props.removeAccount} fetchAccounts={this.props.fetchAccounts}/>
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to={`/users/${this.props.userId}`} className="btn btn-link">
          Жилье
        </Link>
        <Link to={`/flats/${this.props.flatId}/utilities`} className="btn btn-link">
          Услуги
        </Link>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  postAccount: (flatId, accountParams) => dispatch(postAccount(flatId, accountParams)),
  setValueCounter: (utilityIndex, valueCounter, tariff) => dispatch(setValueCounter(utilityIndex, valueCounter, tariff)),
  fetchAccounts: (flatId) => dispatch(fetchAccounts(flatId)),
  removeAccount: (flatId, accountId) => dispatch(removeAccount(flatId, accountId))  
});
const mapStateToProps = state => {
  return {
    isLoading: state.accounts.isLoading,
    userId: state.accounts.userId,
    accounts: state.accounts.accounts,
    utilityParams: state.accounts.utilityParams,
    tariffLimits: state.accounts.tariffLimits,
    total: state.accounts.total,
    flatId: state.accounts.flatId
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountsByFlat);
