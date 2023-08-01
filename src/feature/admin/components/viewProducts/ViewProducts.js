import { db } from "../../../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ViewProducts.module.css";
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import { ROUTER } from "shared/constant/router";
import { Link } from "react-router-dom";
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("name", "desc"));
      onSnapshot(q, (snapShot) => {
        const allProducts = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={styles["all-products-table"]}>
      <h2>All products</h2>
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
          {products.map((product, index) => {
            const { id, imgURL, name, price, brand, category } = product;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td><img  src={imgURL} alt={name} /></td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td><Link  to={ROUTER.ADD_PRODUCTS}><FaEdit color="blue"/></Link>&nbsp;<FaTrashAlt color="red"/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
