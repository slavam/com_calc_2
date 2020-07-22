import * as ActionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  errMes: null,
  utilities: [],
  categories: [],
  tariffs: [],
  userId: 0,
  flatId: 0
};

export const Utilities = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_UTILITY:
      var utility = {};
      utility.id = action.payload.id;
      utility.flat_id = action.payload.flat_id;
      utility.category_id = action.payload.category_id;
      utility.tariff_id = action.payload.tariff_id;
      utility.description = action.payload.description;
      utility.start_value_counter = action.payload.start_value_counter;
      utility.last_value_counter = action.payload.last_value_counter;
      var newUtilities = state.utilities.concat(utility);
      return {...state, isLoading: false, errMes: null, utilities: newUtilities};
    case ActionTypes.UTILITIES_LOADING:
      return {...state, isLoading: true, errMes: null, utilities: []};
    case ActionTypes.UTILITIES_FAILED:
      return {...state, isLoading: false, errMes: action.payload, utilities: []};
    case ActionTypes.ADD_UTILITIES:
      return {...state, isLoading: false, errMes: null, utilities: action.payload.utilities, categories: action.payload.categories, tariffs: action.payload.tariffs, flatId: action.payload.flatId, userId: action.payload.userId};
    default:
      return state;
  }
};
