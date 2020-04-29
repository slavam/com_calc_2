// import { UTILITIES_BY_FLAT } from "../actionTypes";
import * as ActionTypes from './actionTypes';
var utilities = [];
var tariffs = [];
var categories = [];
var flatId = 4;

const node = document.getElementById('utilities_data');
if(node){
  utilities = JSON.parse(node.getAttribute('utilities'));
  flatId = JSON.parse(node.getAttribute('flatId'));
  tariffs = JSON.parse(node.getAttribute('tariffs'));
  categories = JSON.parse(node.getAttribute('categories'));
}

const initialState = {
  utilities: utilities,
  tariffs: tariffs,
  categories: categories,
  flatId: flatId
};

export const Utilities = (state = initialState, action) => {
  switch (action.type) {
    // case UTILITIES_BY_FLAT: {
    //   return Object.assign({}, state, {flatId: action.Id, utilities: action.utilities});
    // }
    default:
      return state;
  }
}
