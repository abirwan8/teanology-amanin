import "./Disgust.css";

import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const TeaMenuDisgust = () => {
  const [bevList, setBevList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/moodbevs/disgust").then((response) => {
      //console.log(response.data);
      setBevList(response.data);
    });
  }, []);
  let currentType = "";

  return (
    <>
      {bevList.map((val, index) => {
        if (val.type !== currentType) {
          currentType = val.type;
          return (
            <Container fluid className="menu__box-disgust" key={currentType}>
              <h3 className="type-menu-disgust">{val.type}</h3>
              <h4 className="dash-disgust"></h4>
              <Link to={`/product-details-disgust/${val.id}`} key={val.id}>
                <Row className="list-menu-disgust">
                  <Col md={10} xs={8}>
                    <h5 className="code-name-disgust">{val.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {val.highlight}
                    </small>
                    <p>{val.ings}</p>
                    <p className="fw-bold">Rp{val.price}</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img alt={val.name} src={`/bev-img/${val.img1}`} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
            </Container>
          );
        } else {
          return (
            <Container fluid className="menu__box-disgust" style={{ boxShadow: "0 !important", marginTop: "-11px", zIndex: "10" }}>
              {index !== 0 && <h4 className="dash-disgust"></h4>}
              <Link to={`/product-details-disgust/${val.id}`} key={val.id}>
                <Row className="list-menu-disgust">
                  <Col md={10} xs={8} >
                    <h5 className="code-name-disgust">{val.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {val.highlight}
                    </small>
                    <p>{val.ings}</p>
                    <p className="fw-bold">Rp{val.price}</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img alt={val.name} src={`/bev-img/${val.img1}`} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
            </Container>
          );
        }
      })}
    </>
  );
};

export default TeaMenuDisgust;