// import
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// css
import './scroll.css';

// function
export default function Scroll() {
  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL || 'https://ground-habit-site.vercel.app'
  ).replace(/\/$/, '');

  // STATES
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // CONSTS
  const navigate = useNavigate();
  const cookie = Cookies.get('jwt-authorization');

  useEffect(() => {
    if (cookie) {
      const decoded = jwtDecode(cookie);
      setCurrentUser(decoded.id);
    }
    axios.get(`${API_BASE_URL}/posts`).then((result) => {
      setPosts(result.data);
    });
  }, [cookie]);

  const handleEditPost = (post) => {
    navigate('/edit-post', {
      state: {
        post: {
          title: post.title,
          text: post.text,
          _id: post._id,
        },
        status: 'edit',
      },
    });
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios
        .delete(`${API_BASE_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
        .then((result) => {
          // refresh
        });

      await axios.get(`${API_BASE_URL}/posts`).then((result) => {
        setPosts(result.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPostDate = (post) => {
    if (post && post.createdAt) {
      const created = new Date(post.createdAt);
      if (!Number.isNaN(created.getTime())) return created;
    }

    if (post && post._id) {
      const objectId = String(post._id);
      if (objectId.length >= 8) {
        const seconds = Number.parseInt(objectId.substring(0, 8), 16);
        if (!Number.isNaN(seconds)) return new Date(seconds * 1000);
      }
    }

    return null;
  };

  const formatPostDate = (date) => {
    if (!date || Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
  };

  return (
    <div className="scroll">
      <section className="scroll_container">
        <section className="scroll_feed">
          <h1>Scroll</h1>
          {posts && posts.length ? (
            <div className="scroll_posts">
              {posts.map((post) => (
                <div className="scroll_post" key={post._id}>
                  <h3>{post.title}</h3>
                  <p className="scroll_meta">
                    By {post.author || 'Unknown'}
                    {formatPostDate(getPostDate(post))
                      ? ` • ${formatPostDate(getPostDate(post))}`
                      : ''}
                  </p>
                  <p>{post.text}</p>

                  {currentUser && post.author === currentUser && (
                    <div className="scroll_actions">
                      <button onClick={() => handleEditPost(post)}>Edit</button>
                      <button onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No posts yet.</p>
          )}
        </section>
      </section>
    </div>
  );
}
