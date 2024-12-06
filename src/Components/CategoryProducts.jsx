import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import Products from './Products'; // Assuming you have a Products component

function CategoryProducts() {
  const { categoryId } = useParams(); // Get categoryId from the route
  const [products, setProducts] = useState([]);
  const Base = "https://e-commerce-app-production-97d2.up.railway.app/api";

  useEffect(() => {
    axios.get(`${Base}/products?category=${categoryId}`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  return (
    <div className="products-section">
      <div className="Head1">
        <h1>OUR PRODUCTS</h1>
      </div>
      <div className="container pt-5 pb-5">
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="pro_style">
                <Products product={product} /> 
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
