import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './loginPage.css';

export default function RegisterPage() {
  const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  const [formdata, setFormdata] = useState({
    username: '',
    password: '',
  });
  const [postResponse, setPostResponse] = useState('');
  const navigate = useNavigate();

  //Handlers
  const handleOnChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted', formdata);
    try {
      await axios
        .post(`${API_URL}/register`, formdata)
        .then((result) => {
          console.log('Register response:', result.data);
          setFormdata({ username: '', password: '' });
          setPostResponse(result.data);
          if (result.data === 'User added') {
            navigate('/', {
              state: { message: 'User Added. Please login' },
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container-1">
      <h1>Register</h1>
      <LoginForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formdata={formdata}
        postResponse={postResponse}
        btnText={'Register'}
      />
      <p>
        Already a member? Click <Link to={'/'}>here</Link> to login.
      </p>
    </div>
  );
}
