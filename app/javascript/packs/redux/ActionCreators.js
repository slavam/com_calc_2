import * as ActionTypes from './actionTypes';

export const getCategory = (categoryId) => ({
  type: ActionTypes.GET_CATEGORY,
  categoryId: categoryId
});
export const addAccount = (account) => ({
  type: ActionTypes.ADD_ACCOUNT,
  payload: account
});
export const postAccount = (flatId, accountParams) => (dispath) => {
  $.ajax({
      type: 'POST',
      url: "/flats/"+flatId+"/accounts/",
      dataType: 'json',
      data: {account_data: {total: accountParams.total,
                            monthsNumber: accountParams.monthsNumber,
                            startDate: accountParams.startDate,
                            utilityParams: accountParams.utilityParams}},
      }).done((data) => {
        dispatch(addAccount(data.account));
      }).fail((res) => {
        // dispatch(accountFailed("Ошибка при записи счета в базу"));
      });
};
export const addUtility = (utility) => ({
  type:ActionTypes.ADD_UTILITY,
  payload: utility
});
export const postUtility = (flatId, utility) => (dispatch) => {
  // const newUtility = {
  //   flatId: flatId,
  //   utility: utility
  // };
  $.ajax({
      type: 'POST',
      url: "/flats/"+flatId+"/utilities/",
      dataType: 'json',
      data: {flat_id: flatId, utility: {category_id: utility.category.value, tariff_id: utility.tariff.value, description: utility.description, start_value_counter: utility.startCounterValue }},
      }).done((data) => {
        dispatch(addUtility(data.utility));
      }).fail((res) => {
        this.setState({errors: ["Ошибка записи в базу"]});
      });
};
export const fetchAccounts = (flatId) => (dispatch) => {
  dispatch(accountsLoading(true));

  $.ajax({
      type: 'GET',
      url: '/flats/'+flatId+'/accounts',
      dataType: 'json',
    }).done((data) => {
      dispatch(addAccounts(data));
    }).fail((res) => {
      dispatch(accountsFailed("Ошибка при чтении счетов из базы"));
    });
};
export const accountsLoading = () => ({
  type: ActionTypes.ACCOUNTS_LOADING
});
export const accountsFailed = (errmes) => ({
  type: ActionTypes.ACCOUNTS_FAILED,
  payload: errmes
});
export const addAccounts = (data) => ({
  type: ActionTypes.ADD_ACCOUNTS,
  payload: {
    accounts: data.accounts,
    utilityParams: data.utility_params,
    tariffLimits: data.tariff_limits,
    total: data.total,
    flatId: data.flat_id,
    userId: data.user_id
  }
});
export const fetchUtilities = (flatId) => (dispatch) => {
  dispatch(utilitiesLoading(true));

  $.ajax({
      type: 'GET',
      url: '/flats/'+flatId+'/utilities',
      dataType: 'json',
    }).done((data) => {
      dispatch(addUtilities(data));
    }).fail((res) => {
      dispatch(utilitiesFailed("Ошибка при чтении услуг из базы"));
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
  payload: {utilities: data.utilities, categories: data.categories, tariffs: data.tariffs, flatId: data.flat_id, userId: data.user_id}
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
export const fetchCategories = () => (dispatch) => {
  $.ajax({
      type: 'GET',
      url: "/categories",
      dataType: 'json',
    }).done((data) => {
      dispatch(addCategories(data));
    }).fail((res) => {
      dispatch(tariffsFailed("Ошибка при чтении категорий из базы"));
    });
};
export const categoriesLoading = () => ({
  type: ActionTypes.CATEGORIES_LOADING
});
export const categoriesFailed = (errmess) => ({
  type: ActionTypes.CATEGORIES_FAILED,
  payload: errmess
});
export const addCategories = (categories) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categories
});

export const fetchFlats = (userId) => (dispatch) => {
  $.ajax({
      type: 'GET',
      // url: `/users/${userId}`,
      url: userId,
      dataType: 'json',
    }).done((data) => {
      dispatch(addFlats(data));
    }).fail((res) => {
      dispatch(flatsFailed("Ошибка при чтении данных пользователя из базы"));
    });
};
export const flatsLoading = () => ({
  type: ActionTypes.FLATS_LOADING
});
export const flatsFailed = (errmess) => ({
  type: ActionTypes.FLATS_FAILED,
  payload: errmess
});
export const addFlats = (data) => ({
  type: ActionTypes.ADD_FLATS,
  payload: data
});
