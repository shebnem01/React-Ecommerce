import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { ROUTER } from 'shared/constant/router'
const Navbar = () => {
  const activeLink=({isActive})=>isActive?`${styles.active}`:``
  return (
    <div className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink className={activeLink}  to='home'>Dashboard</NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to={ROUTER.VIEW_PRODUCTS}>All products</NavLink>
          </li>
          <li>
            <NavLink className={activeLink}  to={ROUTER.ADD_PRODUCTS}>Add products </NavLink>
          </li>
          <li>
            <NavLink className={activeLink}  to={ROUTER.ADMIN_ORDERS}>Orders</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar