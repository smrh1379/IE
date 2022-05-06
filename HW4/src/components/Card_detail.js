import React from "react";
import "./Card_detail.css";
import cart_logo from "./scart.jpg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "react-hooks-use-modal";
import ReactStars from "react-rating-stars-component";
function Card_detail(props) {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const params = useParams();
  const prod = useSelector((state) => state.products);
  const Dispatch = useDispatch();
  const [rate, rateHandler] = useState(false);
  const addtocartHandler = (id) => {
    Dispatch({ type: "ADD_TO_CART", payload: { id } });
  };
  const ratingChangerHandler = (newRating) => {
    // Dispatch({
    //   type: "Rating_changed",
    //   payload: { id: parseInt(params.id), value: newRating },
    // });
    rateHandler(true);
    console.log(newRating);
  };
  return (
    <div className="card__detail__Container">
      <Modal>
        <div className="card__detail__modal">
          <h3>Details</h3>
          <p className="card__detail__modal_p">
            {prod.find((item) => item.id === parseInt(params.id)).detail}
          </p>
          <button className="card__detail__modal__button" onClick={close}>
            Close
          </button>
        </div>
      </Modal>
      <div className="card__detail__img_rating__container">
        <img
          className="card__detail__img"
          src={prod.find((item) => item.id === parseInt(params.id)).img}
        />
        <div className="card__detail__rating">
          <ReactStars
            count={5}
            onChange={ratingChangerHandler}
            size={45}
            activeColor="#ffd700"
          />
        </div>
        <p className={rate ? "rate__true" : "rate__false"}>1 reviews.</p>
      </div>

      <div className="card__detail__info">
        <p className="detail_p1">
          {prod.find((item) => item.id === parseInt(params.id)).title}
        </p>
        <p className="card__detail__price">
          R${" "}
          {prod
            .find((item) => item.id === parseInt(params.id))
            .price.toFixed(2)}
        </p>
        <button
          className="button__Atc"
          onClick={() => addtocartHandler(params.id)}
        >
          <p>Buy Now</p>
          <img
            className="Navbar__button__cart__logo"
            src={cart_logo}
            alt="cart-logo"
          />
        </button>
        <button className="button__Mi" onClick={open}>
          More info
        </button>
      </div>
    </div>
  );
}

export default Card_detail;
