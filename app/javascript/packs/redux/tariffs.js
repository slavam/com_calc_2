import * as ActionTypes from './actionTypes';

// var categories = [];
// var tariffs = [];
//
// const node = document.getElementById('tariffs-data');
// if(node){
//   categories = JSON.parse(node.getAttribute('categories'));
//   tariffs = JSON.parse(node.getAttribute('tariffs'));
// }

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
