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

// Fungsi untuk menghasilkan warna berdasarkan data atau indeks
function getCustomColor(entry) {
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const [value1, onChange1] = useState([new Date(), new Date()]);
  const [value2, onChange2] = useState([new Date(), new Date()]);

  const tokoId = localStorage.getItem("id_toko");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Mendapatkan total klik dari server
    Axios.get(`http://localhost:5000/stats-scan/${tokoId}`)
  .then((response) => {
    const scanDataArray = response.data;

    // Objek untuk menyimpan jumlah masing-masing mood
    const moodCount1 = {
      scanAngry: 0,
      scanDisgust: 0,
      scanFear: 0,
      scanHappy: 0,
      scanNeutral: 0,
      scanSad: 0,
      scanSurprise: 0,
    };

    // console.log("scan ", moodCount1);

    scanDataArray.forEach((scanData) => {
      const createdAtDate1 = new Date(scanData.createdAt);
      const startDate1 = value1[0];
      const endDate1 = value1[1];

      // const startDate = new Date("2024-02-01T00:00:00.000Z");
      // const endDate = new Date("2024-02-04T16:40:32.733Z"); 

      // console.log("StartDate1:", startDate1);
      // console.log("EndDate1:", endDate1);

      if (startDate1 && endDate1 && startDate1.getTime() === endDate1.getTime()) {
        moodCount1.scanAngry += scanData.scanAngry;
        moodCount1.scanDisgust += scanData.scanDisgust;
        moodCount1.scanFear += scanData.scanFear;
        moodCount1.scanHappy += scanData.scanHappy;
        moodCount1.scanNeutral += scanData.scanNeutral;
        moodCount1.scanSad += scanData.scanSad;
        moodCount1.scanSurprise += scanData.scanSurprise;
      } else if (createdAtDate1 >= startDate1 && createdAtDate1 < endDate1) {
        moodCount1.scanAngry += scanData.scanAngry;
        moodCount1.scanDisgust += scanData.scanDisgust;
        moodCount1.scanFear += scanData.scanFear;
        moodCount1.scanHappy += scanData.scanHappy;
        moodCount1.scanNeutral += scanData.scanNeutral;
        moodCount1.scanSad += scanData.scanSad;
        moodCount1.scanSurprise += scanData.scanSurprise;
      }
    });

    // Hitung persentase dan format data mood
    const totalScans = Object.values(moodCount1).reduce((acc, curr) => acc + curr, 0);
    
    // console.log("total scan", totalScans);

    const percentageHappy = totalScans > 0 ? ((moodCount1.scanHappy / totalScans) * 100).toFixed(1) : 0;
    const percentageAngry = totalScans > 0 ? ((moodCount1.scanAngry / totalScans) * 100).toFixed(1) : 0;
    const percentageFear = totalScans > 0 ? ((moodCount1.scanFear / totalScans) * 100).toFixed(1) : 0;
    const percentageSad = totalScans > 0 ? ((moodCount1.scanSad / totalScans) * 100).toFixed(1) : 0;
    const percentageDisgust = totalScans > 0 ? ((moodCount1.scanDisgust / totalScans) * 100).toFixed(1) : 0;
    const percentageSurprise = totalScans > 0 ? ((moodCount1.scanSurprise / totalScans) * 100).toFixed(1) : 0;
    const percentageNeutral = totalScans > 0 ? ((moodCount1.scanNeutral / totalScans) * 100).toFixed(1) : 0;

    const formattedData1 = [
      { name: "Happy", scan: moodCount1.scanHappy, percentage: percentageHappy + "%" },
      { name: "Angry", scan: moodCount1.scanAngry, percentage: percentageAngry + "%" },
      { name: "Fear", scan: moodCount1.scanFear, percentage: percentageFear + "%" },
      { name: "Sad", scan: moodCount1.scanSad, percentage: percentageSad + "%" },
      { name: "Disgust", scan: moodCount1.scanDisgust, percentage: percentageDisgust + "%" },
      { name: "Surprise", scan: moodCount1.scanSurprise, percentage: percentageSurprise + "%" },
      { name: "Neutral", scan: moodCount1.scanNeutral, percentage: percentageNeutral + "%" },
    ];

    setDataScan(formattedData1);
  })
  .catch((error) => {
    console.error("Error fetching scan data:", error);
  });
  }, [value1]);

  useEffect(() => {
    // Mendapatkan total klik dari server
    Axios.get(`http://localhost:5000/stats-click/${tokoId}`)
  .then((response) => {
    const clickDataArray = response.data;

    // Objek untuk menyimpan jumlah masing-masing mood
    const moodCount = {
      clickAngry: 0,
      clickDisgust: 0,
      clickFear: 0,
      clickHappy: 0,
      clickNeutral: 0,
      clickSad: 0,
      clickSurprise: 0,
    };

    // console.log("click",moodCount );

    clickDataArray.forEach((clickData) => {
      const createdAtDate2 = new Date(clickData.createdAt);
      const startDate2 = value2[0];
      const endDate2 = value2[1];
    
      // console.log("StartDate2:", startDate2);
      // console.log("EndDate2:", endDate2);
    
      // Jika startDate2 dan endDate2 sama, tampilkan semua data
      if (startDate2 && endDate2 && startDate2.getTime() === endDate2.getTime()) {
        // Logika Anda untuk mengumpulkan data saat startDate2 dan endDate2 sama
        moodCount.clickAngry += clickData.clickAngry;
        moodCount.clickDisgust += clickData.clickDisgust;
        moodCount.clickFear += clickData.clickFear;
        moodCount.clickHappy += clickData.clickHappy;
        moodCount.clickNeutral += clickData.clickNeutral;
        moodCount.clickSad += clickData.clickSad;
        moodCount.clickSurprise += clickData.clickSurprise;
      } else if (createdAtDate2 >= startDate2 && createdAtDate2 < endDate2) {
        // Logika Anda untuk mengumpulkan data berdasarkan rentang tanggal
        moodCount.clickAngry += clickData.clickAngry;
        moodCount.clickDisgust += clickData.clickDisgust;
        moodCount.clickFear += clickData.clickFear;
        moodCount.clickHappy += clickData.clickHappy;
        moodCount.clickNeutral += clickData.clickNeutral;
        moodCount.clickSad += clickData.clickSad;
        moodCount.clickSurprise += clickData.clickSurprise;
      }
    });    

    // Hitung persentase dan format data mood
    const totalClicks = Object.values(moodCount).reduce((acc, curr) => acc + curr, 0);
    console.log(response.data);

    // console.log("total kilk", totalClicks);

    const percentageHappy = totalClicks > 0 ? ((moodCount.clickHappy / totalClicks) * 100).toFixed(1) : 0;
    const percentageAngry = totalClicks > 0 ? ((moodCount.clickAngry / totalClicks) * 100).toFixed(1) : 0;
    const percentageFear = totalClicks > 0 ? ((moodCount.clickFear / totalClicks) * 100).toFixed(1) : 0;
    const percentageSad = totalClicks > 0 ? ((moodCount.clickSad / totalClicks) * 100).toFixed(1) : 0;
    const percentageDisgust = totalClicks > 0 ? ((moodCount.clickDisgust / totalClicks) * 100).toFixed(1) : 0;
    const percentageSurprise = totalClicks > 0 ? ((moodCount.clickSurprise / totalClicks) * 100).toFixed(1) : 0;
    const percentageNeutral = totalClicks > 0 ? ((moodCount.clickNeutral / totalClicks) * 100).toFixed(1) : 0;

    const formattedData = [
      { name: "Happy", klik: moodCount.clickHappy, percentage: percentageHappy + "%" },
      { name: "Angry", klik: moodCount.clickAngry, percentage: percentageAngry + "%" },
      { name: "Fear", klik: moodCount.clickFear, percentage: percentageFear + "%" },
      { name: "Sad", klik: moodCount.clickSad, percentage: percentageSad + "%" },
      { name: "Disgust", klik: moodCount.clickDisgust, percentage: percentageDisgust + "%" },
      { name: "Surprise", klik: moodCount.clickSurprise, percentage: percentageSurprise + "%" },
      { name: "Neutral", klik: moodCount.clickNeutral, percentage: percentageNeutral + "%" },
    ];

    setDataMood(formattedData);
  })
  .catch((error) => {
    console.error("Error fetching click data:", error);
  });
  }, [value2]);

  // Mengambil data makanan dari backend
  useEffect(() => {
    Axios.get(`http://localhost:5000/foods/${tokoId}`)
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
    Axios.get(`http://localhost:5000/users/${tokoId}`)
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
    Axios.get(`http://localhost:5000/bevs/${tokoId}`)
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
    Axios.get(`http://localhost:5000/foodpairings/${tokoId}`)
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

  useEffect(() => {
    const calendarIcon1 = document.querySelectorAll(
      ".react-daterange-picker__calendar-button"
    )[0];
    const calendarIcon2 = document.querySelectorAll(
      ".react-daterange-picker__calendar-button"
    )[1];

    if (calendarIcon1) {
      calendarIcon1.innerHTML = '<i class="bi bi-calendar2-week-fill"></i>';
    }

    if (calendarIcon2) {
      calendarIcon2.innerHTML = '<i class="bi bi-calendar2-week-fill"></i>';
    }
  }, []);

  // useEffect(() => {
  //   console.log('Value 1:', value1);
  //   console.log('Value 1 awal:', value1[0]);
  //   console.log('Value 1 akhir:', value1[1]);
  // }, [value1]);

  // useEffect(() => {
  //   console.log('Value 2:', value2);
  //   console.log('Value 2 awal:', value2[0]);
  //   console.log('Value 2 akhir:', value2[1]);
  // }, [value2]);

  return (
    <Sidebar>
      <Container fluid>
        <Row style={{ marginTop: "24px" }}>
          <Col md={7} xs={12}>
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">
              Dashboard Teanology {localStorage.getItem("name_toko")}
            </h3>
            <p className="text-muted teanology-menu-update">
              Teanology menu update.{" "}
              <a href="/home" style={{ color: "#539e6d" }}>
                Back to home page.
              </a>
            </p>
          </Col>

          <Col
            md={5}
            xs={12}
            className="user-admin d-flex justify-content-end align-items-center"
          >
            <Dropdown className="topbar-dashboard margin-admin-topbar">
              <Dropdown.Toggle
                className="button-user"
                variant="transparent"
                id="dropdown-basic"
              >
                <i className="bi bi-person-fill me-2"></i>
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <p className="ms-3 fw-bold fs-6 text-muted text-uppercase">
                  {userRole}
                </p>
                <Dropdown.Divider style={{ marginTop: "-10px" }} />
                <Dropdown.Item
                  href="/login-page"
                  className="text-danger item-drop"
                  onClick={handleLogout}
                >
                  <i class="bi bi-box-arrow-left me-2"></i>Keluar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Moods Statistic */}
        <h4 style={{ marginLeft: "3%" }} className="head-stats mt-4 mb-4">
          Statistik Mood
        </h4>

        <Row style={{ marginLeft: "1%", marginRight: "4%" }}>
          <Col lg={6}>
            <Card
              className="px-4 box-stats box-dashboard2"
              style={{ background: "rgba(83, 158, 109, 0.1)" }}
            >
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
                    width="100%"
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
                    <XAxis
                      axisLine={false}
                      tickLine={{ display: "none" }}
                      dataKey="name"
                      scale=""
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis axisLine={false} tickLine={{ display: "none" }} />
                    <Tooltip />
                    <CartesianGrid
                      vertical={false}
                      stroke="#ccc"
                      strokeDasharray=""
                    />
                    <Bar
                      radius={6}
                      dataKey="scan"
                      barSize={isMobile ? 10 : 35}
                      animationDuration={1000}
                    >
                      {dataScan.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getCustomColor(entry)}
                        />
                      ))}
                      <LabelList
                        dataKey="percentage"
                        position="top"
                        className="fw-bold"
                        style={{ fontSize: 12 }}
                      />
                      <LabelList
                        dataKey="scan"
                        position="top"
                        dy={-15}
                        style={{ fontSize: 12 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card
              className="px-4 box-stats box-dashboard2"
              style={{ background: "rgba(83, 158, 109, 0.1)" }}
            >
              <Row>
                <Col md={6}>
                  <h5 className="pt-4 ms-4">Berdasarkan Klik</h5>
                </Col>
                <Col md={6}>
                  <div className="d-flex align-items-center justify-content-end pt-4 pe-4">
                    <DateRangePicker onChange={onChange2} value={value2} />
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
                    <XAxis
                      axisLine={false}
                      tickLine={{ display: "none" }}
                      dataKey="name"
                      scale=""
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis axisLine={false} tickLine={{ display: "none" }} />
                    <Tooltip />
                    <CartesianGrid
                      vertical={false}
                      stroke="#ccc"
                      strokeDasharray=""
                    />
                    <Bar
                      radius={6}
                      dataKey="klik"
                      barSize={isMobile ? 10 : 35}
                      animationDuration={1000}
                    >
                      {dataMood.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getCustomColor(entry)}
                        />
                      ))}
                      <LabelList
                        dataKey="percentage"
                        position="top"
                        className="fw-bold"
                        style={{ fontSize: 12 }}
                      />
                      <LabelList
                        dataKey="klik"
                        position="top"
                        dy={-15}
                        style={{ fontSize: 12 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Menu Data Statistic */}
        <h4 style={{ marginLeft: "3%" }} className="head-stats mt-4">
          Data Menu Statistik
        </h4>
        <Row
          style={{ marginLeft: "1%", marginRight: "4%" }}
          className="row-stats mt-4"
        >
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

        <Row
          style={{ marginLeft: "1%", marginRight: "4%" }}
          className="row-stats mt-4 mb-5"
        >
          <Col lg={6} md={12} xs={12}>
            <Card className="box-dashboard2">
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <div className="oval-icon">
                      <img
                        className="icon"
                        alt="oval-foodpairing"
                        src={FoodPairing}
                      />
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