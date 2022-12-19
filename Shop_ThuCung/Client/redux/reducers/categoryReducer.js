import {
  GETALL_CATEGORY,
  SEARCH_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/categoryActions";

const initialState = {
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_CATEGORY:
      return {
        ...state,
        categories: [...action.payload],
      };
    case SEARCH_CATEGORY:
      return {
        ...state,
        categories: [...action.payload],
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (x) => x.docId !== action.payload.docId
        ),
      };
    default:
      return { ...state };
  }
};
