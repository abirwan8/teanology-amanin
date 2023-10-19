import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/fear/BottomNavbarFear';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';
import MoodDetected from '../components/fear/MoodFear';
import TeaMenus from '../components/fear/TeaMenusFear';

function Fear() {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Fear', link: '/fear'},
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

export default Fear;