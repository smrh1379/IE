import { useDispatch } from "react-redux";
import "./Cart.css";
import cross from "./xmark.gif";
function CartItems(item) {
  const Dispatch = useDispatch();
  const deleteHandler = (id) => {
    Dispatch({ type: "Delete_From_Cart", payload: { id } });
  };
  return (
    <div className="Cart__items__card">
      <p className="Cart__items__card__qty">Quantity :{item.detail.qty}</p>
      <p className="Cart__items__card__detail">{item.detail.title}</p>
      <p className="Cart__items__card__price">
        {"R$ " + item.detail.price.toFixed(2)}
      </p>
      <button
        className="Cart__items__card__button"
        onClick={() => deleteHandler(item.detail.id)}
      >
        <img className="Cart__items__card__button__cross" src={cross} />
      </button>
    </div>
  );
}

export default CartItems;
