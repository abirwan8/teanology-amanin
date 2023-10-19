// CSS
import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/disgust/BottomNavbarDisgust';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';
import MoodDetected from '../components/disgust/MoodDisgust';
import TeaMenus from '../components/disgust/TeaMenusDisgust';

function Disgust() {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Disgust', link: '/disgust'},
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

export default Disgust;