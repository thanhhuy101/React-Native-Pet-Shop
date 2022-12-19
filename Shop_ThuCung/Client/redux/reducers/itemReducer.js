import {
  GETALL_ITEM,
  SEARCH_ITEM,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "../actions/itemActions";

const initialState = {
  items: [],
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_ITEM:
      return {
        ...state,
        items: [...action.payload],
      };
    case SEARCH_ITEM:
      return {
        ...state,
        items: [...action.payload],
      };
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      console.log("UPDATE_ITEM-->id", action.payload.docId);
      console.log("UPDATE_ITEM-->item", action.payload);
      return {
        ...state,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((x) => x.docId !== action.payload.docId),
      };
    default:
      return { ...state };
  }
};
