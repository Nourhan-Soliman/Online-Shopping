import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Products({ product }) {
    // Check if product is undefined or null
    if (!product) {
        return <div>Loading...</div>; // Or a fallback UI
    }

    // Destructure product to avoid accessing undefined properties
    const { _id, title, price, imageCover } = product;

    return (
        <div className='d-flex justify-content-center align-items-center main-container pt-5'>
            <div className=" pt-3" style={{ width: "", height: "" }}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Link to={`/product/${_id}`} className="btn" style={{ textDecoration: "none" }}>
                        <div>
                            <img
                                src={imageCover?.secure_url}
                                alt={title}
                                style={{ height: "200px", width: "250px", borderRadius: "30px" }}
                            />
                        </div>
                        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
                            {title?.slice(0, 12)}
                        </h3>
                        <div style={{ color: "#fcc419" }}>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-half"></i>
                            <i className="bi bi-star"></i>
                        </div>
                        <p style={{ textAlign: "", fontSize: "18px", marginTop: "5px" }}>
                            Price: ${price}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Products.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        price: PropTypes.number,
        imageCover: PropTypes.shape({
            secure_url: PropTypes.string,
        }),
    }).isRequired,
};

export default Products;
