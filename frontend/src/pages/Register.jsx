import { useRegisterMutation } from '../service/authService';
import { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [register, { isLoading, error }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await register({ name, email, password, password_confirmation }).unwrap();
            console.log(userData);
        } catch (error) {
            console.log(error);
        }
    }

    
    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-md-6">
                        <h2 className='text-center mb-5'>Registrati</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name='name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            <div className="mb-3">
                                <label htmlFor="password_confirmation" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password_confirmation"
                                    name='password_confirmation'
                                    onChange={(e) => setPassword_confirmation(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Registrati</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
