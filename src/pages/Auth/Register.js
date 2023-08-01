import React, { useCallback, useState } from "react";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ROUTER } from "shared/constant/router";
import Loader from "shared/components/Loader/Loader";
const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = useCallback(
    (e) => {
      const { email, password, cPassword } = user;
      e.preventDefault();
      if (password !== cPassword) {
        toast.error("Passwords don't match");
      }
      if (!email || !password || !cPassword) {
        toast.error("Email and password required");
        return;
      }
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setIsLoading(false);
          toast.success("Registration Successfully...");
          navigate(ROUTER.LOGIN);
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    },
    [user]
  );
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({...user,[name]:value})
  };
  return (
    <>
      <div className={styles.auth}>
        <form onSubmit={handleRegister}>
          <div className={styles.title}>Register </div>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            name="password"
            type="pasword"
            placeholder="Password"
          />
          <input
            onChange={handleChange}
            name="cPassword"
            type="pasword"
            placeholder="Confirm  Password"
          />
          <button type="submit" className={styles.btn}>
            Register
          </button>
          <span>
            Already an account ? <Link to={ROUTER.LOGIN}>Login</Link>
          </span>
        </form>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default Register;
