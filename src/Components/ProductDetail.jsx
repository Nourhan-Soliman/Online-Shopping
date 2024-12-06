import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function ProductDetails({ addToCart }) {
    const Base = "https://e-commerce-app-production-97d2.up.railway.app/api";
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();

    useEffect(() => {
        fetch(`${Base}/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
                setSelectedImage(data.product.imageCover.secure_url);
            })
            .catch((err) => console.error("Error fetching product:", err));
    }, [productId]);

    if (!product) return <p>Loading product details...</p>;

    const notify = () => toast("Please select a product size!");

    const handleAddToCart = () => {
        if (!selectedSize) {
            notify();
        } else {
            addToCart({ ...product, quantity }, selectedSize);
            toast.success("Product added to cart successfully!");
        }
    };

    const increaseQuantity = () => setQuantity((prevQty) => prevQty + 1);
    const decreaseQuantity = () => setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    return (
        <div className="d-flex justify-content-between container  pt-5 pb-5 details" style={{ width: "", height: "100%" }}>
            <div className="sub_img d-flex flex-column align-items-center pt-5 ">
                <img
                    src={selectedImage}
                    alt={product.title}
                    style={{ height: "300px", width: "300px", marginBottom: "20px" }}
                />
                {product.images &&
                    chunkArray(product.images, 3).map((row, rowIndex) => (
                        <div key={rowIndex} className="d-flex justify-content-between mb-2">
                            {row.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.secure_url}
                                    alt={`Product image ${rowIndex * 3 + index + 1}`}
                                    style={{ height: "100px", width: "100px", margin: "5px", cursor: "pointer" }}
                                    onClick={() => setSelectedImage(img.secure_url)}
                                />
                            ))}
                        </div>
                    ))}
            </div>

            <div style={{ }} className='detailtow pt-5'>
                <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>{product.title}</h3>
                <div style={{ color: "#fcc419", fontSize: "20px", cursor: "pointer" }}>
                    <i className="bi bi-star-fill m-2"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill m-2"></i>
                    <i className="bi bi-star-half"></i>
                    <i className="bi bi-star ms-2"></i>
                </div>
                <h1 style={{ fontSize: "22px", fontWeight: "bold", margin: "20px" }}>Price: ${product.price}</h1>

                <p style={{ fontSize: "15px", color: "#777", maxWidth: "420px" }}>{product.description}</p>
                <hr />

                <div>
                    <p style={{ fontSize: "20px", color: "#777" }}>Select Size</p>
                    <div className="d-flex gap-2">
                        {["S", "M", "L", "XL", "2XL"].map((size) => (
                            <button
                                key={size}
                                className={`btn btn-outline-dark ${selectedSize === size ? 'active' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <hr />

                <div className="d-flex justify-content-evenly align-items-center">
                    <div
                        className="d-flex justify-content-evenly align-items-center"
                        style={{
                            backgroundColor: "#eee",
                            fontWeight: "bold",
                            width: "200px",
                            height: "50px",
                            borderRadius: "30px",
                            fontSize: "20px",
                        }}
                    >
                        <button className="btn" style={{ fontSize: "25px" }} onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button className="btn" style={{ fontSize: "25px" }} onClick={increaseQuantity}>+</button>
                    </div>
                    <button className="btn btn-dark btn-lg" style={{ maxWidth: "300px", flex: "1", borderRadius: "30px" }} onClick={handleAddToCart}>
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}

ProductDetails.propTypes = {
    addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
