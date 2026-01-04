// import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Posterboard from "./components/Posterboard/Posterboard";
import Scroll from "./components/Scroll/Scroll";
import User from "./components/User/User";

// css
import "./App.css";

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
            <Route path="/" element={<LoginPage />} />
            <Route path="/scroll" element={<Scroll />} />
            <Route path="/posterboard" element={<Posterboard />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </section>
        <section className="app_footer">
          <Footer />
        </section>
      </section>
    </Router>
  );
}
