import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/library/BottomNavbarLibrary';
import Konten1 from '../components/library/ReadMore';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailLibrary = () => {

  const items = [
    { label: 'Library', link: '/library' },
    { label: 'Detail Library', link: '/detail-library' }
  ];

  return (
    <div className="App mt-4" style={{ marginBottom:'100px' }}>
        <BottomNavbar />
        <TopBar />
        {/* <Breadcrumbs style={breadcrumbsQueryStyle} items={items} /> */}
        <Konten1 />
    </div>
  );
}

export default DetailLibrary;