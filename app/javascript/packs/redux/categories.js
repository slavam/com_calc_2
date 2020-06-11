import * as ActionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  categories: []
};
export const Categories = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORIES:
      return {...state, isLoading: false, errMess: null, categories: action.payload};
    case ActionTypes.CATEGORIES_LOADING:
      return {...state, isLoading: true, errMess: null, categories: []};
    case ActionTypes.CATEGORIES_FAILED:
      return {...state, isLoading: false, errMess: action.payload};
    default:
      return state;
  }
};
