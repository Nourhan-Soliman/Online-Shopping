import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo-removebg-preview.png';
import PropTypes from 'prop-types';
import Cookie from 'cookie-universal';
import Categories from './Categories';
import { Link as ScrollLink } from 'react-scroll';
const cookies = Cookie();

function Header({ cartItems = [] }) {
    const [user, setUser] = useState(null);
    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
        const userName = cookies.get('userName'); 

        if (userName) {
            setUser(userName);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        cookies.remove('cookie'); 
        cookies.remove('userName'); 
        setShowUserInfo(false);
    };

    const toggleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ top: 0, width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
            <div className="container-fluid">
                <button
                    className="navbar-toggler d-lg-none me-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                </Link>

                <div className="collapse navbar-collapse mx-auto" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item ms-4">
                            <ScrollLink className="nav-link fw-bold" to="home" smooth={true} duration={500} style={{ cursor:"pointer",fontSize: "20px", color: "black" }}>
                                Home
                            </ScrollLink>
                        </li>
                        <li className="nav-item ms-4">
                            <ScrollLink className="nav-link fw-bold" to="services" smooth={true} duration={500} style={{cursor:"pointer", fontSize: "20px", color: "black" }}>
                                Services
                            </ScrollLink>
                        </li>
                        <li className="nav-item ms-4">
                            <ScrollLink className="nav-link fw-bold" to="categories" smooth={true} duration={500} style={{ cursor:"pointer",fontSize: "20px", color: "black" }}>
                                Categories
                            </ScrollLink>
                        </li>
                        <li className="nav-item ms-4">
                            <ScrollLink className="nav-link fw-bold" to="products" smooth={true} duration={500} style={{cursor:"pointer", fontSize: "20px", color: "black" }}>
                                Products
                            </ScrollLink>
                        </li>
                    </ul>
                </div>

                <ul id="userInfo" className="navbar-nav ms-auto">
                    {user ? (
                        <div className='d-flex align-items-center'>
                            {showUserInfo && (
                                <div className="user-dropdown">
                                    <li className="nav-item">
                                        <span className="nav-link" id="user">Hello, {user}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link  btn-link text-light text-decoration-none" onClick={handleLogout}>
                                            Log Out
                                        </button>
                                    </li>
                                    {/* Add a Link to Change Password page */}
                                    <li className="nav-item">
                                        <button>
                                        <Link to="/change-password" className="nav-link  btn-link text-light text-decoration-none">
                                            Change Password
                                        </Link></button>
                                    </li>
                                </div>
                            )}
                            <li className="nav-item" onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>
                                <i className="bi bi-person-circle fw-bold" style={{ fontSize: "30px", marginRight: "10px" }}></i>
                            </li>
                            <li className="nav-item shopping-cart">
                                <Link className="nav-link" to="cart">
                                    <i className="bi bi-cart-fill fw-bold icone" style={{ fontSize: "30px", color: "black" }}></i>
                                    <span className="badge">{cartItems.length}</span>
                                </Link>
                            </li>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-between'>
                            <li className="nav-item me-3">
                                <Link className="nav-link text-light fw-bold rounded-pill text-decoration-none bg-dark" to="/login" style={{ width: "100px", textAlign: "center" }}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold rounded-pill text-decoration-none bg-dark" to="/signup" style={{ width: "100px", textAlign: "center" }}>Sign Up</Link>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    );
}

// PropTypes validation
Header.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

export default Header;
