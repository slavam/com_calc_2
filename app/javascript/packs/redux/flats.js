import * as ActionTypes from './actionTypes';

const initialState = {
  isLoading: true,
  errMess: null,
  flats: [],
  user: null
};
export const Flats = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FLATS:
      return {...state, isLoading: false, errMess: null, flats: action.payload.flats, user: action.payload.user};
    case ActionTypes.FLATS_LOADING:
      return {...state, isLoading: true, errMess: null, flats: [], user: null};
    case ActionTypes.FLATS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};
    default:
      return state;
  }
};
