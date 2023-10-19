import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/disgust/BottomNavbarDisgust";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import FoodMenus from "../components/disgust/FoodMenusDisgust";

function Disgust() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Disgust", link: "/disgust" },
    { label: "Food Menu", link: "/food-pairing-disgust" },
  ];

  return (
    <div className="App mt-4" style={{ marginBottom: "95px", overflow: 'hidden' }}>
      <BottomNavbar />
      <TopBar />
      <Breadcrumbs items={items} />
      <FoodMenus />
    </div>
  );
}

export default Disgust;