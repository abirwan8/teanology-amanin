import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./TopBar.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Figure from "react-bootstrap/Figure";
import Dropdown from "react-bootstrap/Dropdown";
import Axios from "axios";

import pic from "./assets/Picture.png";
import profil from "./assets/profil.svg";
import onetwo from "./assets/one-two.svg";
import faq from "./assets/faq.svg";

const TopBar1 = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [toko, setToko] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/toko").then((response) => {
      //console.log(response.data);
      setToko(response.data);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="pt-3">
          <Col xs={10} md={11}>
            <InputGroup className="res-topbar_left search__bar">
              <InputGroup.Text className="search__bar search__left">
                <i className="bi bi-search fs-6 text-secondary"></i>
              </InputGroup.Text>
              <Form.Control placeholder="Search Tea/Mood" type="search" className="search__bar search__center" />
              <InputGroup.Text className="search__bar search__right">
                <i className="bi bi-filter-left fs-4"></i>
              </InputGroup.Text>
            </InputGroup>
          </Col>

          <Col xs={2} md={1}>
            <a href="#" onClick={handleShow}>
              <i className="bi bi-list fs-3 float-end text-dark res-topbar_right"></i>
            </a>
          </Col>
        </Row>
      </Container>

      <Offcanvas className="side" show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Figure>
            <Figure.Image width={140} height={140} alt="171x180" src={pic} style={{ borderRadius: "50%", marginLeft: "110px" }} />
          </Figure>
          <ul style={{ listStyle: "none" }}>
            <li className="mt-4 " href="#">
              <a>
                <i class="bi bi-shop-window me-1 fs-4" style={{ color: "#539e6d" }}></i>
                <span style={{ marginLeft: "12px" }}>{localStorage.getItem("name_toko")}</span>
              </a>
            </li>
            <li className="mt-4">
              <a href="#">
                <img alt="mt-profil" src={profil} style={{ width: "28px" }} />
                <span style={{ marginLeft: "12px" }}>About Us</span>
              </a>
            </li>
            <li className="mt-4">
              <a href="#">
                <img alt="mt-onetwo" src={onetwo} style={{ width: "25px" }} />
                <span style={{ marginLeft: "12px" }}>One Two Tea!</span>
              </a>
            </li>
            <li className="mt-4">
              <a href="#">
                <img alt="mt-faq" src={faq} style={{ width: "28px" }} />
                <span style={{ marginLeft: "12px" }}>FaQ</span>
              </a>
            </li>
            <Dropdown className="mt-2" style={{ marginLeft: "-12px" }}>
              <Dropdown.Toggle className="button-user fw-bold" variant="transparent" id="dropdown-basic">
                <i class="bi bi-shop-window me-3 fs-4" style={{ color: "#539e6d" }}></i>
                Nama Toko
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ border: "1px solid #539e6d" }}>
                {toko.map((val) => (
                  <Dropdown.Item key={val.id} className="ms-3 fs-6">
                    {val.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <a href="/login-page">
            <div className="d-flex justify-content-center">
              <button className="btn btn-login">Sign in</button>
            </div>
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

function SideBar() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <TopBar1 key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default SideBar;
