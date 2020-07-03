import * as ActionTypes from './actionTypes';

// const node = document.getElementById('accounts_data');
// if(node){
//   accounts = JSON.parse(node.getAttribute('accounts'));
//   utilityParams = JSON.parse(node.getAttribute('utilityParams'));
//   tariffLimits = JSON.parse(node.getAttribute('tariffLimits'));
//   flatId = JSON.parse(node.getAttribute('flatId'));
//   total = JSON.parse(node.getAttribute('total'));
// }

const initialState = {
  isLoading: true,
  errMes: null,
  accounts: [],
  utilityParams: [],
  tariffLimits: [],
  flatId: 0,
  userId: 0,
  total: 0
};
export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACCOUNT:
      var account = {};
      account = action.payload.account;
      // account.id = action.accounts.length;
      // account.start_date = action.payload.accountParams.startDate;
      // account.months_number = action.payload.accountParams.monthsNumber;
      // account.total = action.payload.accountParams.total;
      var accountsNew = account.concat(state.accounts);
      return Object.assign({}, state, {accounts: accountsNew});
    case ActionTypes.ACCOUNTS_LOADING:
      return {...state, isLoading: true, errMes: null, accounts: [], total: 0, utilityParams: []};
    case ActionTypes.ACCOUNTS_FAILED:
      return {...state, isLoading: false, errMes: action.payload, accounts: []};
    case ActionTypes.ADD_ACCOUNTS:
      return {...state, isLoading: false, errMes: null, accounts: action.payload.accounts, utilityParams: action.payload.utilityParams, tariffLimits: action.payload.tariffLimits, flatId: action.payload.flatId, userId: action.payload.userId, total: action.payload.total};

    default:
      return state;
  }
};
