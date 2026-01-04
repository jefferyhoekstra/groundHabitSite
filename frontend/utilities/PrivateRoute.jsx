// import
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// function
export default function PrivateRoute() {
  const cookie = Cookies.get('jwt-authorization');
  return cookie ? <Outlet /> : <Navigate to="/" />;
}
