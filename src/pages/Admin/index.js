import React from "react";
import styles from "./Admin.module.css";
import Navbar from "feature/admin/components/navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "feature/admin/components/dashboard/Dashboard";
import Orders from "feature/admin/components/orders/Orders";
import AllProducts from "feature/admin/components/allProducts/AllProducts";
import AddProducts from "feature/admin/components/addProducts/AddProducts";
import { ROUTER } from "shared/constant/router";
import Dashboard from "feature/admin/components/dashboard/Dashboard";
const Admin = () => {
  return (
    <div className="container">
      <div className={styles.admin}>
        <div className="row">
          <div className="col-lg-3">
            <Navbar />
          </div>
          <div className="col-lg-9">
            <div className={styles.content}>
              <Routes>
               <Route path="/" element={<Navigate to={ROUTER.DASHBOARD} replace />} />
                <Route path={ROUTER.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTER.ADMIN_ORDERS} element={<Orders />} />
                <Route path={ROUTER.ALL_PRODUCTS} element={<AllProducts />} />
                <Route path={ROUTER.ADD_PRODUCTS+`/:id`} element={<AddProducts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
