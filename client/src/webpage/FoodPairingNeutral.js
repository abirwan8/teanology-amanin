import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/neutral/BottomNavbarNeutral";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import FoodMenus from "../components/neutral/FoodMenusNeutral";

function Neutral() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Neutral", link: "/neutral" },
    { label: "Food Menu", link: "/food-pairing-neutral" },
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

export default Neutral;