import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img1 from '../assets/hq8bmdr5vhfyebk9nvtm-removebg-preview.png';
import img2 from '../assets/zi9zvrjgupphmoa6otyl-removebg-preview.png';
import img3 from '../assets/ziuo5yxvdfvtl5bacsqc-removebg-preview.png';
import img4 from '../assets/web-sale_800x_3fe9498c-71f4-4e1f-8b29-5fa0380e1530-removebg-preview.png';
import img5 from '../assets/png-transparent-shopping-centre-graphy-retail-clothing-miscellaneous-child-photography-removebg-preview.png';
import img6 from '../assets/clock-icon-1024x1024-6y43zsm6-removebg-preview.png';
import img7 from '../assets/easy-returns7112-removebg-preview.png';
import img8 from '../assets/delivery-24-hours-black-logo-icon-sign-free-png-704081694706262kkxyrklen4-removebg-preview.png';

import img9 from '../assets/2202194-200-removebg-preview.png';
import Categories from './Categories';
// import { Link as ScrollLink } from 'react-scroll';

const images = [img1, img2, img3];
const Base = "https://e-commerce-app-production-97d2.up.railway.app/api";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios.get(`${Base}/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div id="home" className='container d-flex mt-5'>
        <div className="home-screen">
          <div>
            <h1 >FIND CLOTHES THAT MATCH YOUR STYLE</h1>
            <p style={{ width: "80%" }}>
              At Fashion Essence, we believe that every woman deserves to feel beautiful, confident, and unique.
              Our store offers a carefully curated collection of high-quality, trendy, and elegant clothing.
            </p>
            <button className="shop_button">
              <Link to="/productList" style={{ color: 'white', textDecoration: 'none' }}>
                Shop Now →
              </Link>
            </button>
          </div>
          <div className="slider" style={{ transition: 'transform 0.5s ease-in-out' }}>
            <img
              className="slide"
              src={images[currentIndex]}
              alt="Fashion"
              style={{ borderRadius: '8px' }}
            />
          </div>
        </div>

        <div className="card_container">
          <div className="cardd">
            <h2>NEW ARRIVALS</h2>
            <h3>SUMMER <br />SALE 20% OFF</h3>
            <p>Shop Now →</p>
            <div className='card_img'>
              <img src={img5} alt="Fashion" style={{ width: '200px', height: "150px" }} />
            </div>
          </div>
          <div className="cardd">
            <h2>KIDS 4K</h2>
            <h3>SALE & <br /> NEW ARRIVAL</h3>
            <p>Shop Now →</p>
            <div className='card_img'>
              <img src={img4} alt="Fashion" style={{ width: '200px', height: "150px" }} />
            </div>
          </div>
        </div>


      </div>

      <div id="products" className="container pt-5">
        <div className='Head1'><h1>OUR PRODUCTS</h1></div>
        <div className='product-list container'>
          {products.slice(2, 6).map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.imageCover.secure_url} alt={product.title} />
              <h4>{product.title.slice(0, 12)} ...</h4>
              <p style={{ textAlign: "center", fontSize: "10px" }}>Price: ${product.price}</p>
            </div>
          ))}
        </div>

        <div className="view_all">
          <button>
            <Link className='text-decoration-none text-light' to="/productList"> View All →</Link>
          </button>
        </div>
      </div>

      <div id="services" className='services mt-5'>
        <div className='Head1'><h1>OUR SERVICES</h1></div>

        <div className="row justify-content-center ">
          <div className="col-12 col-md-3 d-flex flex-column align-items-center ">
            <img src={img9} alt="Ethical Sourcing" className="mb-3" />
            <h3 >Ethically-Sourced</h3>
            <p>Our clothing is carefully curated from ethical manufacturers around the globe.</p>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column align-items-center">
            <img src={img7} alt="Easy Returns" className="mb-3" />
            <h3>Return & Exchange</h3>
            <p>Easily return or exchange your item within 30 days of purchase.</p>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column align-items-center">
            <img src={img8} alt="Fast Delivery" className="mb-3" />
            <h3>Fast Delivery</h3>
            <p>Fast delivery on all orders. Just Within 2 Days Your Order is Delivered.</p>
          </div>
          <div className="col-12 col-md-3 d-flex flex-column align-items-center">
            <img src={img6} alt="24/7 Availability" className="mb-3" />
            <h3>Available</h3>
            <p>Available 7 days a week, 24 hours a day. Ready to receive your requests.</p>
          </div>
        </div>
      </div>

      <div id="categories">
        <Categories />
      </div>

      <div className="scroll-nav">
     
      </div>
    </div>
  );
}

export default Home;
