import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/sad/BottomNavbarSad';
import Konten2 from '../components/sad/DescryptionSad';
import Konten1 from '../components/sad/CarouselSad';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

function Detailproduct() {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Sad', link: '/sad' },
    { label: 'Product Details', link: 'detail-product-sad'},
  ];

  return (
    <div className="App mt-4" style={{ marginBottom:'100px' }}>
        <BottomNavbar />
        <TopBar />
        <Breadcrumbs items={items} />
        <Konten1 />
        <Konten2 />
    </div>
  );
}

export default Detailproduct;