import {
  CREATE_PET,
  UPDATE_PET,
  DELETE_PET,
  GETALL_PET,
  SEARCH_PET,
} from "../actions/petActions";

const initialState = {
  pets: [],
};

export const petReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_PET:
      console.log("GETALL_PET", action.payload);
      return {
        ...state,
        pets: [...action.payload],
      };
    case SEARCH_PET:
      return {
        ...state,
        pets: [...action.payload],
      };
    case CREATE_PET:
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    case UPDATE_PET:
      console.log("UPDATE_PET", action.payload.docId);
      console.log("UPDATE_PET", action.payload);
      return {
        ...state,
      };

    case DELETE_PET:
      return {
        ...state,
        pets: state.pets.filter((x) => x.docId !== action.payload.docId),
      };
    default:
      return { ...state };
  }
};
