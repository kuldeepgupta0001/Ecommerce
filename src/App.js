import "./styles/app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/Header";
import Cart from "./component/Cart";
import { Toaster } from "react-hot-toast";
import Login from "./component/Login";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("authenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(token ? token : false);
  return (
    <BrowserRouter>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route
          path="/cart"
          element={<Cart isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
