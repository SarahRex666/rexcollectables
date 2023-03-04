import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Update Successful!");
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Container>
        <h1 style={{ color: "white" }} className="my-3">
          User Profile
        </h1>
        <Container style={{ width: "50%" }}>
          <form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label style={{ color: "white" }}>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label style={{ color: "white" }} className="pt-2">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label style={{ color: "white" }} className="pt-2">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label style={{ color: "white" }} className="pt-2">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <div className="mt-3">
              <Button variant="dark" type="submit">
                Update
              </Button>
            </div>
          </form>
        </Container>
      </Container>
    </div>
  );
}
