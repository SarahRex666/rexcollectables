import React, { useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "./CheckoutSteps";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || " ");
  const [address, setAddress] = useState(shippingAddress.address || " ");
  const [city, setCity] = useState(shippingAddress.city || " ");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || " "
  );
  const [country, setCountry] = useState(shippingAddress.country || " ");
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label style={{ color: "white" }}>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label style={{ color: "white" }}>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label style={{ color: "white" }}>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label style={{ color: "white" }}>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label style={{ color: "white" }}>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="dark" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
