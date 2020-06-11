import * as ActionTypes from './actionTypes';
// var utilities = [];
// var flatId = 4;
//
// const node = document.getElementById('utilities_data');
// if(node){
//   utilities = JSON.parse(node.getAttribute('utilities'));
//   flatId = JSON.parse(node.getAttribute('flatId'));
// }

const initialState = {
  isLoading: true,
  errMes: null,
  utilities: [], //utilities,
  categories: [],
  tariffs: [],
  flatId: 4 //flatId
};

export const Utilities = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_UTILITY:
      var utility = {};
      utility.category_id = action.payload.category_id;
      utility.tariff_id = action.payload.tariff_id;
      utility.description = action.payload.description;
      utility.start_value_counter = action.payload.start_value_counter;
      var newUtilities = state.utilities.concat(utility);
      return {...state, isLoading: false, errMes: null, utilities: newUtilities};
      // return Object.assign({}, state, {utilities: newUtilities, isLoading: false});
    case ActionTypes.UTILITIES_LOADING:
      // return Object.assign({}, state, {isLoading: true, errMes: null, utilities: []});
      return {...state, isLoading: true, errMes: null, utilities: []};
    case ActionTypes.UTILITIES_FAILED:
      return {...state, isLoading: false, errMes: action.payload, utilities: []};
    case ActionTypes.ADD_UTILITIES:
      return {...state, isLoading: false, errMes: null, utilities: action.payload.utilities, categories: action.payload.categories, tariffs: action.payload.tariffs, flatId: action.payload.flatId};
    default:
      return state;
  }
};
