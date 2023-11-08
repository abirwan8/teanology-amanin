import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/BottomNavbar.css';

import TopBar from '../components/TopBar2';
import BottomNavbar from '../components/catalogue/BottomNavbarCatalogue';
import CatalogueList from '../components/catalogue/CatalogueList';
import HeadCatalogue from '../components/catalogue/HeadCatalogue.js';

function Catalogue() {
  return (
    <div className="App mt-4" style={{ marginBottom: "95px" }}>
      <TopBar />
      <HeadCatalogue />
      <BottomNavbar />
      <CatalogueList />
    </div>
  );
}

export default Catalogue;