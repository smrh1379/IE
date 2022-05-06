import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import cart_logo from "./scart.jpg";
function Navbar() {
  const Qty = useSelector((state) => state.Qty);
  const Dispatch = useDispatch();
  const sortChangeHandler = (event) => {
    Dispatch({ type: "change_sort", val: event.target.value });
  };
  return (
    <div className="Navbar">
      <div>
        <label className="Navbar__sort__label" htmlFor="sort ">
          Sort By:
        </label>

        <select
          className="Navbar__sort"
          name="sort"
          id="sort"
          onChange={sortChangeHandler}
        >
          <option selected value="Popular">
            Popularity{" "}
          </option>
          <option value="Highest">Highest price</option>
          <option value="Lowest">Lowest price</option>
        </select>
      </div>
      <ul className="Navbar__tabs">
        <Link className="Navbar__link" to={"/categories/All"}>
          <li>AllProducts</li>
        </Link>
        <Link className="Navbar__link" to={"/categories/smartphone"}>
          <li>Smartphones</li>
        </Link>
        <Link className="Navbar__link" to={"/categories/notebook"}>
          <li>Notebooks</li>
        </Link>
        <Link className="Navbar__button__link" to={"/cart"}>
          <button className="Navbar__button">
            <div className="Navbar__button__cart__div">Cart </div>
            <img
              className="Navbar__button__cart__logo"
              src={cart_logo}
              alt="cart-logo"
            />
            <div
              className={
                Qty === 0 ? "Navbar__cart__Qty__zero" : "Navbar__cart__Qty"
              }
            >
              {Qty}
            </div>
          </button>
        </Link>
      </ul>
    </div>
  );
}
export default Navbar;
