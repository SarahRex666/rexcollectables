import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { Form, Button } from "react-bootstrap";
import { Store } from "../Store";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: cxtDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    cxtDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container">
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              style={{ color: "white" }}
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              style={{ color: "white" }}
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <Button variant="dark" type="submit">
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}
