import * as ActionTypes from './actionTypes';

// var utilities = [];
// const node = document.getElementById('utilities_data');
// if(node){
//   utilities = JSON.parse(node.getAttribute('utilities'));
// }

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
export const addUtility = (utility) => ({
  type:ActionTypes.ADD_UTILITY,
  payload: utility
});
export const postUtility = (flatId, utility) => (dispatch) => {
  const newUtility = {
    flatId: flatId,
    utility: utility
  };
  $.ajax({
      type: 'POST',
      dataType: 'json',
      data: {flat_id: flatId, utility: {category_id: utility.categoryId, tariff_id: utility.tariffId, description: utility.description, start_value_counter: utility.startCounterValue }},
      }).done((data) => {
        dispatch(addUtility(data.utility));
      }).fail((res) => {
        this.setState({errors: ["Ошибка записи в базу"]});
      });
};
export const fetchUtilities = (flatId) => (dispatch) => {
  dispatch(utilitiesLoading(true));

  $.ajax({
      type: 'GET',
      url: '/flats/'+flatId+'/utilities',
      dataType: 'json',
    }).done((data) => {
      dispatch(addUtilities(data));
    }).fail((res) => {
      dispatch(tariffsFailed("Ошибка при чтении услуг из базы"));
    });
};
export const utilitiesLoading = () => ({
  type: ActionTypes.UTILITIES_LOADING
});
export const utilitiesFailed = (errmes) => ({
  type: ActionTypes.UTILITIES_FAILED,
  payload: errmes
});
export const addUtilities = (data) => ({
  type: ActionTypes.ADD_UTILITIES,
  payload: {utilities: data.utilities, categories: data.categories, tariffs: data.tariffs}
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
    // return fetch('http://localhost:3000/tariffs',{
  // method: 'POST', // or 'PUT'
  // headers: {
    // 'Content-Type': 'application/json',
  // }
  // body: JSON.stringify(data),
// })
    // .then(response => response.json())
    // .then(tariffs => {alert(tariffs[0]); //dispatch(addTariffs(tariffs))
    // });
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
