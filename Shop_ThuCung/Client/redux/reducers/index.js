import { categoryReducer } from "./categoryReducer";
import { petReducer } from "./petReducer";
import { itemReducer } from "./itemReducer";
import { cartReducer } from "./cartReducer";
import { createStore, combineReducers } from "redux";

export const rootReducer = combineReducers({
  categories: categoryReducer,
  pets: petReducer,
  items: itemReducer,
   cartReducer,
});
