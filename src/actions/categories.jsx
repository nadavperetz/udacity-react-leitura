import {fetchCategories} from "../utils/api";

export const GOT_CATEGORIES = 'GOT_CATEGORIES'
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

export function getCategories () {
  return (dispatch) => {
    fetchCategories().then((categories) =>
      dispatch(gotCategories(categories.categories)));
  }
}
export const gotCategories = (categories) => {
  return {
    type: GOT_CATEGORIES,
    categories
  }
};


