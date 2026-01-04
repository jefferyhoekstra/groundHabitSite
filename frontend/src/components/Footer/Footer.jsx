// import
import { Link } from "react-router-dom";

import posterboardImg from "../../assets/images/Footer/posterboard.png";
import scrollImg from "../../assets/images/Footer/scroll.png";
import userImg from "../../assets/images/Footer/user.png";
import settingsImg from "../../assets/images/Footer/settings.png";
import mailboxImg from "../../assets/images/Footer/mailbox.png";

// css
import "./footer.css";

// function
export default function Footer() {
  return (
    <div className="footer">
      <nav>
        <ul>
          <li>
            <Link to={"/posterboard"}>
              <img src={posterboardImg} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/scroll"}>
              <img src={scrollImg} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/mailbox"}>
              <img src={mailboxImg} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/user"}>
              <img src={userImg} alt="" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
