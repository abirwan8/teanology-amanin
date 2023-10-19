import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/happy/BottomNavbarHappy';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';
import MoodDetected from '../components/happy/MoodHappy';
import TeaMenus from '../components/happy/TeaMenusHappy';

function Happy() {
  
  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Happy', link: '/happy' },
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

export default Happy;