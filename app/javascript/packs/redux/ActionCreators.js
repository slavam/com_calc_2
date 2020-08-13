import * as ActionTypes from './actionTypes';

// export const baseUrl = 'http://127.0.0.1:3000/';
export const baseUrl = 'http://127.0.0.1:3001/';

export const getCategory = (categoryId) => ({
  type: ActionTypes.GET_CATEGORY,
  categoryId: categoryId
});
export const addUtility = (utility) => ({
  type:ActionTypes.ADD_UTILITY,
  payload: utility
});
export const removeUtility = (flatId, utilityId) => dispatch => {
  return fetch(baseUrl + 'flats/'+flatId+'/utilities/'+utilityId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    })
  .then(alert('Услуга удалена'))
  .catch(error =>  { console.log('delete utilities', error.message); alert('Your utility could not be deleted\nError: '+error.message); });
};
export const postUtility = (flatId, utility) => dispatch => {
  return fetch(baseUrl + 'flats/'+flatId+'/utilities/', {
    method: "POST",
    body: JSON.stringify({flat_id: flatId, utility: {category_id: utility.category.value, tariff_id: utility.tariff.value, description: utility.description, start_value_counter: utility.startCounterValue }}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addUtility(response.utility)))
  .catch(error =>  { console.log('post utilities', error.message); alert('Your utility could not be posted\nError: '+error.message); });
};
export const fetchAccounts = (flatId) => (dispatch) => {
  dispatch(accountsLoading(true));

  return fetch(baseUrl + 'flats/'+flatId+'/accounts')
    .then(response => response.json())
    .then(data => dispatch(addAccounts(data)));
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
export const addAccount = (account) => ({
  type: ActionTypes.ADD_ACCOUNT,
  payload: account
});
export const postAccount = (flatId, accountParams) => (dispatch) => {
  return fetch(baseUrl + 'flats/'+flatId+'/accounts/', {
    method: "POST",
    body: JSON.stringify({account_data: 
      { total: accountParams.total,
        monthsNumber: accountParams.monthsNumber,
        startDate: accountParams.startDate,
        utilityParams: accountParams.utilityParams}}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    throw error;
  })
  .then(response => response.json())
  .then(response => dispatch(addAccount(response.account)))
  .catch(error =>  { console.log('post accounts', error.message); alert('Your account could not be posted\nError: '+error.message); });
};
export const addFlat = (flat) => ({
  type: ActionTypes.ADD_FLAT,
  payload: flat
})
export const postFlat = (flatParams) => dispatch => {
  return fetch(baseUrl + 'flats/', {
    method: "POST",
    body: JSON.stringify({ flat: flatParams}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
    throw error;
  })
  .then(response => response.json())
  .then(response => dispatch(addFlat(response.flat)))
  .catch(error =>  { console.log('post flat', error.message); alert('Your flat could not be posted\nError: '+error.message); });
}
export const setValueCounter = (utilityIndex, valueCounter, tariff) => ({
  type: ActionTypes.SET_VALUE_COUNTER,
  utilityIndex: utilityIndex,
  valueCounter: valueCounter,
  tariff: tariff
});
export const fetchUtilities = (flatId) => (dispatch) => {
  dispatch(utilitiesLoading(true));

  return fetch(baseUrl + 'flats/'+flatId+'/utilities')
    .then(response => response.json())
    .then(data => dispatch(addUtilities(data)));
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
  dispatch(tariffsLoading(true));

  return fetch(baseUrl + 'tariffs')
    .then(response => response.json())
    .then(data => dispatch(addTariffs(data)));
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
export const fetchCategories = () => dispatch => {
  dispatch(categoriesLoading(true));
  return fetch(baseUrl + 'categories')
    .then(response => response.json())
    .then(data => dispatch(addCategories(data)));
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
  dispatch(flatsLoading(true));
  return fetch(baseUrl + 'users/'+userId)
    .then(response => response.json())
    .then(data => dispatch(addFlats(data)));
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
export const fetchPayments = (flatId, accountId) => dispatch => {
  dispatch(paymentsLoading(true));

  return fetch(baseUrl + 'flats/'+flatId+'/accounts/'+accountId)
    .then(response => response.json())
    .then(data => dispatch(addPayments(data)));
};
export const paymentsLoading = () => ({
  type: ActionTypes.PAYMENTS_LOADING
});
export const paymentsFailed = (errmess) => ({
  type: ActionTypes.PAYMENTS_FAILED,
  payload: errmess
});
export const addPayments = (data) => ({
  type: ActionTypes.ADD_PAYMENTS,
  payload: data
});
export const removeFlat = (flatId) => dispatch => {
  return fetch(baseUrl + 'flats/'+flatId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    })
  .then(alert('Жилье удалено с услугами и счетами'))
  .catch(error =>  { console.log('delete flat', error.message); alert('Your flat could not be deleted\nError: '+error.message); });
};
export const removeAccount = (flatId, accountId) => dispatch => {
  return fetch(baseUrl + 'flats/'+flatId+'/accounts/'+accountId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    })
  .then(alert('Счет удален'))
  .catch(error =>  { console.log('delete account', error.message); alert('Your account could not be deleted\nError: '+error.message); });
};