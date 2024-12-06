import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import img1 from '../assets/login.6c7f5134 (1).png';
import Cookie from "cookie-universal";
import { jwtDecode } from "jwt-decode";
import logo from '../assets/logo-removebg-preview.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const cookie = Cookie();

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://saraha874.onrender.com/users/signin", 
                {
                    email: email,
                    password: password,
                }
            );

            console.log("Login successful:", response.data);
            navigate('/productList'); 

            cookie.set("cookie", response.data.token);

            const decoded = jwtDecode(response.data.token); // Use jwt_decode
            console.log(decoded);
            console.log(decoded.name);

            cookie.set("userName", decoded.name);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage('Invalid email or password.');
                } else {
                    setErrorMessage('An unexpected error occurred.');
                }
            }
        }
    }

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className='login-container d-flex justify-content-between'>
            <div className='form-container'>
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
            <h1>Sign In</h1>

                <form className="styled-form" onSubmit={submit}>
                    <label htmlFor="logemail">Email:</label>
                    <input
                        type="email"
                        id="logemail"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorMessage && <p className='error'>{errorMessage}</p>}

                    <label htmlFor="logpassword">Password:</label>
                    <input
                        type="password"
                        id="logpassword"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  

                    <button type="submit">
                        Login →
                    </button>

                    <p className="signup-text">
                        Don’t have an account? 
                        <span onClick={handleSignUp}> <Link to="/signup" className="signup-link">Sign Up</Link> </span>
                    </p>
                </form>
            </div>

            <div className='img-container'>
                <img src={img1} alt="Login" />
            </div>
        </div>
    );
}

export default Login;
