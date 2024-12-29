import React, { useState } from "react";
import "./Header.scss";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, RESET } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import { UserName } from "../../pages/profile/Profile";
import { AdminAuthorLink } from "../protect/hiddenLink";

const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <nav>
        <div className="logo" onClick={goHome}>
          <span>RBAC</span>
        </div>

        {/* Hamburger menu */}
        <div className="nav-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          {/* Show profile and logout for logged-in users */}
          <ShowOnLogin>
            <li className="profile-link">
              <FaUserCircle size={20} />
              <UserName />
            </li>

            {/* Profile link */}
            <li>
              <NavLink to="/profile" className={activeLink}>
                Profile
              </NavLink>
            </li>

            {/* Admin users link */}
            <AdminAuthorLink>
              <li>
                <NavLink to="/users" className={activeLink}>
                  Users
                </NavLink>
              </li>
            </AdminAuthorLink>

            {/* Logout button */}
            <li>
              <button onClick={logoutUser} className="--btn --btn-secondary">
                Logout
              </button>
            </li>
          </ShowOnLogin>

          {/* Show login link for logged-out users */}
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
