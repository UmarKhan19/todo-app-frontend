import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(Context);
  const logout = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={isLoading} className="btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
