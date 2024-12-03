import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import "./ChangeRole.scss";

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();

  // Change User Role
  const changeRole = async (e) => {
    e.preventDefault();

    if (!userRole) {
      toast.error("Please select a role");
      return;
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    await dispatch(upgradeUser(userData));
    await dispatch(getUsers());
  };

  return (
    <div className="change-role">
      <form className="change-role-form" onSubmit={changeRole}>
        <div className="dropdown-container">
          <select
            className="role-dropdown"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="customer">Customer</option>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <button className="submit-btn" title="Save Role">
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;