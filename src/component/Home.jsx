import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Loader from "./Loader.jsx";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuthenticated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  const handler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({
      type: "calculatePrice",
    });
    toast.success("Added to cart");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      {data.map((i) => (
        <ProductCard
          key={i.id}
          name={i.title}
          price={i.price}
          imgSrc={i.image}
          id={i.id}
          handler={handler}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc, isAuthenticated }) => {
  const navigate = useNavigate();
  const addToCartHandler = () => {
    if (isAuthenticated) {
      handler({ name, price, id, quantity: 1, imgSrc });
    } else {
      navigate("/login");
      toast.error("Please Login to add to cart!");
    }
  };
  return (
    <>
      <div className="productCard">
        <img src={imgSrc} alt={name} />
        <p>{name}</p>
        <h4>₹{price}</h4>
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
    </>
  );
};

export default Home;
