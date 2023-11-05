import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/dashboard/Sidebar.js";
import Food from "../components/dashboard/Food.svg";
import FoodPairing from "../components/dashboard/FoodPairing.svg";
import Staff from "../components/dashboard/Staff.svg";
import Tea from "../components/dashboard/Tea.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

import Neutral from "../components/home/icon-mood/Icon-Neutral-NoBorder.svg";
import Happy from "../components/home/icon-mood/Icon-Happy-NoBorder.svg";
import Sad from "../components/home/icon-mood/Icon-Sad-NoBorder.svg";
import Angry from "../components/home/icon-mood/Icon-Angry-NoBorder.svg";
import Fear from "../components/home/icon-mood/Icon-Fear-NoBorder.svg";
import Disgust from "../components/home/icon-mood/Icon-Disgust-NoBorder.svg";
import Surprised from "../components/home/icon-mood/Icon-Surprise-NoBorder.svg";

const dataMood = [
  {
    name: "Angry",
    percentage: "(10%)",
    klik: 240,
    color: "#AB594E",
  },
  {
    name: "Happy",
    percentage: "(15%)",
    klik: 139,
    color: "#EAC73D",
  },
  {
    name: "Fear",
    percentage: "(19%)",
    klik: 390,
    color: "#F09E54",
  },
  {
    name: "Sad",
    percentage: "(20%)",
    klik: 180,
    color: "#75A1D9",
  },
  {
    name: "Disgust",
    percentage: "(40%)",
    klik: 480,
    color: "#7A6ACE",
  },
  {
    name: "Surprise",
    percentage: "(30%)",
    klik: 380,
    color: "#F4AFB2",
  },
  {
    name: "Neutral",
    percentage: "(10%)",
    klik: 430,
    color: "#539E6D",
  },
];

// Fungsi untuk menghasilkan warna berdasarkan data atau indeks
function getCustomColor(entry) {
  // Anda dapat menyesuaikan logika untuk menghasilkan warna sesuai dengan data
  // Misalnya, berdasarkan kategori atau nilai tertentu
  if (entry.name === "Angry") {
    return "#AB594E";
  } else if (entry.name === "Happy") {
    return "#EAC73D";
  } else if (entry.name === "Sad") {
    return "#75A1D9";
  } else if (entry.name === "Fear") {
    return "#F09E54";
  } else if (entry.name === "Disgust") {
    return "#7A6ACE";
  } else if (entry.name === "Surprise") {
    return "#F4AFB2";
  } else {
    return "#539E6D"; // Warna neutral
  }
}

