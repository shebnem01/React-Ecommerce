import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { BiUserCircle, BiChevronDown } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ROUTER } from "shared/constant/router";
import Logo from "shared/components/Logo/Logo";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "redux/slice/authSlice";
import {
  AdminOnlyLink,
  ShowLogin,
  ShowLogout,
} from "feature/header/components/hiddenLinks/HiddenLinks";
import Search from "shared/components/Search/Search";
import {
  CALCULATE_SUB_QUANTITY,
  selectCartItems,
  selectSubQuantity,
} from "redux/slice/cartSlice";

const Header = () => {
  const [actieMenu, setActiveMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectSubQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
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
  useEffect(() => {
    dispatch(CALCULATE_SUB_QUANTITY(cartItems));
  }, [dispatch, cartItems]);
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
      <div className={styles["header-top"]}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-3 col-4">
              <Link to={ROUTER.HOME}>
                <Logo />
              </Link>
            </div>
            <div className="col-md-5 d-none d-lg-block">
              <Search />
            </div>
            <div className="col-lg-3 col-8">
              <div className={styles["header-group"]}>
                <div className={styles["header-group-item"]}>
                  <div
                    onClick={() => setShowSearch((prevState) => !prevState)}
                    className={styles["search-icon"]}
                  >
                    <RiSearchLine size={24} />
                  </div>
                  <div
                    className={
                      showSearch
                        ? `${styles["search-modal"]} ${styles.active}`
                        : `${styles["search-modal"]}`
                    }
                  >
                    <div
                      className={styles.close}
                      onClick={() => setShowSearch((prevState) => !prevState)}
                    >
                      <GrClose size={20} />
                    </div>
                    <div className={styles["search-wrap"]}>
                      {" "}
                      <Search />{" "}
                    </div>
                  </div>
                </div>

                <ShowLogout>
                  <div className={styles["header-group-item"]}>
                    <Link to={ROUTER.LOGIN}>
                      <BiUserCircle size={24} />
                      <div className={styles["header-text"]}>Profile</div>
                    </Link>
                  </div>
                </ShowLogout>

                <ShowLogin>
                  <div
                    onClick={() => setShow((prevShow) => !prevShow)}
                    className={`${styles["profile"]} ${styles["header-group-item"]}`}
                  >
                    <BiUserCircle size={24} />
                    <div className={styles["header-text"]}>
                      Profile <BiChevronDown />
                    </div>
                    <div
                      className={
                        show
                          ? `${styles.active} ${styles["profile-dropdown"]}`
                          : `${styles["profile-dropdown"]}`
                      }
                    >
                      <div className={styles["dropdown-item"]}>{userName}</div>

                      <div className={styles["dropdown-item"]}>
                        <Link to={ROUTER.ORDERS}>my orders</Link>
                      </div>
                      <div className={styles["dropdown-item"]}>
                        <Link to={ROUTER.CART}>cart</Link>
                      </div>

                      <div className={styles["dropdown-item"]}>
                        <div
                          onClick={handleLogOut}
                          className={`${styles["logout"]} ${styles["header-group-item"]}`}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                </ShowLogin>

                <div
                  className={`${styles["my-cart"]} ${styles["header-group-item"]}`}
                >
                  <Link to={ROUTER.CART}>
                    <FiShoppingBag size={24} />
                    <p className={styles.badge}>{cartQuantity}</p>
                  </Link>
                </div>
                <div className={styles["open-menu"]} onClick={handleShow}>
                  <BsList size={30} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleShow}
        className={
          actieMenu ? `${styles.overlay} ${styles.active}` : `${styles.overlay}`
        }
      ></div>
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
            <GrClose size={25} />
          </div>
        </div>
        <nav>
          <ul className={styles.list}>
            <AdminOnlyLink>
              <li>
                <NavLink className={activeClassName} to={ROUTER.ADMIN}>
                  admin
                </NavLink>
              </li>
            </AdminOnlyLink>

            <li>
              <NavLink className={activeClassName} to={ROUTER.HOME}>
                home
              </NavLink>
            </li>
            <li>
              <NavLink className={activeClassName} to={ROUTER.PRODUCTS}>
                products
              </NavLink>
            </li>
            <li>
              <NavLink className={activeClassName} to={ROUTER.CONTACT}>
                contact us
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={`${styles["my-cart"]} ${styles["header-group-item"]}`}>
          <Link to={ROUTER.CART}>
            <FiShoppingBag size={24} />
            <p className={styles.badge}>0</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
