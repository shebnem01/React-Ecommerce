import React from 'react'
import styles from './Loader.module.css'
const Loader = () => {
  return (
   <div className="alert alert-success my-5 py-5 text-center">
     <div className={styles.loader}>Loader....</div>
   </div>
  )
}

export default Loader