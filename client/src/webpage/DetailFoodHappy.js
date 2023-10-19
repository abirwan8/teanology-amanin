import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/happy/BottomNavbarHappy';
import Konten1 from '../components/happy/CarouselFoodHappy';
import Konten2 from '../components/happy/DescryptionFoodHappy';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailFoodHappy = () => {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Recomended Foods', link: '/food-pairing-happy' },
    { label: 'Product Details', link: 'food-details-happy'},
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

export default DetailFoodHappy;