import * as ActionTypes from './actionTypes';
var utilities = [];
// var tariffs = [];
// var tariffs = [];
// var categories = [];
var flatId = 4;

const node = document.getElementById('utilities_data');
if(node){
  utilities = JSON.parse(node.getAttribute('utilities'));
  flatId = JSON.parse(node.getAttribute('flatId'));
  // tariffs = JSON.parse(node.getAttribute('tariffs'));
  // categories = JSON.parse(node.getAttribute('categories'));
}

const initialState = {
  isLoading: true,
  errMes: null,
  utilities: utilities,
  // tariffs: tariffs,
  // categories: categories,
  flatId: flatId
};

export const Utilities = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_UTILITY:
      var utility = {};
      utility.id = state.utilities.length;
      utility.category_id = action.payload.utilityParams.categoryId;
      utility.tariff_id = action.payload.utilityParams.tariffId;
      utility.description = action.payload.utilityParams.description;
      utility.start_value_counter = action.payload.utilityParams.startCounterValue;
      var newUtilities = state.utilities.concat(utility);
      return Object.assign({}, state, {utilities: newUtilities, isLoading: false});
    case ActionTypes.UTILITIES_LOADING:
      // return Object.assign({}, state, {isLoading: true, errMes: null, utilities: []});
      return {...state, isLoading: true, errMes: null, utilities: []};
    case ActionTypes.UTILITIES_FAILED:
      return {...state, isLoading: false, errMes: action.payload, utilities: []};
    case ActionTypes.ADD_UTILITIES:
      return {...state, isLoading: false, errMes: null, utilities: action.payload};
    default:
      return state;
  }
};
