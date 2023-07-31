import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggediIn } from "redux/authSlice";

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
