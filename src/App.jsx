import axios from "axios";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import { Context, server } from "./main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, setIsLoading } =
    useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/user/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
