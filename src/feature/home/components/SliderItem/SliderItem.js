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
    <div className="container">
    <div className= {`${styles.content} row align-items-center`}>
          
          <div className={`${styles["slider-text"]} col-xl-6 col-sm-7`}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.desc}>{info}</div>
            <button className={styles["slider-btn"]}>Shop now</button>
          </div>
          <div className={`${styles["slider-img"]} col-xl-6 col-sm-5`}>
            <img src={img} alt={title} />
          </div>
        </div>
    </div>
      )}
    </div>
  );
};

export default SliderItem;
