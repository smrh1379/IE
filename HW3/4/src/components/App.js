import React from "react";
import Movies from "./Movies";
import NotFound from "./NotFound";
import MovieDetail from "./MovieDetail";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <Movies />
        </Route>
        <Route path="/movies/:id" component={MovieDetail} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
