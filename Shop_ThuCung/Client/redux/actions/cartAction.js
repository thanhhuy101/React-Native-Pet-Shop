export const Cart = "Cart";
export const RemoveCart = "RemoveCart";

export const CartActions = (id) => {
  return {
    type: Cart,
    payload: id,
  };
};
export const deleteCart = (id,value) => {
  return {
    type: RemoveCart,
    payload: {id,value}
  };
};
