import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import img1 from '../assets/login.6c7f5134 (1).png';
import logo from '../assets/logo-removebg-preview.png';


function PaymentCheckout({ clearCart }) {
    const [formData, setFormData] = useState({
        Name: '',
        Phone: '',
        email: '',
        address: '',
    });
    // const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();

        console.log("Form Data:", formData);

        // Show SweetAlert on successful order
        Swal.fire({
            title: 'Order Placed!',
            text: 'Your order will be delivered to you in 2 days.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            clearCart();
            navigate('/Home'); 
        });
    };

    return (
        <div className="payment-container d-flex justify-content-between">
            <div className="form-container">
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
                <h1>Place Order</h1>

                <form className="styled-form" onSubmit={submit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                            placeholder="Enter your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleInputChange}
                            placeholder="Enter your Phone"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your Address"
                        />
                    </div>


                    <button type="submit">
                        Place Order →
                    </button>
                </form>
            </div>

            <div className="img-container">
                <img src={img1} alt="Payment" />
            </div>
        </div>
    );
}

export default PaymentCheckout;
