import "bootstrap/dist/css/bootstrap.min.css";
import "../components/BottomNavbar.css";
import "../components/home/HomeStyle.css";
import React, { useState, useEffect } from "react";
import * as faceapi from 'face-api.js';
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

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

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]);
  }
  
  const scanImage = async (imageUrl) => {
    await loadModels(); // Pastikan model dimuat sebelum melakukan pemindaian
    const img = await faceapi.fetchImage(imageUrl);
    const detections = await faceapi.detectAllFaces(img).withFaceExpressions();
    // Lakukan sesuatu dengan hasil deteksi (misalnya, tampilkan di konsol)
    console.log(detections);
  }
  
  useEffect(() => {
    // Contoh pemindaian gambar saat komponen dimuat
    // Ganti URL dengan URL gambar .png yang valid
    const imageUrl = 'image/image.png';
    scanImage(imageUrl);
  }, []);

  const [clickHappy, setClickHappy] = useState(0);
  const [clickAngry, setClickAngry] = useState(0);
  const [clickFear, setClickFear] = useState(0);
  const [clickSad, setClickSad] = useState(0);
  const [clickDisgust, setClickDisgust] = useState(0);
  const [clickSurprise, setClickSurprise] = useState(0);
  const [clickNeutral, setClickNeutral] = useState(0);
  const tokoId = localStorage.getItem("id_toko");

  const handleHappyClick = () => {
    axios.post('http://localhost:5000/stats/click-happy', { tokoId: tokoId })
      .then(response => {
        const { clickHappy, clickAngry, clickFear, clickSad, clickDisgust, clickSurprise, clickNeutral } = response.data;
        // Di sini Anda dapat memperbarui nilai-nilai state Anda sesuai dengan respons yang diterima
        setClickHappy(clickHappy);
        setClickAngry(clickAngry);
        setClickFear(clickFear);
        setClickSad(clickSad);
        setClickDisgust(clickDisgust);
        setClickSurprise(clickSurprise);
        setClickNeutral(clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };
  
  const handleAngryClick = () => {
    axios.post('http://localhost:5000/stats/click-angry', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };

  const handleFearClick = () => {
    axios.post('http://localhost:5000/stats/click-fear', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };

  const handleSadClick = () => {
    axios.post('http://localhost:5000/stats/click-sad', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };

  const handleDisgustClick = () => {
    axios.post('http://localhost:5000/stats/click-disgust', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };

  const handleSurpriseClick = () => {
    axios.post('http://localhost:5000/stats/click-surprise', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
  };

  const handleNeutralClick = () => {
    axios.post('http://localhost:5000/stats/click-neutral', { tokoId: tokoId })
      .then(response => {
        setClickHappy(response.data.clickHappy);
        setClickAngry(response.data.clickAngry);
        setClickFear(response.data.clickFear);
        setClickSad(response.data.clickSad);
        setClickDisgust(response.data.clickDisgust);
        setClickSurprise(response.data.clickSurprise);
        setClickNeutral(response.data.clickNeutral);
      })
      .catch(error => {
        console.error('Error updating click count:', error);
      });
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
                    <a href="happy" onClick={handleHappyClick}>
                        <img src={Happy} alt="happy"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.4em" }}>Happy</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="angry" onClick={handleAngryClick}>
                      <img src={Angry} alt="angry"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.5em" }}>Angry</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="fear" onClick={handleFearClick}>
                      <img src={Fear} alt="fear"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.8em" }}>Fear</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="sad" onClick={handleSadClick}>
                      <img src={Sad} alt="sad"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "2em" }}>Sad</p>
                    </a>
                  </Col>
                  <Col md={4}></Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="disgust" onClick={handleDisgustClick}>
                      <img src={Disgust} alt="disgust"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "1.1em" }}>Disgust</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="surprise" onClick={handleSurpriseClick}>
                      <img src={Surprised} alt="surprise"></img>
                      <p className="epilogue-body" style={{ paddingLeft: "0.5em" }}>Surprised</p>
                    </a>
                  </Col>
                  <Col xs={2} sm={3} md={2}>
                    <a href="neutral" onClick={handleNeutralClick}>
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