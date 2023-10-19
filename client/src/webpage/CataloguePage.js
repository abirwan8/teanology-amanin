import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/BottomNavbar.css';

import TopBar from '../components/TopBar2';
import BottomNavbar from '../components/home/BottomNavbar_Home';
import CatalogueList from '../components/catalogue/CatalogueList';

function Catalogue() {
  return (
    <div className="App mt-4" style={{ marginBottom: "95px" }}>
      <TopBar />
      <BottomNavbar />
      <CatalogueList />
    </div>
  );
}

export default Catalogue;