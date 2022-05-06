import Cart from "./Cart";
import { useSelector } from "react-redux";
import "./Cart.css";
import { useDispatch } from "react-redux";
function Cartdesign() {
  const Dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const checkoutHandler = () => {
    cart.length === 0
      ? alert("Cart is empty")
      : alert("Checkout was successful");
    Dispatch({ type: cart.length === 0 ? "" : "Checkout" });
  };

  const Tprice = useSelector((state) => state.Tprice);
  return (
    <div className="card__design">
      <Cart />
      <p className="checkout__p">Total: R$ {Tprice.toFixed(2)}</p>
      <button className="checkout__button" onClick={checkoutHandler}>
        checkout
      </button>
    </div>
  );
}

export default Cartdesign;
