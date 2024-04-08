import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-hot-toast";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    navigate("/");
    setIsAuthenticated(false);
    toast.success("Logout Successfully");
  };
  const logInHandler = () => {
    navigate("/login");
  };
  return (
    <nav>
      <h2>Ecommerce..</h2>

      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>
          <FiShoppingBag />
          <p>{cartItems.length}</p>
        </Link>
        {isAuthenticated ? (
          <button onClick={logOutHandler} className="btn">
            <CiLogout className="icon" />
          </button>
        ) : (
          <button onClick={logInHandler} className="btn">
            <CiLogin className="icon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
