import {useState, useEffect} from 'react'
import { useLoginMutation } from '../../service/authService';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { userLoggedin } from './userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error, data }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.length < 6) {
            alert('Email length has to be 6 chars');
        }

        try {
             await login({ email, password }).unwrap();

        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        
        if (data && data.access_token) {
         
            dispatch(userLoggedin(data));
            navigate('/')
        }
    }, [dispatch,navigate, data])



  return (
    <>
    <div className="container">
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-6">
                <h2 className='text-center mb-5'>Accedi</h2>
                        {error && <h2 className='alert alert-danger'>{error.data.error}</h2>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrati</button>
                </form>
            </div>
        </div>
    </div>
</>
  )
}

export default Login
