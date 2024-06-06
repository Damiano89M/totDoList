import{useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './userSlice';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
         dispatch(logoutUser(null));
        navigate('login');
    }, [navigate]);
  return (
    <div>
      <h2>Login out...</h2>
    </div>
  )
}

export default Logout
