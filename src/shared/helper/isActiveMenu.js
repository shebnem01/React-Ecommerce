import styles from '../../feature/header/Header.module.css'
export const activeClassName = ({ isActive }) =>
isActive ? `${styles.active}` : "";