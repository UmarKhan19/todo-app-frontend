import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useContext(Context);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("User Login successfully!!!!");
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="true"
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button disabled={isLoading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to={"/register"}>SignUp</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
