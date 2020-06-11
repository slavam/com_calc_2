import * as ActionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  categories: [],
  tariffs: [],
  categoryId: 1
};
export const Tariffs = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CATEGORY:
      return {...state, categoryId: action.categoryId};
    case ActionTypes.ADD_TARIFFS:
      return {...state, isLoading: false, errMess: null, tariffs: action.payload.tariffs, categories: action.payload.categories};
    case ActionTypes.TARIFFS_LOADING:
      return {...state, isLoading: true, errMess: null, tariffs: [], categories: []};
    case ActionTypes.TARIFFS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};
    default:
      return state;
  }
};
