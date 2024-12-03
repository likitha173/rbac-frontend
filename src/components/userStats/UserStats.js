import React, { useEffect } from "react";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_SUSPENDED_USER
} from "../../redux/features/auth/authSlice";
import InfoBox from "../infoBox/InfoBox";
import "./UsersStats.scss";

// Icons
const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserStats = () => {
  const dispatch = useDispatch();
  const { users, suspendedUsers } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <div className="stat-card card1">
          <div className="card-icon">{icon1}</div>
          <div className="card-content">
            <h4>Total Users</h4>
            <p>{users.length}</p>
          </div>
        </div>
        <div className="stat-card card4">
          <div className="card-icon">{icon4}</div>
          <div className="card-content">
            <h4>Suspended Users</h4>
            <p>{suspendedUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;