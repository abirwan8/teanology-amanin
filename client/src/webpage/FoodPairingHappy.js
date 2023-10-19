import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/happy/BottomNavbarHappy";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import FoodMenus from "../components/happy/FoodMenusHappy";

function Happy() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Happy", link: "/happy" },
    { label: "Food Menu", link: "/food-pairing-happy" },
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

export default Happy;