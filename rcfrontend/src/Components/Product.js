import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card bg="dark" text="white" style={{ width: "18rem", height: "27rem" }}>
      <Link to={`/product/${product.slug}`}>
        <Image
          src={product.image}
          className="card-img-top"
          height="250px"
          alt={product.name}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="mt-auto"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
