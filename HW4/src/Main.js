import React from "react";
import Card from "./components/Card";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Main() {
  const params = useParams();
  const products = useSelector((state) => state.products);

  if (params.category === "All") {
    return (
      <div className="Page">
        {products.map((item) => (
          <Card key={item.id} detail={item} />
        ))}
      </div>
    );
  }
  if (params.category === "smartphone") {
    return (
      <div className="Page">
        {products
          .filter((item) => item.category === params.category)
          .map((item) => (
            <Card key={item.id} detail={item} />
          ))}
      </div>
    );
  }
  if (params.category === "notebook") {
    return (
      <div className="Page">
        {products
          .filter((item) => item.category === params.category)
          .map((item) => (
            <Card key={item.id} detail={item} />
          ))}
      </div>
    );
  }
}
export default Main;
