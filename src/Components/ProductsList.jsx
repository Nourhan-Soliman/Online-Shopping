import { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const Base = "https://e-commerce-app-production-97d2.up.railway.app/api";

  useEffect(() => {
    axios.get(`${Base}/products`)
      .then((res) => {
        console.log(res.data);

        setProducts(res.data.products || []); 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container pt-5 pb-5">
      <div className="Head1">
        <h1>OUR PRODUCTS</h1>
      </div>
      <div className=" product-list ">
        {products.map((product) => (
          <div key={product._id} className="pro_style">

          <Products  product={product} /> 
          </div>
        ))} 
      </div>
    </div>
  );
}

export default ProductsList;
