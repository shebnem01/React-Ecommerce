import React, { useCallback, useState } from "react";
import styles from "./Auth.module.css";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { ROUTER } from "shared/constant/router";
import Loader from "shared/components/Loader/Loader";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    cPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = useCallback(
    (e) => {
      const { email, password } = user;
      e.preventDefault();
      if (!email || !password) {
        toast.error("Email and password required");
        return;
      }
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          toast.success("Login Successfully...");
          navigate(ROUTER.HOME);
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    },
    [user]
  );
  const handleChange = (e) => {
    user[e.target.name] = e.target.value;
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.auth}>
        <form onSubmit={handleLogin}>
          <div className={styles.title}>Login</div>
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
          <span className={styles.text}>
            <BsFillEnvelopeFill />
            <Link to={ROUTER.RESET}>
              <span className="ps-2">Reset password</span>
            </Link>
          </span>
          <button className={styles.btn}>login</button>
          <span>
            Don't have an account ? <Link to={ROUTER.REGISTER}>Register</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
