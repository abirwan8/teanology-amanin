import { Container } from 'react-bootstrap';


import home from './icons/home-fear.svg';
import teagreen from './icons/logo-fear.svg';
import library from './icons/library-fear.svg';
import catalogue from './icons/catalogue-fear.svg';
import inbox from './icons/notif-fear.svg';

const BottomNavbarFear = () => {
    return(
        <Container>
        <nav className="nav fixed-bottom">
            <span className="nav-indicator"></span>
            <a href="/home" className="nav__link">
                <img className="nav__icon" alt="nav-home" src={ home }/>
                <span className="nav__text">Home</span>
            </a>
            <a href="#" className="nav__link nav__link--active">
                <img className="nav__icon" alt="nav-library" src={ library }/>
                <span className="nav__text">Library</span>
            </a>
            <a href="/camera" className="nav__link ps-3 pb-3">
                <img className="nav__icon icon-tea" alt="nav-teagreen" src={ teagreen }/>
                <span className="nav__text">Scan Me!</span>
            </a>
            <a href="/catalogue" className="nav__link">
                <img className="nav__icon" alt="nav-catalogue" src={ catalogue }/>
                <span className="nav__text">Catalogue</span>
            </a>
            <a href="#" className="nav__link">
                <img className="nav__icon" alt="nav-inbox" src={ inbox }/>
                <span className="nav__text">Inbox</span>
            </a>
        </nav>
        <div className="half-circle"></div>
        </Container>
    );
}

export default BottomNavbarFear;