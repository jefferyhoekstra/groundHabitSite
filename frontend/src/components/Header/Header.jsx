// import
import { Link } from "react-router-dom";

// css
import "./header.css";

// images
import LogoImg from "../../assets/images/Header/logo.png";

// function
export default function Header() {
  return (
    <div className="header">
      <img src={LogoImg} alt="" />
    </div>
  );
}
