import "./Angry.css";
import '../BottomNavbar.css';

import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const FoodMenusAngry = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/foodss").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  return (
    <>
      <h2 className="header-angry container-fluid mt-4 fw-bold">Recomended Foods</h2>
      {foodList.map((product) => {
        if (product.bevId === +localStorage.getItem("fp")) {
          return (
            <Container fluid className="menu__box-angry">
              <Link to={`/food-details-angry/${product.id}`}>
                <Row className="list-menu-angry" key={product.id}>
                  <Col md={10} xs={8}>
                    <h4 className="code-name-angry pt-3">{product.name}</h4>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp{product.price}</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img alt={product.name} src={`/img/${product.img1}`} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
              <h4 className="dash-angry"></h4>
              <div className="half-circle"></div>
            </Container>
          );
        }return null;
      })}
    </>
  );
};

export default FoodMenusAngry;