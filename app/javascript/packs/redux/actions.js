import { GET_CATEGORY, ALL_CATEGORIES, ALL_TARIFFS } from './actionTypes'

export const getCategory = categoryId => ({
  type: GET_CATEGORY,
  categoryId
})

export const allCategories = categories => ({
  type: ALL_CATEGORIES,
  payload: {categories}
})

export const allTariffs = tariffs => ({
  type: ALL_TARIFFS,
  payload: {tariffs}
})

// export const getTariffsByCat = tariffs => ({
//   type: TARIFFS_BY_CAT,
//   payload: {tariffsByCat: tariffs}
// })

// ... other actions
