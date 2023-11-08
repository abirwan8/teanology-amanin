import "bootstrap/dist/css/bootstrap.min.css";
import "../components/BottomNavbar.css";
import "../components/home/HomeStyle.css";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";

// Import Components
import TopBar from "../components/TopBar1";
import BottomNavbar from "../components/home/BottomNavbar_Home";

// Import Assets
import MascotOrbit from "../components/home/img/mascot-orbit.svg";
import Angry from "../components/home/icon-mood/Icon-Angry.svg";
import Disgust from "../components/home/icon-mood/Icon-Disgust.svg";
import Fear from "../components/home/icon-mood/Icon-Fear.svg";
import Happy from "../components/home/icon-mood/Icon-Happy.svg";
import Neutral from "../components/home/icon-mood/Icon-Neutral.svg";
import Sad from "../components/home/icon-mood/Icon-Sad.svg";
import Surprised from "../components/home/icon-mood/Icon-Surprised.svg";

const Home = () => {
  const SectionStyle = {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden"
  };

  return (
    <>
      <div style={SectionStyle}>
        <TopBar />
          <div className="wrap-content">
          <img  className="mascot-orbit" src={MascotOrbit} alt="MascotOrbit"></img>
            <Row>
              <p className="greenbody">What do you want to eat?</p>
              <p className="yellowheading">Choose your mood!</p>

              <Container fluid className="mood-chooser">
                <Row>
                  <Col xs={2} sm={3} md={2}>
                    <a href="happy">
                        <img src={Happy} alt="happy"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.4em" }}>Happy</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="angry">
                      <img src={Angry} alt="angry"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.5em" }}>Angry</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="fear">
                      <img src={Fear} alt="fear"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.8em" }}>Fear</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="sad">
                      <img src={Sad} alt="sad"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "2em" }}>Sad</p>
                    </a>
                  </Col>
                  <Col md={4}></Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="disgust">
                      <img src={Disgust} alt="disgust"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.1em" }}>Disgust</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="surprise">
                      <img src={Surprised} alt="surprise"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "0.5em" }}>Surprised</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="neutral">
                      <img src={Neutral} alt="neutral"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.1em" }}>Neutral</p>
                    </a>
                  </Col>
                </Row>
              </Container>
            </Row>
          </div>
        </div>
      <BottomNavbar />
    </>
  );
};

export default Home;