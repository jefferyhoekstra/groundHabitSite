// import
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// css
import './posterboard.css';

// function
export default function Posterboard() {
  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || 'https://ground-habit-site.vercel.app'
  ).replace(/\/$/, '');
  // STATES
  const [currentUser, setCurrentUser] = useState('');
  const [formdata, setFormdata] = useState({
    title: '',
    text: '',
  });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);

  // CONSTS
  const navigate = useNavigate();
  const cookie = Cookies.get('jwt-authorization');

  useEffect(() => {
    if (cookie) {
      const decoded = jwtDecode(cookie);
      setCurrentUser(decoded.id);
      axios.get(`${API_BASE_URL}/posts`).then((result) => {
        setPosts(result.data);
      });
    } else {
      navigate('/');
    }
  }, [cookie, navigate]);

  const handleOnChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/add-post`, formdata).then((result) => {
        setPostResponse(result.data);
        setFormdata({ title: '', text: '' });
      });

      await axios.get(`${API_BASE_URL}/posts`).then((result) => {
        setPosts(result.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="posterboard">
      <section className="posterboard_container">
        <section className="posterboard_header">
          <h1>Posterboard</h1>
          {currentUser && <h3>{`Hello, ${currentUser}`}</h3>}
        </section>

        <section className="posterboard_main">
          <section className="posterboard_form">
            <h2>Add a Post</h2>
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formdata.title}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="text">Text: </label>
                <textarea
                  name="text"
                  id="text"
                  value={formdata.text}
                  onChange={handleOnChange}
                  rows={5}
                  required
                />
              </div>
              <button type="submit">Post</button>
              {postResponse && (
                <div className="response">
                  <p>{postResponse ? postResponse : ' '}</p>
                </div>
              )}
            </form>
          </section>

          <section className="posterboard_feed">
            <h2>Recent Posts</h2>
            {posts && posts.length ? (
              <div className="posterboard_posts">
                {posts.map((post) => (
                  <div className="posterboard_post" key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No posts yet.</p>
            )}
          </section>
        </section>
      </section>
    </div>
  );
}
