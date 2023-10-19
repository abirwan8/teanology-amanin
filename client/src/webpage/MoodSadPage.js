import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/sad/BottomNavbarSad';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';
import MoodDetected from '../components/sad/MoodSad';
import TeaMenus from '../components/sad/TeaMenusSad';

function Sad() {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Sad', link: '/sad'},
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

export default Sad;