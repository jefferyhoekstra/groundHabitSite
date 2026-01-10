// import
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// css
import './posterboard.css';

// function
export default function EditPostPage() {
  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || 'https://ground-habit-site.vercel.app'
  ).replace(/\/$/, '');

  // STATES
  const [formdata, setFormdata] = useState({
    title: '',
    text: '',
  });
  const [postResponse, setPostResponse] = useState('');

  // REFS
  const textAreaRef = useRef(null);

  // CONSTS
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = Cookies.get('jwt-authorization');

  useEffect(() => {
    if (!cookie) {
      navigate('/');
    }

    if (location.state && location.state.post) {
      setFormdata({
        title: location.state.post.title,
        text: location.state.post.text,
      });
    }
  }, [cookie, location.state, navigate]);

  const handleOnChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleAutoResize = (e) => {
    if (!e || !e.target) return;
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [formdata.text]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${API_BASE_URL}/posts/${location.state.post._id}`, formdata, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
        .then((result) => {
          setPostResponse(result.data);
          navigate('/blog');
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="posterboard">
      <section className="posterboard_container">
        <section className="posterboard_header">
          <h1>Edit Post</h1>
        </section>

        <section className="posterboard_main">
          <section className="posterboard_form">
            <h2>Update Post</h2>
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
                  ref={textAreaRef}
                  value={formdata.text}
                  onChange={handleOnChange}
                  onInput={handleAutoResize}
                  rows={5}
                  required
                />
              </div>
              <button type="submit">Update</button>
              {postResponse && (
                <div className="response">
                  <p>{postResponse ? postResponse : ' '}</p>
                </div>
              )}
            </form>
          </section>
        </section>
      </section>
    </div>
  );
}
