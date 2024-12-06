import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import img1 from '../assets/login.6c7f5134 (1).png';
import logo from '../assets/logo-removebg-preview.png';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');


    const navigate = useNavigate();


    async function submit(e) {
        e.preventDefault();

        let flag = true;
        if (name === "" || email === "") {
            flag = false;
        }

        if (!flag) return;

        try {
            const response = await axios.post(
                "https://saraha874.onrender.com/users/signup",
                {
                    name: name,
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                }
            );
            console.log(response.data);

           

            navigate('/login'); 


        } catch (error) {
            if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                if (error.response.status === 422) {
                    setEmailError('Email already exists');
                } else if (error.response.status === 403) {
                    setEmailError('Email already exists');
                } else {
                    setEmailError('An error occurred. Please try again.');
                }
            }
        }
    }

    
    const handleSignUp = () => {
        navigate('/login');
    };

    return (
        <div className='login-container d-flex justify-content-between' >
            <div className='form-container'>      
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
            <h6>Welcome !!!</h6>
            <h1>Sing Up</h1>
            <form className="styled-form" onSubmit={submit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                />
                {name === "" && <p className='error'>User Name is required</p>}
                

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                { emailError && <p className='error'>{emailError}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

<button type="submit">
                        Sign Up →
                    </button>

                    <p className="signup-text">
                         have an account? 
                        <span onClick={handleSignUp}> <Link to="/login" className="signup-link">Login </Link> </span>
                    </p>
            </form>
        </div>
        <div className='img-container'>
                <img src={img1} alt="Login" />
            </div>
        </div>
    );
}

export default SignUp;
