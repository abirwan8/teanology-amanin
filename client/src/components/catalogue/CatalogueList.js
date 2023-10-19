import "./Catalogue.css";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const CatalogueList = () => {

  const [bevList, setBevList] = useState([]);
  
  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      //console.log(response.data);
      setBevList(response.data);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    });
  }, []);

  let currentType = "";

  return (
    <>
    <h2 className="header container-fluid mt-2 fw-bold">Our Catalogue</h2>
      {bevList.map((val, index) => {
        if (val.type !== currentType) {
          currentType = val.type;
          return (
            <Container fluid className="menu__box-green" key={currentType}>
              <h3 className="type-menu-green">{val.type}</h3>
              <h4 className="dash-green" aria-hidden="true"></h4>
              <Link to={`/product-details-catalogue/${val.id}`} key={val.id}>
                <Row className="list-menu-green">
                  <Col md={10} xs={8}>
                    <h5 className="code-name-green">{val.name}</h5>
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
            <Container fluid className="menu__box-green" style={{ boxShadow: "0 !important", marginTop: "-11px", zIndex: "10" }}>
              {index !== 0 && <h4 className="dash-green" aria-hidden="true"></h4>}
              <Link to={`/product-details-catalogue/${val.id}`} key={val.id}>
                <Row className="list-menu-green" key={val.id}>
                  <Col md={10} xs={8}>
                    <h5 className="code-name-green">{val.name}</h5>
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

export default CatalogueList;