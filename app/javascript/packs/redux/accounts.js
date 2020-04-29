import * as ActionTypes from './actionTypes';
var accounts = [];
var utilityParams = [];
var tariffLimits = [];
var total = 0;
var flatId = 4;

const node = document.getElementById('accounts_data');
if(node){
  accounts = JSON.parse(node.getAttribute('accounts'));
  utilityParams = JSON.parse(node.getAttribute('utilityParams'));
  tariffLimits = JSON.parse(node.getAttribute('tariffLimits'));
  flatId = JSON.parse(node.getAttribute('flatId'));
  total = JSON.parse(node.getAttribute('total'));
}

const initialState = {
  accounts: accounts,
  utilityParams: utilityParams,
  tariffLimits: tariffLimits,
  flatId: flatId,
  total: total
}
export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACCOUNT:
      var account = {};
      account.id = state.accounts.length;
      account.start_date = action.payload.accountParams.startDate;
      account.months_number = action.payload.accountParams.monthsNumber;
      account.total = action.payload.accountParams.total;
      var accountsNew = state.accounts.concat(account);
      return Object.assign({}, state, {accounts: accountsNew});
    default:
      return state;
  }
}
