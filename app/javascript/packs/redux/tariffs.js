import * as ActionTypes from './actionTypes';
var categories = [];
var tariffs = [];

const node = document.getElementById('tariffs_data');
if(node){
  categories = JSON.parse(node.getAttribute('categories'));
  tariffs = JSON.parse(node.getAttribute('tariffs'));
}

const initialState = {
  categories: categories,
  tariffs: tariffs,
  categoryId: 1
}
export const Tariffs = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CATEGORY: {
      return Object.assign({}, state, {categoryId: action.categoryId});
    }
    // case ALL_TARIFFS: {
    //   const { id, content } = action.payload;
    //   return {};
    // }
    default:
      return state;
  }
}
