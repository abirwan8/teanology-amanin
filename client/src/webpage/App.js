import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/BottomNavbar.css';

import TopBar from '../components/TopBar2';
import BottomNavbar from '../components/home/BottomNavbar_Home';

function App() {
  return (
    <div className="App">
      <TopBar />
      <BottomNavbar />
    </div>
  );
}

export default App;