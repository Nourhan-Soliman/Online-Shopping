import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Cart({ removeFromCart, updateCartItemAmount }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCartItems);
    }, []);

    // Update localStorage whenever cart items change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const orderPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    const deliveryFee = 10;
    const totalPrice = orderPrice + deliveryFee;

    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        removeFromCart(id);
    };

    const handleUpdateCartItemAmount = (id, newAmount) => {
        if (newAmount < 1) return; // Prevents decreasing below 1
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, amount: newAmount, totalPrice: item.price * newAmount } : item
        );
        setCartItems(updatedCart);
        updateCartItemAmount(id, newAmount);
    };

    return (
        <div style={{ paddingTop: '40px' }} className='container'>
            <h2 style={{ fontSize: "50px", fontWeight: "bold" }}>YOUR CART</h2>
            {cartItems.length === 0 ? (
                <h1 style={{ fontSize: "20px" }}>Your cart is empty.</h1>
            ) : (
                <div className="d-flex justify-content-between container pt-5 pb-5 my_cart ">
                    <div className="d-flex flex-column" style={{ width: "500px" }}>
                        {cartItems.map((item) => (
                            <div key={item.id} style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px' }} className="d-flex">
                                <img
                                    src={item.imageCover.secure_url}
                                    alt={item.title}
                                    style={{ height: "150px", width: "150px", marginRight: "20px" }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h4>{item.title}</h4>
                                    <h6>Size: {item.size}</h6>
                                    <p>Price: ${item.price}</p>
                                    <p>Total: ${(item.totalPrice).toFixed(2)}</p>
                                    
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn"
                                            style={{ fontSize: "20px", marginRight: "10px", cursor: "pointer" }}
                                            onClick={() => handleUpdateCartItemAmount(item.id, item.amount - 1)}
                                            disabled={item.amount <= 1}
                                        >-</button>
                                        <span>{item.amount}</span>
                                        <button
                                            className="btn"
                                            style={{ fontSize: "20px", marginLeft: "10px", cursor: "pointer" }}
                                            onClick={() => handleUpdateCartItemAmount(item.id, item.amount + 1)}
                                        >+</button>
                                        <div
                                            className="text-danger ms-3"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className=' ' style={{ border: '1px solid #ccc', height: "287px", width: "400px", borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                        <h3 className='p-3'>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding:"0px 20px"}}>
                            <p>Order Price:</p>
                            <p style={{color:"red"}}>${orderPrice}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding:"0px 20px" }}>
                            <p>Delivery Fee:</p>
                            <p style={{color:"red"}}>${deliveryFee}</p>
                        </div>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', padding:"0px 20px" }}>
                            <p>Total Price:</p>
                            <p  style={{color:"red"}}>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Link to="/order" className="btn btn-dark  w-100">Go To Checkout →</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Cart.propTypes = {
    removeFromCart: PropTypes.func.isRequired,
    updateCartItemAmount: PropTypes.func.isRequired
};

export default Cart;
