import { GET_CATEGORY, ALL_CATEGORIES, ALL_TARIFFS, UTILITIES_BY_FLAT } from './actionTypes'

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

export const getUtilities = utilities => ({
  type: UTILITIES_BY_FLAT,
  payload: {utilities}
})
// export const getTariffsByCat = tariffs => ({
//   type: TARIFFS_BY_CAT,
//   payload: {tariffsByCat: tariffs}
// })

// ... other actions
