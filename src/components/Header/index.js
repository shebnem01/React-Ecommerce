import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { BiSearch, BiUser } from "react-icons/bi";
import { BsFillCartFill, BsList } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ROUTER } from "shared/constant/router";
import Logo from "feature/header/components/Logo/Logo";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "redux/authSlice";
import {
  ShowLogin,
  ShowLogout,
} from "feature/header/components/hiddenLinks/HiddenLinks";

const Header = () => {
  const [actieMenu, setActiveMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("component yaradildi");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName } = user;
        const uid = user.uid;
        let dinamicUserName = user.email.split("@")[0];
        if (user.displayName) {
          setUserName(user.displayName);
        } else {
          setUserName(dinamicUserName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email,
            userName: displayName ? displayName : dinamicUserName,
            uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const handleShow = () => {
    setActiveMenu((prevActiveMenu) => !prevActiveMenu);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate(ROUTER.HOME);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const activeClassName = ({ isActive }) =>
    isActive ? `${styles.active}` : "";
  return (
    <header className={styles.header}>
      <div className="container-fluid">
        <div className={styles["header-top"]}>
          <div className="row">
            <div className="col-lg-4 col-md-5 d-flex align-items-center gap-2">
              <div className={styles["open-menu"]} onClick={handleShow}>
                <BsList size={30} />
              </div>
              <div className={styles.search}>
                <form action="">
                  <input
                    className={styles["search-input"]}
                    type="text"
                    placeholder="Enter your keyword"
                  />
                  <button className={styles["search-btn"]}>
                    <BiSearch size={23} />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center">
              <Logo />
            </div>
            <div className="col-lg-4">
              <div className={styles["header-group"]}>
                <ShowLogin>
                  <div
                    className={`${styles["my-account"]} ${styles["header-group-item"]}`}
                  >
                    <BiUser size={24} />
                    <div className={styles["header-text"]}>{userName}</div>
                  </div>
                </ShowLogin>
                <ShowLogout>
                  <div
                    className={`${styles["login"]} ${styles["header-group-item"]}`}
                  >
                    <Link to={ROUTER.LOGIN}>
                      <BiUser size={24} />
                      <div className={styles["header-text"]}>LOGIN</div>
                    </Link>
                  </div>
                </ShowLogout>
               <ShowLogin>
               <div
                  onClick={handleLogOut}
                  className={`${styles["logout"]} ${styles["header-group-item"]}`}
                >
                  <Link to={ROUTER.HOME}>
                    <LuLogOut size={24} />
                    <div className={styles["header-text"]}>Logout</div>
                  </Link>
                </div>
               </ShowLogin>
              <ShowLogin>
              <div
                  className={`${styles["my-orders"]} ${styles["header-group-item"]}`}
                >
                  <Link to={ROUTER.ORDERS}>
                    <MdFavoriteBorder size={24} />
                    <div className={styles["header-text"]}>my orders</div>
                  </Link>
                </div>
              </ShowLogin>

                <div
                  className={`${styles["my-cart"]} ${styles["header-group-item"]}`}
                >
                  <Link to={ROUTER.CART}>
                    <BsFillCartFill size={24} />
                    <p className={styles.badge}>0</p>
                    <div className={styles["header-text"]}>cart</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            actieMenu
              ? `${styles.active} ${styles["header-bottom"]} `
              : `${styles["header-bottom"]} `
          }
        >
          <div className={styles["mobile-header"]}>
            <Logo />
            <div onClick={handleShow}>
              <GrClose size={40} />
            </div>
          </div>
          <nav>
            <ul className={styles.list}>
              <li>
                <NavLink className={activeClassName} to={ROUTER.ADMIN}>
                  admin
                </NavLink>
              </li>

              <li>
                <NavLink className={activeClassName} to={ROUTER.HOME}>
                  home
                </NavLink>
              </li>
              <li>
                <NavLink className={activeClassName} to={ROUTER.HOME}>
                  products
                </NavLink>
              </li>
              <li>
                <NavLink className={activeClassName} to={ROUTER.HOME}>
                  collection
                </NavLink>
              </li>
              <li>
                <NavLink className={activeClassName} to={ROUTER.CONTACT}>
                  contact us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
