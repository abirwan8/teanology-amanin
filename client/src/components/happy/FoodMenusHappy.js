import "./Happy.css";
import '../BottomNavbar.css';

import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from '../../config.js';

const FoodMenusHappy = () => {
  const [foodList, setFoodList] = useState([]);
  const tokoId = localStorage.getItem("id_toko");

  useEffect(() => {
    Axios.get(`${BASE_URL}/foodss/${tokoId}`).then((response) => {
      setFoodList(response.data);
    });
  }, []);

  return (
    <Container fluid className="menu__box-happy mt-4">
      {foodList.map((product) => {
        if (!product.isHidden && product.bevId === +localStorage.getItem("fp")) {
          return (
            <React.Fragment key={product.id}>
              <Link to={`/food-details-happy/${product.id}`}>
                <Row className="list-menu-happy">
                  <Col md={10} xs={8}>
                    <h4 className="code-name-happy pt-3">{product.name}</h4>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp{product.price}</p>
                  </Col>
                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img
                        alt={product.name}
                        src={`${BASE_URL}/${product.img1}`}
                        width={"88px"}
                        height={"88px"}
                        className="float-end"
                        style={{ borderRadius: "20px" }}
                      ></img>
                    </div>
                  </Col>
                </Row>
              </Link>
              <h4 className="dash-happy"></h4>
              <div className="half-circle"></div>
            </React.Fragment>
          );
        }
        return null;
      })}
    </Container>
  );
};

export default FoodMenusHappy;