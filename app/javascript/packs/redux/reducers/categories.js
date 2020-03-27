import { GET_CATEGORY } from "../actionTypes";

const node = document.getElementById('tariffs_data');
const tariffs = JSON.parse(node.getAttribute('tariffs'));

const initialState = {
  tariffs: tariffs,
  categoryId: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY: {
      return Object.assign({}, state, {categoryId: action.categoryId});
    }
    default:
      return state;
  }
}
