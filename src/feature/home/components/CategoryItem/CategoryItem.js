import React from 'react'
import styles from './CategoryItem.module.css'
const CategoryItem = ({cat}) => {
  return (
    <div className={`${styles.category} col-lg-2 col-md-4`}>
        {cat.title}
    </div>
  )
}

export default CategoryItem