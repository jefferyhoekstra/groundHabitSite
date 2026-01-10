// import
import { Link } from 'react-router-dom';

// css
import './footer.css';

// function
export default function Footer() {
  return (
    <div className="footer">
      <nav>
        <ul>
          <li>
            <Link to={'/posterboard'}>Post</Link>
          </li>
          <li>
            <Link to={'/blog'}>Blog</Link>
          </li>
          <li>
            <Link to={'/mailbox'}>Mailbox</Link>
          </li>
          <li>
            <Link to={'/user'}>Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
