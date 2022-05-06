import CartItems from "./cartItems";
import { useSelector } from "react-redux";

import "./Cart.css";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return cart.map((item) => (
    <div className="cart__container">
      <CartItems key={item.id} detail={item} />
    </div>
  ));
};
export default Cart;
