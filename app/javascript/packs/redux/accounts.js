import * as ActionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  errMes: null,
  accounts: [],
  utilityParams: [],
  tariffLimits: [],
  flatId: 0,
  userId: 0,
  total: 0,
  account: null,
  payments: []
};
export const Accounts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ACCOUNT:
      return { ...state, accounts: [action.payload].concat(state.accounts)};
    case ActionTypes.ACCOUNTS_LOADING:
      return {...state, isLoading: true, errMes: null, accounts: [], total: 0, utilityParams: []};
    case ActionTypes.ACCOUNTS_FAILED:
      return {...state, isLoading: false, errMes: action.payload, accounts: []};
    case ActionTypes.ADD_ACCOUNTS:
      return {...state, isLoading: false, errMes: null, accounts: action.payload.accounts, utilityParams: action.payload.utilityParams, tariffLimits: action.payload.tariffLimits, flatId: action.payload.flatId, userId: action.payload.userId, total: action.payload.total};
    case ActionTypes.SET_VALUE_COUNTER:
      let newUtilityParams = [...state.utilityParams];
      newUtilityParams[action.utilityIndex].new_value_counter = action.valueCounter;
      newUtilityParams[action.utilityIndex].tariff = action.tariff;
      return { ...state, utilityParams: newUtilityParams};
    case ActionTypes.PAYMENTS_LOADING:
      return {...state, isLoading: true, errMes: null, account: [], payments: []};
    case ActionTypes.PAYMENTS_FAILED:
      return {...state, isLoading: false, errMes: action.payload, account: null, payments: []}
    case ActionTypes.ADD_PAYMENTS:
      return {...state, isLoading: false, errMes: null, account: action.payload.account, payments: action.payload.payments}
    default:
      return state;
  }
};
