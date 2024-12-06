import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import img1 from '../assets/brand.png';

function Categories() {
  const [categories, setCategories] = useState([]);
  const Base = "https://e-commerce-app-production-97d2.up.railway.app/api";
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get(`${Base}/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="categories container ">
     

      <div className="category-cards d-flex ">
      <div className="categories-header     ">
        <h2>Shop by <br />  categories</h2>
        <div className='icon_part d-flex align-items-center'>
          <img className='' src={img1} alt="Login" />
          <p>200+ <br /> Unique products</p>
        </div>
      </div>
        {categories.map((category) => (
          <div
            key={category._id}
            className=" m-3 "
            onClick={() => handleCategoryClick(category._id)}
          >
           <p className="category-name">{category.name}</p>

            <div className="Cat-img">
              <img src={category.image.secure_url} alt={category.name} className="category-image" />
            </div>
            <div className='text-center '>
            <button
              className=" view-all-btn "
              onClick={() => handleCategoryClick(category._id)}
            >
              View All
            </button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
