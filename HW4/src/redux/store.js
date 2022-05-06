import reactRouterDom from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import data from "../data.json";
const initial = data.data;
const shopReducer = (
  state = { products: data.data, cart: [], Qty: 0, Tprice: 0 },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.products.find(
        (prod) => prod.id === parseInt(action.payload.id)
      );
      const inCart = state.cart.find((item) =>
        item.id === parseInt(action.payload.id) ? true : false
      );
      return {
        ...state,
        Qty: state.Qty + 1,
        Tprice: state.Tprice + item.price,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === parseInt(action.payload.id)
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case "Delete_From_Cart":
      const delItem = state.cart.find(
        (prod) => prod.id === parseInt(action.payload.id)
      );
      console.log(state.cart);
      return {
        ...state,
        cart: state.cart.filter(
          (prod) => prod.id !== parseInt(action.payload.id)
        ),
        Qty: state.Qty - delItem.qty,
        Tprice: state.Tprice - delItem.qty * delItem.price,
      };
    case "Checkout":
      return {
        ...state,
        cart: [],
        Qty: 0,
        Tprice: 0,
      };
    case "change_sort":
      if (action.val === "Popular") {
        return {
          ...state,
          products: initial,
        };
      }
      if (action.val === "Highest") {
        return {
          ...state,
          products: [...initial].sort((item1, item2) => {
            return item2.price - item1.price;
          }),
        };
      }
      if (action.val === "Lowest") {
        return {
          ...state,
          products: [...initial].sort((item1, item2) => {
            return item1.price - item2.price;
          }),
        };
      }
    // case "Rating_changed":
    //   const items = state.products.find(
    //     (prod) => prod.id === parseInt(action.payload.id)
    //   );
    //   const rate = action.payload.value;
    //   return {
    //     ...state,
    //     products: state.products.map((item) =>
    //       item.id === parseInt(action.payload.id)
    //         ? { ...items, rating: rate }
    //         : items
    //     ),
    //   };
    default:
      return state;
  }
};
const store = createStore(shopReducer, composeWithDevTools());
export default store;
