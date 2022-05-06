import "./App.css";
import Card_detail from "./components/Card_detail";
import Navbar from "./navbar/Navbar";
import Main from "./Main";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Cartdesign from "./components/cart/Cartdesign";
import { Redirect } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={"/"}>
            <Redirect to={"/categories/All"} />
          </Route>
          <Route exact path={"/categories/:category"}>
            <Main />
          </Route>
          <Route exact path={"/products/:id"}>
            <div className="card__detail">
              <Card_detail />
            </div>
          </Route>
          <Route exact path={"/cart"}>
            <Cartdesign />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    // <div>
    //   <Navbar />

    // </div>
  );
}
export default App;
