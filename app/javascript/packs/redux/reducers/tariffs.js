import { ALL_TARIFFS, TARIFFS_BY_CAT } from "../actionTypes";

const initialState = {
  tariffs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_TARIFFS: {
      const { id, content } = action.payload;
      return {};
    }
    default:
      return state;
  }
}
