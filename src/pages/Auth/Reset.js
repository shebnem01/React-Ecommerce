import React, { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "shared/components/Loader/Loader";
import { ROUTER } from "shared/constant/router";
const Reset = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleResetPassword = (e) => {
    const { email } = user;
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.auth}>
        <form onSubmit={handleResetPassword}>
          <div className={styles.title}>Reset </div>
          <input
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Email"
          />
          <button className={styles.btn}>Reset password</button>
          <div className="d-flex align-items-center justify-content-between">
            {" "}
            <span>
              <Link to={ROUTER.LOGIN}>Login</Link>
            </span>
            <span>
              <Link to={ROUTER.REGISTER}>Register</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reset;
