import { Cart, RemoveCart } from "../actions/cartAction";

const initialState = {
  carts: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Cart: {
      let dsupdate = [...state.carts];

      let index = dsupdate.findIndex((item) => item.id === action.payload.id);
      if (index) {
        dsupdate.push(action.payload);
      }
      state.carts = dsupdate;
      return { ...state };
    }
    case RemoveCart: {
      let dsupdate = [...state.carts];

      let index = dsupdate.findIndex(
        (item) => item.docId === action.payload.id
      );
      if (index != -1) {
        dsupdate.splice(index, 1);
      }
      state.carts = dsupdate;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
