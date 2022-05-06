import React from "react";
import "./Card.css";
import cart_logo from "./scart.jpg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Card(props) {
  const Dispatch = useDispatch();
  const addtocartHandler = (id) => {
    Dispatch({ type: "ADD_TO_CART", payload: { id } });
  };

  return (
    <div className="container">
      <img className="card__img" src={props.detail.img} />
      <Link className="card__link" to={"/products/" + props.detail.id}>
        <p className="p1">{props.detail.title}</p>
      </Link>
      <div className="price__size">
        <p> R$ {props.detail.price.toFixed(2)}</p>
        <p> {props.detail.size}</p>
      </div>
      <button
        className="card__button"
        onClick={() => addtocartHandler(props.detail.id)}
      >
        <div>Add to Cart</div>
        <img
          className="card__button__cart__logo"
          src={cart_logo}
          alt="cart-logo"
        />
      </button>
    </div>
  );
}

export default Card;
