import {useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

if (!user) {
      return <Navigate to='/login' state={{ from: location }} replace />
    }
    return children;
}

export default PrivateRoute
