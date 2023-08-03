import { db, storage } from "../../../../firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./AllProducts.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ROUTER } from "shared/constant/router";
import { Link } from "react-router-dom";
import Loader from "shared/components/Loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "redux/slice/productSlice";
import useFetchCollection from "shared/hooks/useFetchCollection";
const AllProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);
  const confirmDelete = (id, imgURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProducts(id, imgURL);
      },
      function cancelCb() {
        console.log("Delete canceled");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "black",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };
  const deleteProducts = (id, imgURL) => {
    try {
      deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imgURL);
      deleteObject(storageRef);
      console.log(storageRef);
      toast.success("Product deleted successfully");
      console.log(imgURL);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles["all-products-table"]}>
        <h2>All products</h2>
        {products.length === 0 ? (
          <div className="alert alert-danger py-5 mt-5 text-center">
            Products not found
          </div>
        ) : (
          <table className="table table-snippet">
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product, index) => {
                const { id, imgURL, name, price, brand, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imgURL} alt={name} />
                    </td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>
                      <Link to={"/admin/" + ROUTER.ADD_PRODUCTS + `/${id}`}>
                        <FaEdit color="blue" />
                      </Link>
                      &nbsp;
                      <div
                        className={styles["delete-product"]}
                        onClick={() => confirmDelete(id, imgURL)}
                      >
                        <FaTrashAlt color="red" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AllProducts;
