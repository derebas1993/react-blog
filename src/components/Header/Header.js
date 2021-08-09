import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink exact activeClassName={styles.active__link} to="/">Home</NavLink>
        <NavLink exact activeClassName={styles.active__link} to="/login">Log in</NavLink>
      </nav>
    </header>
  );
};
