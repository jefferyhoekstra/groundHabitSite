// import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

//components
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Posterboard from './components/Posterboard/Posterboard';
import EditPostPage from './components/Posterboard/EditPostPage';
import Blog from './components/Blog/Blog';
import User from './components/User/User';
import Mailbox from './components/Mailbox/Mailbox';
import About from './components/About/About';
import GithubLink from './components/GithubLink/GithubLink';
import PrivateRoute from '../utilities/PrivateRoute';
import RegisterPage from './components/LoginPage/RegisterPage';

// css
import './App.css';

// function
export default function App() {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const token = Cookies.get('jwt-authorization');
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded.id);
    } else {
      setCurrentUser('');
    }
  }, []);

  const handleLogin = (jwtToken) => {
    Cookies.set('jwt-authorization', jwtToken);
    const decoded = jwtDecode(jwtToken);
    setCurrentUser(decoded.id);
  };

  const handleLogout = () => {
    Cookies.remove('jwt-authorization');
    setCurrentUser('');
  };

  return (
    <Router>
      <section className="app">
        <section className="app_header">
          <NavBar currentUser={currentUser} handleLogout={handleLogout} />
        </section>
        <GithubLink />
        <section className="app_main">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/blog" element={<Blog />} />
              <Route path="/account" element={<User />} />
              <Route path="/posterboard" element={<Posterboard />} />
              <Route path="/edit-post" element={<EditPostPage />} />
              <Route path="/user" element={<User />} />
              <Route path="/mailbox" element={<Mailbox />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="/create-user" element={<RegisterPage />} />
          </Routes>
        </section>
        <section className="app_footer">
          <Footer />
        </section>
      </section>
    </Router>
  );
}
