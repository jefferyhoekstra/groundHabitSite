// import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Posterboard from './components/Posterboard/Posterboard';
import EditPostPage from './components/Posterboard/EditPostPage';
import Scroll from './components/Scroll/Scroll';
import User from './components/User/User';
import Mailbox from './components/Mailbox/Mailbox';
import PrivateRoute from '../utilities/PrivateRoute';
import RegisterPage from './components/LoginPage/RegisterPage';

// css
import './App.css';

// function
export default function App() {
  return (
    <Router>
      <section className="app">
        <section className="app_header">
          <Header />
        </section>
        <section className="app_main">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/scroll" element={<Scroll />} />
              <Route path="/posterboard" element={<Posterboard />} />
              <Route path="/edit-post" element={<EditPostPage />} />
              <Route path="/user" element={<User />} />
              <Route path="/mailbox" element={<Mailbox />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
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
