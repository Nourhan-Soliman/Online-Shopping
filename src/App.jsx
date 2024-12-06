import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import Products from './Components/Products';
import SignUp from './Components/SignUp';
import ChangePassword from './Components/ChangePassword';
import ProductDetail from './Components/ProductDetail';
import ProductsList from './Components/ProductsList';
import Cart from './Components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer';
import CategoryProducts from './Components/CategoryProducts';
import PaymentCheckout from './Components/PaymentCheckout';

function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.size === size);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.size === size
                        ? { 
                            ...item, 
                            amount: item.amount + product.quantity,  // إضافة الكمية
                            totalPrice: (item.amount + product.quantity) * product.price 
                        }
                        : item
                );
            } else {
                return [...prevItems, { 
                    ...product, 
                    size, 
                    id: product.id || Date.now(), 
                    amount: product.quantity,  // إضافة الكمية
                    totalPrice: product.price * product.quantity
                }];
            }
        });
    };
    
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateCartItemAmount = (id, newAmount) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, amount: newAmount, totalPrice: newAmount * item.price } : item
            )
        );
    };

    return (
        <>
            <ToastContainer 
                position="top-center" 
                autoClose={8000} 
                hideProgressBar={true}
            />
            <Header cartItems={cartItems} />
           
            <Routes>
                <Route 
                    path="/cart" 
                    element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateCartItemAmount={updateCartItemAmount} />} 
                />
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="product" element={<Products />} />
                <Route path="Home" element={<Home />} />

                <Route 
                    path="product/:productId" 
                    element={<ProductDetail addToCart={addToCart} />} 
                />
                <Route path="productList" element={<ProductsList />} />
                <Route path="/change-password" element={<ChangePassword />} />
                {/* <Route path="/footer" element={<Footer />} /> */}
                <Route path="/category/:categoryId" element={<CategoryProducts />} />
                <Route
    path="/order"
    element={<PaymentCheckout clearCart={() => setCartItems([])} />}
/>


            </Routes>
            <Footer />
        </>
    );
}

export default App;
