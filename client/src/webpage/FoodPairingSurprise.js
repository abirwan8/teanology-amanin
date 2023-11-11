import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from "../components/surprise/BottomNavbarSurprise";
import TopBar from "../components/TopBar2";
import Breadcrumbs from "../components/BreadCrumbs";
import HeadFP from "../components/surprise/HeadFPSurprise";
import FoodMenus from "../components/surprise/FoodMenusSurprise";

function Surprise() {
  const items = [
    { label: "Home", link: "/" },
    { label: "Mood Surprise", link: "/surprise" },
    { label: "Food Menu", link: "/food-pairing-surprise" },
  ];

  return (
    <div className="App mt-4" style={{ marginBottom: "95px", overflow: 'hidden' }}>
      <BottomNavbar />
      <TopBar />
      <Breadcrumbs items={items} />
      <HeadFP />
      <FoodMenus />
    </div>
  );
}

export default Surprise;