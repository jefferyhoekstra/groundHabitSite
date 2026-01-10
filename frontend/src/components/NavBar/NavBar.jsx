//import
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/Header/logo.png';
import userImg from '../../assets/images/Footer/user.png';

//css
import './navBar.css';

//components

//function
export default function NavBar({ currentUser, handleLogout }) {
  return (
    <header className="navbar">
      <div className="navbar_brand">
        <img className="navbar_logo" src={LogoImg} alt="GroundHabit" />
        <div className="navbar_wordmark" aria-label="GroundHabit">
          <span className="navbar_wordmark_main">Ground</span>
          <span className="navbar_wordmark_accent">Habit</span>
        </div>
      </div>
      <nav className="navbar_nav">
        <ul>
          <li className="navbar_account">
            <Link to="/account">
              <img
                className="navbar_icon navbar_icon--account"
                src={userImg}
                alt=""
              />
            </Link>
            <span className="navbar_user">
              {currentUser ? `${currentUser}` : 'Not signed in'}
            </span>
            {currentUser ? (
              <button type="button" onClick={() => handleLogout()}>
                Logout
              </button>
            ) : null}
          </li>
        </ul>
      </nav>
    </header>
  );
}
