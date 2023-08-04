import React from 'react'
import styles from './Categories.module.css'
import { categoryData } from 'mock/categoryData'
import CategoryItem from '../CategoryItem/CategoryItem'
const Categories = () => {
  return (
    <div className={`${styles.categories}`}>
      <div className="row justify-content-center gap-3">
      {categoryData.map((cat)=>(
            <CategoryItem  cat={cat} key={cat.id}/>
        ))} 
      </div>
    </div>
  )
}

export default Categories