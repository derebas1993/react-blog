import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const Header = ({isLoggedIn, setIsLoggedIn, userName}) => {

  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', false)
    setIsLoggedIn(false)
  }

  return (
    <header className={styles.header}>

      {
        isLoggedIn ?
        <nav>
          welcom, <strong> {userName} </strong>
          <NavLink onClick={handleLogOut} exact to="/login">
            Log out <MeetingRoomIcon />
          </NavLink>
        </nav>
        : 'WELLCOM'
      }

    </header>
  );
};