const Dashboard = () => {
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const [foods, setTotalFoods] = useState([]);
  const [staff, setTotalStaff] = useState([]);
  const [bevs, setTotalBevs] = useState([]);
  const [foodpairing, setTotalFP] = useState([]);

  // Mengambil data makanan dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/foods")
      .then((response) => {
        setTotalFoods(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const totalFoodData = foods.length;

  // Mengambil data staff dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/users")
      .then((response) => {
        setTotalStaff(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const totalStaffData = staff.length;

  // Mengambil data FP dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/bevs")
      .then((response) => {
        setTotalBevs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const totalBevsData = bevs.length;

  // Mengambil data FP dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/foodpairings")
      .then((response) => {
        setTotalFP(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const totalFPData = foodpairing.length;

  // Log Out
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Menghapus token dari localStorage
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      // Mengarahkan pengguna ke halaman login
      navigate("/login-page");
    } catch (error) {
      console.error(error);
    }
  };

  // const percentage = 83;
  // const colorHappy = "#EAC73D";
  // const colorAngry = "#AB594E";
  // const colorFear = "#F09E54";
  // const colorSad = "#75A1D9";
  // const colorDisgust = "#7A6ACE";
  // const colorSurprise = "#F4AFB2";
  // const colorNeutral = "#539E6D";
  // const size = "100px";

  return (
    <Sidebar>
      <Container fluid>
        <Row style={{ marginTop: "24px" }}>
          <Col md={7} xs={12}>
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Dashboard Teanology</h3>
            <p className="text-muted teanology-menu-update">
              Teanology menu update.{" "}
              <a href="/home" style={{ color: "#539e6d" }}>
                Back to home page.
              </a>
            </p>
          </Col>

          <Col md={5} xs={12} className="user-admin d-flex justify-content-end align-items-center">
            <Dropdown className="topbar-dashboard margin-admin-topbar">
              <Dropdown.Toggle className="button-user" variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-fill me-2"></i>
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <p className="ms-3 fw-bold fs-6 text-muted text-uppercase">{userRole}</p>
                <Dropdown.Divider style={{ marginTop: "-10px" }} />
                <Dropdown.Item href="/login-page" className="text-danger item-drop" onClick={handleLogout}>
                  <i class="bi bi-box-arrow-left me-2"></i>Keluar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Moods Statistic */}
        <h4 style={{ marginLeft: "3%" }} className="mt-4 mb-4">
          Statistik Mood
        </h4>

        <Row style={{ marginLeft: "2%", marginRight: "2%" }}>
          <Col md={12} lg={8}>
            <Card className="px-4 box-stats" style={{ background: "rgba(83, 158, 109, 0.1)" }}>
              <Card.Title className="pt-4 ms-5">Mood paling banyak diperoleh</Card.Title>
              <Card.Body className="d-flex justify-content-center">
                <div style={{ width: "100%", maxWidth: "100%" }}>
                  <BarChart
                    width={"100%"}
                    height={"100%"}
                    data={dataMood}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <XAxis axisLine={false} tickLine={{ display: "none" }} dataKey="name" scale="" padding={{ left: 20, right: 20 }} />
                    <YAxis axisLine={false} tickLine={{ display: "none" }} />
                    <Tooltip />
                    <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="" />
                    <Bar radius={6} dataKey="klik" barSize={35} animationDuration={1000}>
                      {dataMood.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCustomColor(entry)} />
                      ))}
                      <LabelList dataKey="percentage" position="top" className="fw-bold" style={{ fontSize: 12 }} />
                      <LabelList dataKey="klik" position="top" dy={-20} style={{ fontSize: 12 }} />
                    </Bar>
                  </BarChart>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Row style={{ marginLeft: "2%", marginRight: "2%" }}>
          <Col lg={4}>
             <Card className="px-4 box-stats main-stats" style={{ background : "rgba(234, 199, 61, 0.1)" }}>
              <Card.Title className="text-center pt-2">Happy</Card.Title>
              <Card.Body className="d-flex justify-content-center">
                <Row>
                  <div style={{ width: "250px", height: "250px" }}>
                    <CircularProgressbarWithChildren
                      styles={buildStyles({
                        pathColor: colorHappy,
                        textColor: colorHappy
                      })}
                      maxValue={100}
                      strokeWidth={8}
                      value={percentage}
                    >
                    <img
                      style={{ width: 80, marginTop: -5 }}
                      src={Happy}
                      alt="happy"
                    />
                    <div style={{ fontSize: 24, marginTop: 4 }}>
                      <strong>{`${percentage}%`}</strong> 
                    </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </Row>
              </Card.Body>
            </Card> 
          </Col>

          <Col lg={8}>
            <Row style={{ marginRight: "1%" }} className="row1-moodstats">
              <Col md={4}>
                <Card className="px-4 box-stats" style={{ background : "rgba(171, 89, 78, 0.1)" }}>
                <Card.Title className="text-center pt-2">Angry</Card.Title>
                <Card.Body className="d-flex justify-content-center">
                    <div style={{ width: size, height: size }}>
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: colorAngry,
                          textColor: colorAngry
                        })}
                        maxValue={100}
                        strokeWidth={8}
                        value={percentage}
                      >
                      <img
                        style={{ width: 30, marginTop: -5 }}
                        src={Angry}
                        alt="angry"
                      />
                      <div style={{ fontSize: 12, marginTop: 2 }}>
                        <strong>{`${percentage}%`}</strong> 
                      </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </Card.Body>
                </Card> 
              </Col>

              <Col md={4}>
                <Card className="px-4 box-stats" style={{ background : "rgba(240, 158, 84, 0.1)" }}>
                  <Card.Title className="text-center pt-2">Fear</Card.Title>
                  <Card.Body className="d-flex justify-content-center">
                      <div style={{ width: size, height: size }}>
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: colorFear,
                            textColor: colorFear
                          })}
                          maxValue={100}
                          strokeWidth={8}
                          value={percentage}
                        >
                        <img
                          style={{ width: 30, marginTop: -5 }}
                          src={Fear}
                          alt="fear"
                        />
                        <div style={{ fontSize: 12, marginTop: 2 }}>
                          <strong>{`${percentage}%`}</strong> 
                        </div>
                        </CircularProgressbarWithChildren>
                      </div>
                  </Card.Body>
                </Card> 
              </Col>

              <Col md={4}>
                <Card className="px-4 box-stats" style={{ background : "rgba(117, 161, 217, 0.1)"}}>
                  <Card.Title className="text-center pt-2">Sad</Card.Title>
                  <Card.Body className="d-flex justify-content-center">
                      <div style={{ width: size, height: size }}>
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: colorSad,
                            textColor: colorSad
                          })}
                          maxValue={100}
                          strokeWidth={8}
                          value={percentage}
                        >
                        <img
                          style={{ width: 30, marginTop: -5 }}
                          src={Sad}
                          alt="sad"
                        />
                        <div style={{ fontSize: 12, marginTop: 2 }}>
                          <strong>{`${percentage}%`}</strong> 
                        </div>
                        </CircularProgressbarWithChildren>
                      </div>
                  </Card.Body>
                </Card> 
              </Col>
            </Row>

            <Row className="mt-4" style={{ marginRight: "1%" }}>
              <Col md={4}>
                <Card className="px-4 box-stats" style={{ background : "rgba(122, 106, 206, 0.1)" }}>
                  <Card.Title className="text-center pt-2">Disgust</Card.Title>
                  <Card.Body className="d-flex justify-content-center">
                      <div style={{ width: size, height: size }}>
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: colorDisgust,
                            textColor: colorDisgust
                          })}
                          maxValue={100}
                          strokeWidth={8}
                          value={percentage}
                        >
                        <img
                          style={{ width: 30, marginTop: -5 }}
                          src={Disgust}
                          alt="Disgust"
                        />
                        <div style={{ fontSize: 12, marginTop: 2 }}>
                          <strong>{`${percentage}%`}</strong> 
                        </div>
                        </CircularProgressbarWithChildren>
                      </div>
                  </Card.Body>
                </Card> 
              </Col>

              <Col md={4}>
                <Card className="px-4 box-stats" style={{ background : "rgba(244, 175, 178, 0.1)" }}>
                  <Card.Title className="text-center pt-2">Surprise</Card.Title>
                  <Card.Body className="d-flex justify-content-center">
                      <div style={{ width: size, height: size }}>
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: colorSurprise,
                            textColor: colorSurprise
                          })}
                          maxValue={100}
                          strokeWidth={8}
                          value={percentage}
                        >
                        <img
                          style={{ width: 30, marginTop: -5 }}
                          src={Surprised}
                          alt="Surprise"
                        />
                        <div style={{ fontSize: 12, marginTop: 2 }}>
                          <strong>{`${percentage}%`}</strong> 
                        </div>
                        </CircularProgressbarWithChildren>
                      </div>
                  </Card.Body>
                </Card> 
              </Col>

              <Col md="4">
                <Card className="px-4 box-stats" style={{ background : "rgba(83, 158, 109, 0.1)" }}>
                  <Card.Title className="text-center pt-2">Neutral</Card.Title>
                  <Card.Body className="d-flex justify-content-center">
                      <div style={{ width: size, height: size }}>
                        <CircularProgressbarWithChildren
                          styles={buildStyles({
                            pathColor: colorNeutral,
                            textColor: colorNeutral
                          })}
                          maxValue={100}
                          strokeWidth={8}
                          value={percentage}
                        >
                        <img
                          style={{ width: 30, marginTop: -5 }}
                          src={Neutral}
                          alt="Neutral"
                        />
                        <div style={{ fontSize: 12, marginTop: 2 }}>
                          <strong>{`${percentage}%`}</strong> 
                        </div>
                        </CircularProgressbarWithChildren>
                      </div>
                  </Card.Body>
                </Card> 
              </Col>
            </Row>
          </Col>
        </Row> */}

        {/* Menu Data Statistic */}
        <h4 style={{ marginLeft: "3%" }} className="mt-4">
          Data Menu Statistik
        </h4>
        <Row style={{ marginLeft: "1%", marginRight: "4%" }} className="mt-4">
          <Col lg={6} md={12} xs={12}>
            <Card className="box-dashboard2">
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <div className="oval-icon">
                      <img className="icon" alt="oval-tea" src={Tea} />
                    </div>
                  </Col>
                  <Col xs={8}>
                    <h4 className="text-total">Total Beverage Menu</h4>
                    <h3 className="total">{totalBevsData}</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={12} xs={12}>
            <Card className="box-dashboard2">
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <div className="oval-icon">
                      <img className="icon" alt="oval-food" src={Food} />
                    </div>
                  </Col>
                  <Col xs={8}>
                    <h4 className="text-total">Total Food Menu</h4>
                    <h3 className="total">{totalFoodData}</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginLeft: "1%", marginRight: "4%" }} className="mt-4 mb-5">
          <Col lg={6} md={12} xs={12}>
            <Card className="box-dashboard2">
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <div className="oval-icon">
                      <img className="icon" alt="oval-foodpairing" src={FoodPairing} />
                    </div>
                  </Col>
                  <Col xs={8}>
                    <h4 className="text-total">Total Food Pairing</h4>
                    <h3 className="total">{totalFPData}</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={12} xs={12}>
            <Card className="box-dashboard2">
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <div className="oval-icon">
                      <img className="icon" alt="oval-staff" src={Staff} />
                    </div>
                  </Col>
                  <Col xs={8}>
                    <h4 className="text-total">Total Staff</h4>
                    <h3 className="total">{totalStaffData}</h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/*}
      <div className="flex-containerrr">
        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-tea" src={Tea} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Beverage Menu</h4>
                <h3 className="total">{totalBevsData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-food" src={Food} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Food Menu</h4>
                <h3 className="total">{totalFoodData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-foodpairing" src={FoodPairing} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Food Pairing</h4>
                <h3 className="total">{totalFPData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-staff" src={Staff} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Staff</h4>
                <h3 className="total">{totalStaffData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div> */}
    </Sidebar>
  );
};

export default Dashboard;
