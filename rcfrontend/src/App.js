import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ProductScreen from "./Screens/ProductScreen";
import HomeScreen from "./Screens/HomeScreen";
import React, { useContext } from "react";
import ShopScreen from "./Screens/ShopScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from "./Store";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import CartScreen from "./Screens/CartScreen";
import SigninScreen from "./Screens/SignInScreen";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div id="appDiv" className="bg-black">
        <title>Rex Collectables</title>
        <header>
          <Navbar bg="black" variant="dark">
            <Container>
              <Navbar.Brand>Rex Collectables</Navbar.Brand>
              <Nav>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/shop" className="nav-link">
                  Shop
                </Link>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
