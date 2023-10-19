import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/surprise/BottomNavbarSurprise';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';
import MoodDetected from '../components/surprise/MoodSurprise';
import TeaMenus from '../components/surprise/TeaMenusSurprise';

function Surprise() {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Surprise', link: '/surprise'},
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

export default Surprise;