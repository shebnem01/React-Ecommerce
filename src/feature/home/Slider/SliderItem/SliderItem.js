import React, { useState } from "react";
import styles from "./SliderItem.module.css";

const SliderItem = ({ slide, index, currentItem }) => {
  const { img, title, info } = slide;

  return (
    <div
      className={
        index === currentItem
          ? `${styles.current} ${styles["slider-item"]}`
          : `${styles["slider-item"]}`
      }
    >
      {currentItem === index && (
        <>
          <div className={styles["slider-img"]}>
            <img src={img} alt={title} />
          </div>
          <div className={styles["slider-text"]}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.desc}>{info}</div>
            <button className={styles["slider-btn"]}>Shop now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SliderItem;
