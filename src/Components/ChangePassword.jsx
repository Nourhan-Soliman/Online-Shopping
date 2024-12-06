import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import img1 from '../assets/login.6c7f5134 (1).png';
import logo from '../assets/logo-removebg-preview.png';


const cookies = Cookie();

function ChangePassword() {
    const [formData, setFormData] = useState({ password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'https://saraha874.onrender.com/users/changePasswordOfUser'; 

        const token = cookies.get('cookie'); 

        if (!token) {
            setError('You must be logged in to change your password.');
            return;
        }

        try {
            const response = await axios.put(
                url, 
                formData,  
                {
                    headers: {
                        'token': token  
                    }
                }
            );

            console.log('Password changed successfully:', response.data);
            navigate('/login');  
        } catch (error) {
            console.error('Error changing password:', error);
            setError('An unexpected error occurred. Please try again.'); 
        }
    };

    return (
        <div className="login-container d-flex justify-content-between">
            <div className="form-container">
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                <h1>Change Password</h1>
                {error && <p className="error">{error}</p>} 
                <form className="styled-form" onSubmit={handleSubmit}>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your new password..."
                        value={formData.password}
                        onChange={handleChange}  
                        required
                    />
                    <button type="submit" style={{width:"200px" , height:"30px"}}>Update Password →</button>
                </form>
            </div>

            <div className="img-container">
                <img src={img1} alt="Change Password" />
            </div>
        </div>
    );
}

export default ChangePassword;
