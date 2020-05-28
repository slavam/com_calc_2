import * as ActionTypes from './actionTypes';

var utilities = [];
const node = document.getElementById('utilities_data');
if(node){
  utilities = JSON.parse(node.getAttribute('utilities'));
}

export const getCategory = (categoryId) => ({
  type: ActionTypes.GET_CATEGORY,
  categoryId: categoryId
});
export const addAccount = (flatId, accountParams) => ({
  type: ActionTypes.ADD_ACCOUNT,
  payload: {
    flatId: flatId,
    accountParams: accountParams
  }
});
export const addUtility = (flatId, utilityParams) => ({
  type:ActionTypes.ADD_UTILITY,
  payload: {
    flatId: flatId,
    utilityParams: utilityParams
  }
});
export const fetchUtilities = () => (dispatch) => {
  dispatch(utilitiesLoading(true));

  // return(fetch())
  setTimeout(() => {
    dispatch(addUtilities(utilities));
  }, 2000);
};
export const utilitiesLoading = () => ({
  type: ActionTypes.UTILITIES_LOADING
});
export const utilitiesFailed = (errmes) => ({
  type: ActionTypes.UTILITIES_FAILED,
  payload: errmes
});
export const addUtilities = (utilities) => ({
  type: ActionTypes.ADD_UTILITIES,
  payload: utilities
});
export const fetchTariffs = () => (dispatch) => {
  $.ajax({
      type: 'GET',
      url: "/tariffs",
      dataType: 'json',
    }).done((data) => {
      dispatch(addTariffs(data));
    }).fail((res) => {
      dispatch(tariffsFailed("Ошибка при чтении тарифов из базы"));
      // this.setState({errors: ["Ошибка при чтении тарифов из базы"]});
    });
    // return fetch('/tariffs',{
    // headers: {
    //   'Content-Type': 'application/json',
    // }}
    // )
    // .then(response => response.json())
    // .then(tariffs => {alert(tariffs[0]); dispatch(addTariffs(tariffs))});
};
export const tariffsLoading = () => ({
  type: ActionTypes.TARIFFS_LOADING
});
export const tariffsFailed = (errmess) => ({
  type: ActionTypes.TARIFFS_FAILED,
  payload: errmess
});
export const addTariffs = (tariffs_categories) => ({
  type: ActionTypes.ADD_TARIFFS,
  payload: tariffs_categories
});
