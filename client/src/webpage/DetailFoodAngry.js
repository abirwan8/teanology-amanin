import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/angry/BottomNavbarAngry';
import Konten1 from '../components/angry/CarouselFoodAngry';
import Konten2 from '../components/angry/DescryptionFoodAngry';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailFoodAngry = () => {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Recomended Foods', link: '/food-pairing-angry' },
    { label: 'Product Details', link: 'food-details-angry'},
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

export default DetailFoodAngry;