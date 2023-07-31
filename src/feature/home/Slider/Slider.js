import React, { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import { sliderData } from "mock/sliderData";
import SliderItem from "./SliderItem/SliderItem";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const Slider = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const sliderLength = sliderData.length;
  const nextSlider = () => {
    setCurrentItem((prevCurrentItem) =>
      prevCurrentItem === sliderLength - 1 ? 0 : prevCurrentItem + 1
    );
  };
  const prevSlider = () => {
    setCurrentItem((prevCurrentItem) =>
      prevCurrentItem === 0 ? sliderLength - 1 : prevCurrentItem - 1
    );
  };
  useEffect(() => {
    setCurrentItem(0);
  }, []);
  let slideInterval;
  function auto() {
    slideInterval = setInterval(nextSlider, 3000);
  }
  useEffect(() => {
    auto();
    return ()=>clearInterval(slideInterval);
  }, [currentItem]);
  
  const sliderView = sliderData.map((slide, index) => (
    <SliderItem
      currentItem={currentItem}
      slide={slide}
      index={index}
      key={index}
    />
  ));
  return (
    <div className={styles.slider}>
      <div className={styles["slider-action"]}>
        <div className={styles.prev} onClick={prevSlider}>
          <BsChevronLeft />
        </div>
        <div className={styles.next} onClick={nextSlider}>
          <BsChevronRight />
        </div>
      </div>
      {sliderView}
    </div>
  );
};

export default Slider;
