import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../redux/features/auth/authService";
import {
  login,
  RESET,
} from "../../redux/features/auth/authSlice";
import "./Login.scss";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } =
    useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isSuccess, isLoggedIn, navigate, dispatch]);

  return (
    <div className="login-page">
      {isLoading && <Loader />}
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please enter your details to log in.</p>
        <form onSubmit={loginUser} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn login-btn">
            <BiLogIn /> Login
          </button>
        </form>
        <div className="links">
          <Link to="/forgot" className="forgot-link">
            Forgot Password?
          </Link>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
