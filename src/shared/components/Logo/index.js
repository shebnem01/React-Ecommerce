import React from 'react'
import styles from './Logo.module.css'
import logo from 'assets/logo/logo.png'
const Logo = () => {
  return (
    <div className={styles["general-logo"]}>
    <img src={logo} alt="logo" />
    </div>
  )
}

export default Logo