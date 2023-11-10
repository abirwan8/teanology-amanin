import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/BottomNavbar.css';

import TopBar from '../components/TopBar2';
import BottomNavbar from '../components/library/BottomNavbarLibrary.js';
import LibraryList from '../components/library/LibraryList';
import HeadLibrary from '../components/library/HeadLibrary.js';

function Library() {
  return (
    <div className="App mt-4" style={{ marginBottom: "95px" }}>
      <TopBar />
      <HeadLibrary />
      <BottomNavbar />
      <LibraryList />
    </div>
  );
}

export default Library;