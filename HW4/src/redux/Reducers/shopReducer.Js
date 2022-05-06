import data from "../../data.json";
const INITIAL_STATES = {
  products: data.data,
  cart: [],
  Qty: 0,
  Tprice: 0,
};

const shopReducer = (state = INITIAL_STATES, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // const item = state.products.find((prod) => prod.id === action.payload.id);
      // const inCart = state.cart.find((item) =>
      //   item.id === action.payload.id ? true : false
      // );
      return { Qty: state.Qty + 1 };

    default:
      return state;
  }
};

export default shopReducer;
