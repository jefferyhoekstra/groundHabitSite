// import
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// css
import './user.css';

// function
export default function User() {
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();
  const cookie = Cookies.get('jwt-authorization');

  useEffect(() => {
    if (cookie) {
      const decoded = jwtDecode(cookie);
      setCurrentUser(decoded.id);
    } else {
      navigate('/');
    }
  }, [cookie, navigate]);

  const handleLogout = () => {
    Cookies.remove('jwt-authorization');
    setCurrentUser('');
    navigate('/');
  };

  return (
    <div className="user">
      <div className="container-1">
        <h1>Your Dashboard</h1>
        <div className="user-info">
          <h3>{`Hello, ${currentUser}`}</h3>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
