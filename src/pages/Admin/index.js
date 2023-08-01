import React from "react";
import styles from "./Admin.module.css";
import Navbar from "feature/admin/components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "feature/admin/components/home/Home";
import Orders from "feature/admin/components/orders/Orders";
import ViewProducts from "feature/admin/components/viewProducts/ViewProducts";
import AddProducts from "feature/admin/components/addProducts/AddProducts";
import { ROUTER } from "shared/constant/router";
const Admin = () => {
  return (
    <div className="container-fluid bg-light">
      <div className={styles.admin}>
        <div className="row">
          <div className="col-lg-3">
            <Navbar />
          </div>
          <div className="col-lg-9">
            <div className={styles.content}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path={ROUTER.ADMIN_ORDERS} element={<Orders />} />
                <Route path={ROUTER.VIEW_PRODUCTS} element={<ViewProducts />} />
                <Route path={ROUTER.ADD_PRODUCTS+"/:id"} element={<AddProducts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
