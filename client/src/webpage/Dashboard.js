import "../components/dashboard/dashboard.css";
// import "rsuite/dist/rsuite.css";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

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
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList } from "recharts";

import Neutral from "../components/home/icon-mood/Icon-Neutral-NoBorder.svg";
import Happy from "../components/home/icon-mood/Icon-Happy-NoBorder.svg";
import Sad from "../components/home/icon-mood/Icon-Sad-NoBorder.svg";
import Angry from "../components/home/icon-mood/Icon-Angry-NoBorder.svg";
import Fear from "../components/home/icon-mood/Icon-Fear-NoBorder.svg";
import Disgust from "../components/home/icon-mood/Icon-Disgust-NoBorder.svg";
import Surprised from "../components/home/icon-mood/Icon-Surprise-NoBorder.svg";


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
  const [dataMood, setDataMood] = useState([]);
  const [dataScan, setDataScan] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalScans, setTotalScans] = useState(0);

  useEffect(() => {
    Axios.get('http://localhost:5000/stats-click')
      .then(response => {
        setTotalClicks(response.data.clickHappy + response.data.clickAngry + response.data.clickFear + response.data.clickSad + response.data.clickDisgust + response.data.clickSurprise + response.data.clickNeutral );
      })
      .catch(error => {
        console.error('Error fetching total clicks:', error);
      });

    // Mengambil data dari server saat komponen dimuat
    Axios.get('http://localhost:5000/stats-click')
      .then(response => {
        // Proses data sesuai format yang dibutuhkan oleh komponen BarChart
        const data = response.data;
        
        // Manual perhitungan persentase untuk setiap mood
        const percentageHappy = totalClicks > 0 ? ((data.clickHappy / totalClicks) * 100).toFixed(1) : 0;
        const percentageAngry = totalClicks > 0 ? ((data.clickAngry / totalClicks) * 100).toFixed(1) : 0;
        const percentageFear = totalClicks > 0 ? ((data.clickFear / totalClicks) * 100).toFixed(1) : 0;
        const percentageSad = totalClicks > 0 ? ((data.clickSad / totalClicks) * 100).toFixed(1) : 0;
        const percentageDisgust = totalClicks > 0 ? ((data.clickDisgust / totalClicks) * 100).toFixed(1) : 0;
        const percentageSurprise = totalClicks > 0 ? ((data.clickSurprise / totalClicks) * 100).toFixed(1) : 0;
        const percentageNeutral = totalClicks > 0 ? ((data.clickNeutral / totalClicks) * 100).toFixed(1) : 0;

        const formattedData = [
          { name: 'Happy', klik: data.clickHappy, percentage: percentageHappy + "%" },
          { name: 'Angry', klik: data.clickAngry, percentage: percentageAngry + "%" },
          { name: 'Fear', klik: data.clickFear, percentage: percentageFear + "%" },
          { name: 'Sad', klik: data.clickSad, percentage: percentageSad + "%" },
          { name: 'Disgust', klik: data.clickDisgust, percentage: percentageDisgust + "%" },
          { name: 'Surprise', klik: data.clickSurprise, percentage: percentageSurprise + "%" },
          { name: 'Neutral', klik: data.clickNeutral, percentage: percentageNeutral + "%" }
        ];

        setDataMood(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [totalClicks]);

  useEffect(() => {
    Axios.get('http://localhost:5000/stats-scan')
      .then(response => {
        setTotalScans(response.data.scanHappy + response.data.scanAngry + response.data.scanFear + response.data.scanSad + response.data.scanDisgust + response.data.scanSurprise + response.data.scanNeutral );
      })
      .catch(error => {
        console.error('Error fetching total scans:', error);
      });

    // Mengambil data dari server saat komponen dimuat
    Axios.get('http://localhost:5000/stats-scan')
      .then(response => {
        // Proses data sesuai format yang dibutuhkan oleh komponen BarChart
        const data = response.data;
        
        // Manual perhitungan persentase untuk setiap mood
        const percentageHappy = totalScans > 0 ? ((data.scanHappy / totalScans) * 100).toFixed(1) : 0;
        const percentageAngry = totalScans > 0 ? ((data.scanAngry / totalScans) * 100).toFixed(1) : 0;
        const percentageFear = totalScans > 0 ? ((data.scanFear / totalScans) * 100).toFixed(1) : 0;
        const percentageSad = totalScans > 0 ? ((data.scanSad / totalScans) * 100).toFixed(1) : 0;
        const percentageDisgust = totalScans > 0 ? ((data.scanDisgust / totalScans) * 100).toFixed(1) : 0;
        const percentageSurprise = totalScans > 0 ? ((data.scanSurprise / totalScans) * 100).toFixed(1) : 0;
        const percentageNeutral = totalScans > 0 ? ((data.scanNeutral / totalScans) * 100).toFixed(1) : 0;

        const formattedScanData = [
          { name: 'Happy', scan: data.scanHappy, percentage: percentageHappy + "%" },
          { name: 'Angry', scan: data.scanAngry, percentage: percentageAngry + "%" },
          { name: 'Fear', scan: data.scanFear, percentage: percentageFear + "%" },
          { name: 'Sad', scan: data.scanSad, percentage: percentageSad + "%" },
          { name: 'Disgust', scan: data.scanDisgust, percentage: percentageDisgust + "%" },
          { name: 'Surprise', scan: data.scanSurprise, percentage: percentageSurprise + "%" },
          { name: 'Neutral', scan: data.scanNeutral, percentage: percentageNeutral + "%" }
        ];

        setDataScan(formattedScanData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [totalScans]);


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


  const [value1, onChange1] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  useEffect(() => {
    const calendarIcon1 = document.querySelectorAll('.react-daterange-picker__calendar-button')[0];
    const calendarIcon2 = document.querySelectorAll('.react-daterange-picker__calendar-button')[1];

    if (calendarIcon1) {
      calendarIcon1.innerHTML = '<i class="bi bi-calendar2-week-fill"></i>';
    }

    if (calendarIcon2) {
      calendarIcon2.innerHTML = '<i class="bi bi-calendar2-week-fill"></i>';
    }
  }, []);

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

        <Row style={{ marginLeft: "1%", marginRight: "4%" }}>
          <Col lg={6}>
            <Card className="px-4 box-stats box-dashboard2" style={{ background: "rgba(83, 158, 109, 0.1)" }}>
              <Row>
                <Col md={6}>
                  <h5 className="pt-4 ms-4">Berdasarkan Scan</h5>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center justify-content-end pt-4 pe-4">
                    <DateRangePicker onChange={onChange1} value={value1} />
                  </div>
                </Col>
              </Row>
              <Card.Body className="d-flex justify-content-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width= "100%"
                    height={300}
                    data={dataScan}
                    margin={{
                      top: 30,
                      right: 20,
                      left: -15,
                      bottom: 5,
                    }}
                    className="bar__chart"
                  >
                    <XAxis axisLine={false} tickLine={{ display: "none" }} dataKey="name" scale="" padding={{ left: 20, right: 20 }} />
                    <YAxis axisLine={false} tickLine={{ display: "none" }} />
                    <Tooltip />
                    <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="" />
                    <Bar radius={6} dataKey="scan" barSize={35} animationDuration={1000}>
                      {dataScan.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getCustomColor(entry)} />
                      ))}
                      <LabelList dataKey="percentage" position="top" className="fw-bold" style={{ fontSize: 12 }} />
                      <LabelList dataKey="scan" position="top" dy={-15} style={{ fontSize: 12 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="px-4 box-stats box-dashboard2" style={{ background: "rgba(83, 158, 109, 0.1)" }}>
              <Row>
                <Col md={6}>
                  <h5 className="pt-4 ms-4">Berdasarkan Klik</h5>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center justify-content-end pt-4 pe-4">
                    <DateRangePicker placeholder="Select Range" onChange={onChange2} value={value2} />
                  </div>
                </Col>
              </Row>
              <Card.Body className="d-flex justify-content-center">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width={510}
                    height={300}
                    data={dataMood}
                    margin={{
                      top: 30,
                      right: 20,
                      left: -15,
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
                      <LabelList dataKey="klik" position="top" dy={-15} style={{ fontSize: 12 }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Menu Data Statistic */}
        <h4 style={{ marginLeft: "3%" }} className="mt-4">
          Data Menu Statistik
        </h4>
        <Row style={{ marginLeft: "1%", marginRight: "4%" }} className="row-stats mt-4">
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

        <Row style={{ marginLeft: "1%", marginRight: "4%" }} className="row-stats mt-4 mb-5">
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
    </Sidebar>
  );
};

export default Dashboard;