import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "shared/components/Loader/Loader";
import { ROUTER } from "shared/constant/router";
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct();
  }, [product]);
  const getSingleProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id,
          ...docSnap.data(),
        };
        setProduct(obj);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    
    <>
    <div className={styles.breadcumb}>
      <div className={styles.title}>Product detail</div>
      <Link to={ROUTER.PRODUCTS}>Back to products</Link>
    </div>
      {product === null ? (
        <Loader />
      ) : (
        <div className={styles["product-detail"]}>

          <div className={styles["product-img"]}>
            <img src={product.imgURL} alt="" />
          </div>
          <div className={styles['product-content']}>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.price}>${product.price}</div>
            <div className={styles.desc}>{product.desc}</div>
            <div className={styles.brand}>Brand{product.brand}</div>
            <div className={styles['product-action']}>
              <button className={styles.dec}>-</button>
              <count className={styles.count}>1</count>
              <button className={styles.inc}>+</button>
                <button className={styles['add-to-cart']}>add to cart</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
