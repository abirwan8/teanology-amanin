import "./App.css";
import "../components/BottomNavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/angry/BottomNavbarAngry";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import MoodDetected from "../components/angry/MoodAngry";
import TeaMenus from "../components/angry/TeaMenusAngry";

function Angry() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Angry", link: "/angry" },
  ];

  return (
    <div className="App mt-4" style={{ marginBottom: "95px" }}>
      <BottomNavbar />
      <TopBar />
      <Breadcrumbs items={items} />
      <MoodDetected />
      <TeaMenus />
    </div>
  );
}

export default Angry;
