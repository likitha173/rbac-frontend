import React, { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Join Us"}</h2>
        <p>{isLogin ? "Log in to access your personalized dashboard." : "Sign up to explore all the features based on your role."}</p>

        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your full name" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="--btn --btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
