import "./App.css";
import "../components/loginPage/LoginPage.css";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Orbit2 from "../components/loginPage/img/orbit-cover.svg";
import Mascot2 from "../components/loginPage/img/MascotHappy2.png";
import SadMascot from "../components/loginPage/img/sad-mascot.svg";
import Logo from "../components/loginPage/img/Logo.svg";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [showError, setShowError] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedPassword && storedRememberMe) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberMe");
        }
        const id = response.data.id;
        const name = response.data.name;
        const role = response.data.role;
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
        console.log(localStorage.getItem("id", id));
        console.log(localStorage.getItem("name", name));
        console.log(localStorage.getItem("role", role));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
          // Tangkap pesan kesalahan dari respons server jika status 401 (Unauthorized)
          setErrorMessage("Silahkan masukkan email dan password yang valid!");
          setShowErrorModal(true);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
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
              <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton></Modal.Header>
                <div className="d-flex flex-column align-items-center justify-content-center pop-body">
                  <img src={SadMascot} className="fail-mascot"></img>
                  <p className="fw-bold text-center mt-3 text-danger">Oops! Pengguna Tidak Ditemukan</p>
                  <p className="text-center" style={{ marginTop: "-12px" }}>
                    {errorMessage}
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
                <Form.Check className="remember-me" type="checkbox" label="Remember me" checked={rememberMe} onChange={handleRememberMeChange} />
              </Form.Group>
              <button className="button2 fw-bold" type="submit">
                Sign In
              </button>
            </Form>
            <div className="mt-2 text-center">
              <a href="/login-toko" style={{ color: "#539e6d" }}>
                Sign in as Store
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
