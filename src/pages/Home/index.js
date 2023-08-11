import Categories from 'feature/home/components/Categories/Categories'
import Slider from 'feature/home/components/Slider/Slider'
import React from 'react'
import Products from 'shared/components/Products/Products'
import styles from './Home.module.css'
const Home = () => {
  return (
    <>
      <Slider/>
     <div className="container">
      <Categories/>
      <div className={styles.title}>Our Products</div>
      <Products/>
     </div>
    
    </>
  )
}

export default Home