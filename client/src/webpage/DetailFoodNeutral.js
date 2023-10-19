import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/neutral/BottomNavbarNeutral';
import Konten1 from '../components/neutral/CarouselFoodNeutral';
import Konten2 from '../components/neutral/DescryptionFoodNeutral';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailFoodNeutral = () => {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Recomended Foods', link: '/food-pairing-neutral' },
    { label: 'Product Details', link: 'food-details-neutral'},
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

export default DetailFoodNeutral;