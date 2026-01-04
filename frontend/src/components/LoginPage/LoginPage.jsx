// import
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

// components
import LoginForm from './LoginForm.jsx';

// css
import './loginPage.css';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://ground-habit-site.vercel.app'
).replace(/\/$/, '');

// function
export default function LoginPage() {
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
  });
  const [postResponse, setPostResponse] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // USE EFFECT

  // Handlers
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleLogin = (jwtToken) => {
    Cookies.set('jwt-authorization', jwtToken);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/login`, formdata).then((result) => {
        setFormdata({ username: '', password: '' });
        setPostResponse(result.data.message);
        console.log(result.data.message);
        if (result.data.message === 'Login successful') {
          handleLogin(result.data.token);
          navigate('/scroll');
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container-1">
      <h1>Login</h1>
      <LoginForm
        handleOnChange={handleChange}
        handleOnSubmit={handleSubmit}
        formdata={formdata}
        postResponse={postResponse}
        btnText={'Login'}
      />
      <p>
        {/* Not a member yet? Click <Link to={'/create-user'}>here</Link> to
        register. */}
        Not a member yet? Contact website owner.
      </p>
      {location.state && <h3>{location.state.message}</h3>}
    </div>
  );
}
