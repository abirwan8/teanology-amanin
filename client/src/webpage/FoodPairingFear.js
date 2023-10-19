import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/fear/BottomNavbarFear";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import FoodMenus from "../components/fear/FoodMenusFear";

function Fear() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Fear", link: "/fear" },
    { label: "Food Menu", link: "/food-pairing-fear" },
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

export default Fear;