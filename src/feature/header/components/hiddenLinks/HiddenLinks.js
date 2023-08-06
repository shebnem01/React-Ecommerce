import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggediIn,selectEmail } from "redux/slice/authSlice";

export const ShowLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggediIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
};
export const ShowLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggediIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};
export const AdminOnlyLink=({ children }) => {
  const email = useSelector(selectEmail);
  if (email==="test@gmail.com") {
    return children;
  }
  return null;
};
export const AdminOnlyRoute=({ children }) => {
  const email = useSelector(selectEmail);
  const navigate=useNavigate();
  if (email==="test@gmail.com") {
    return children;
  }
  return (
    <div className="container">
      <div className="alert alert-warning text-center my-5 py-5">
      <h2>Permission Denied</h2>
      <p>This page can only be view by an admin user.</p>
      <button onClick={()=>navigate("/")}>back to home</button>
    </div>
    </div>
  );
};