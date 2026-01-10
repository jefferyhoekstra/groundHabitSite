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
          <li className="navbar_github">
            <a
              href="https://github.com/jefferyhoekstra/groundHabitSite"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg
                className="navbar_github_icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M12 .5C5.73.5.75 5.66.75 12.03c0 5.17 3.37 9.56 8.05 11.11.59.11.81-.26.81-.58 0-.29-.01-1.05-.02-2.06-3.28.73-3.97-1.61-3.97-1.61-.54-1.4-1.32-1.77-1.32-1.77-1.08-.76.08-.75.08-.75 1.19.09 1.82 1.25 1.82 1.25 1.06 1.85 2.79 1.31 3.47 1 .11-.79.41-1.31.74-1.61-2.62-.31-5.38-1.34-5.38-5.96 0-1.32.46-2.39 1.22-3.23-.12-.31-.53-1.57.12-3.27 0 0 1-.33 3.28 1.23.95-.27 1.97-.41 2.98-.41 1.01 0 2.03.14 2.98.41 2.28-1.56 3.28-1.23 3.28-1.23.65 1.7.24 2.96.12 3.27.76.84 1.22 1.91 1.22 3.23 0 4.63-2.76 5.65-5.39 5.95.42.37.8 1.11.8 2.23 0 1.61-.01 2.9-.01 3.29 0 .32.21.69.82.58 4.68-1.55 8.05-5.94 8.05-11.11C23.25 5.66 18.27.5 12 .5z"
                />
              </svg>
            </a>
          </li>
          <li className="navbar_account">
            <Link to="/account">
              <img
                className="navbar_icon navbar_icon--account"
                src={userImg}
                alt=""
              />
            </Link>
            {currentUser ? (
              <span className="navbar_user">{`${currentUser}`}</span>
            ) : null}
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
