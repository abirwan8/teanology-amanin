import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/fear/BottomNavbarFear';
import Konten1 from '../components/fear/CarouselFoodFear';
import Konten2 from '../components/fear/DescryptionFoodFear';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailFoodFear = () => {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Recomended Foods', link: '/food-pairing-fear' },
    { label: 'Product Details', link: 'food-details-fear'},
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

export default DetailFoodFear;