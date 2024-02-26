import "./App.css";
import "../components/loginPage/LoginPage.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from '../config.js';

import Orbit2 from "../components/loginPage/img/orbit-cover.svg";
import Mascot2 from "../components/loginPage/img/MascotHappy2.png";
import SadMascot from "../components/loginPage/img/sad-mascot.svg";
import Logo from "../components/loginPage/img/Logo.svg";

function LoginTokoPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMeToko, setRememberMeToko] = useState(false);
  const [errorMessageToko, setErrorMessageToko] = useState("");
  const [showErrorModalToko, setShowErrorModalToko] = useState(false);
  // const [showError, setShowError] = useState(false);

  useEffect(() => {
    const tokoId = localStorage.getItem("id_toko");
    const tokoRole = localStorage.getItem("role_toko");

    if (tokoId) {
        if (tokoRole === "Toko") {
            navigate("/login-page");
        } else if (tokoRole === "AdminToko") {
            navigate("/toko-admin");
        }
    }
}, []);


  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmailToko");
    const storedPassword = localStorage.getItem("rememberedPasswordToko");
    const storedRememberMeToko = localStorage.getItem("rememberMeToko");

    if (storedEmail && storedPassword && storedRememberMeToko) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMeToko(true);
    }
  }, []);

  const handleLogin = () => {
    Axios.post(`${BASE_URL}/logintoko`, {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        if (rememberMeToko) {
          localStorage.setItem("rememberedEmailToko", email);
          localStorage.setItem("rememberedPasswordToko", password);
          localStorage.setItem("rememberMeToko", true);
        } else {
          localStorage.removeItem("rememberedEmailToko");
          localStorage.removeItem("rememberedPasswordToko");
          localStorage.removeItem("rememberMeToko");
        }
        const id = response.data.id;
        const name = response.data.name;
        const role = response.data.role;
        localStorage.setItem("id_toko", id);
        localStorage.setItem("name_toko", name);
        localStorage.setItem("role_toko", role);
        console.log("lokal" + localStorage.getItem("id_toko", id));
        console.log("lokal" + localStorage.getItem("name_toko", name));
        console.log("lokal" + localStorage.getItem("role_toko", role));
        if (role === 'Toko') {
          navigate("/login-page");
      } else if (role === 'AdminToko') {
          navigate("/toko-admin");
      }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          // Tangkap pesan kesalahan dari respons server jika status 401 (Unauthorized)
          setErrorMessageToko("Silahkan masukkan email dan password yang valid!");
          setShowErrorModalToko(true);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };
  const handleRememberMeChange = () => {
    setRememberMeToko(!rememberMeToko);
  };

  return (
    <div className="box">
      <Row>
        <Col md={6}>
          <img src={Orbit2} alt="bg-cover" className="bg-cover"></img>
          <img src={Mascot2} alt="mascot-cover" className="mascot-cover"></img>
        </Col>
        <Col md={6}>
          <img className="logo float-end" src={Logo} alt="logo-teanology" />
          <div className="login-box float-end">
            <p className="heading">Welcome Back..</p>
            <p className="sub">Please enter your email and password!</p>
            <Form onSubmit={handleSubmit}>
              <Modal show={showErrorModalToko} onHide={() => setShowErrorModalToko(false)}>
                <Modal.Header closeButton></Modal.Header>
                <div className="d-flex flex-column align-items-center justify-content-center pop-body">
                  <img src={SadMascot} className="fail-mascot"></img>
                  <p className="fw-bold text-center mt-3 text-danger">Oops! Pengguna Tidak Ditemukan</p>
                  <p className="text-center" style={{ marginTop: "-12px" }}>
                    {errorMessageToko}
                  </p>
                </div>
              </Modal>

              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1">
                  <i className="bi bi-person fs-5 text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  className="login-form"
                  placeholder="Enter your email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </InputGroup>

              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1">
                  <i className="bi bi-lock fs-5 text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  className="login-form"
                  placeholder="Enter your password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </InputGroup>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check className="remember-me" type="checkbox" label="Remember me" checked={rememberMeToko} onChange={handleRememberMeChange} />
              </Form.Group>
              <button className="button2 fw-bold" type="submit">
                Sign In
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginTokoPage;
