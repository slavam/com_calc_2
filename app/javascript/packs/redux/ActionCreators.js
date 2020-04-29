import * as ActionTypes from './actionTypes';

export const getCategory = (categoryId) => ({
  type: ActionTypes.GET_CATEGORY,
  categoryId: categoryId
})

export const addAccount = (flatId, accountParams) => ({
  type: ActionTypes.ADD_ACCOUNT,
  payload: {
    flatId: flatId,
    accountParams: accountParams
  }
})
