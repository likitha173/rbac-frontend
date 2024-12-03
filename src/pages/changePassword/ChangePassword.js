import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

import "./ChangePassword.scss";
import { changePassword, logout, RESET } from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loader/Loader";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { oldPassword, newPassword, confirmPassword } = formData;

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    // Prepare user data for password update
    const userData = {
      oldPassword,
      password: newPassword,
    };

    try {
      // Dispatch the changePassword action
      await dispatch(changePassword(userData));

      // Logout the user after password change
      await dispatch(logout());

      // Reset the auth state
      await dispatch(RESET());

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <section className="change-password">
      <div className="container">
        <div className="form-container">
          <h2>Change Password</h2>
          <form onSubmit={updatePassword}>
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLock} /> Old Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLock} /> New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleInputChange}
              />
              <small>Password must be at least 8 characters long.</small>
            </div>
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faLock} /> Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="password-toggle">
              <input
                type="checkbox"
                id="showPassword"
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}{" "}
                Show Passwords
              </label>
            </div>

            {isLoading ? (
              <Spinner />
            ) : (
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;