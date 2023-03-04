import React from "react";
import { Col, Image } from "react-bootstrap";

function HomeScreen() {
  return (
    <div>
      <Col sm={2} className="m-auto">
        <Image
          src="https://i.ibb.co/XJq5fvp/rex-2.png"
          className="rounded my-auto d-block"
        />
      </Col>
    </div>
  );
}
export default HomeScreen;
