import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        return toast.error("Please fill all details!");
      }
      localStorage.setItem("authenticated", true);
      setIsAuthenticated(localStorage.getItem("authenticated"));
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login">
      <h2>Sign In</h2>
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        <div className="inputBox">
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="abcdrai57@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
