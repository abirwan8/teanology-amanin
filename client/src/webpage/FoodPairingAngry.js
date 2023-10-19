import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/angry/BottomNavbarAngry";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import FoodMenus from "../components/angry/FoodMenusAngry";

function Angry() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Angry", link: "/angry" },
    { label: "Food Menu", link: "/food-pairing-angry" },
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

export default Angry;